// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./ERC721APPStorageUpgradeable.sol";

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";

interface IDappNameList {
    function isAppNameAvailable(string memory appName) external view returns (bool);
}

contract AppNFTUpgradeable is Initializable, ERC721Upgradeable, ERC721EnumerableUpgradeable, 
                    ERC721URIStorageUpgradeable, PausableUpgradeable, OwnableUpgradeable, 
                        ERC721BurnableUpgradeable, UUPSUpgradeable, ERC721APPStorageUpgradeable {
    using CountersUpgradeable for CountersUpgradeable.Counter;

    CountersUpgradeable.Counter private _tokenIdCounter;
    event AppNameSet(address indexed owner, uint256 indexed tokenId, string appName, string uri);
    event PriceSet(uint256 indexed tokenId, uint256 price);
    
    uint128 public fees;    // fees in Gwei
    // flag to prevent specific app name length
    bool public mintSpecialFlag;
    bool public mintManyFlag;
    bool public checkDappNamesListFlag;
    mapping(uint256 => uint256) public priceOf;
    mapping(uint256 => bool) public onSale;


    IERC721Upgradeable public devNFTAddress;
    IDappNameList public dappNameListAddress;

    /// @custom:oz-upgrades-unsafe-allow constructor    
    constructor() {
        _disableInitializers();
    }
    function initialize(address devNFTAddress_, address dappNameListAddress_) initializer public {
        __ERC721_init("appNFT", "appNFT");
        __ERC721Enumerable_init();
        __ERC721URIStorage_init();
        __Pausable_init();
        __Ownable_init();
        __ERC721Burnable_init();
        __UUPSUpgradeable_init();
        __ERC721APPStorage_init();

        fees = 2000000000; //2Gwei = 2%;
        devNFTAddress = IERC721Upgradeable(devNFTAddress_);
        dappNameListAddress = IDappNameList(dappNameListAddress_);
        checkDappNamesListFlag=true;
        _tokenIdCounter.increment();//because we want it to start NFT list index from 1 & not 0
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(address to, string memory uri, string calldata appName) public onlyOwner {
        if(!mintManyFlag){
            require(balanceOf(to)==0, "provided wallet already used to create app");
        }
        
        if (bytes(appName).length < 4) {
            require(mintSpecialFlag, "Minting of this name is restricted currently");
        }
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        string memory validatedAppName = _validateAppName(appName);
        _setTokensAppName(tokenId, validatedAppName);
        emit AppNameSet(to, tokenId, validatedAppName, uri);
    }

    function safeMintAppNFT(address to, string memory uri, string calldata appName) public whenNotPaused {
        if(!mintManyFlag){
            require(balanceOf(to)==0, "provided wallet already used to create app");
        }
        if(checkDappNamesListFlag){
            require(!dappNameListAddress.isAppNameAvailable(appName), "App name reserved");
        }
        if (bytes(appName).length < 4) {
            require(mintSpecialFlag, "Minting of such names is restricted currently");
        }
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        string memory validatedAppName = _validateAppName(appName);
        _setTokensAppName(tokenId, validatedAppName);
        emit AppNameSet(to, tokenId, validatedAppName, uri);
    }

    function createSale(uint256 _tokenID, uint256 _amount) external {
        require(_amount>0, "Set some amount");
        require(msg.sender == _ownerOf(_tokenID), "Not the owner of this tokenId");

        priceOf[_tokenID] = _amount;
        onSale[_tokenID] = true;
        emit PriceSet(_tokenID, _amount);
    }

    function endSale(uint256 _tokenID) external {
        require(msg.sender == _ownerOf(_tokenID), "Not the owner of this tokenId");

        priceOf[_tokenID] = 0;
        onSale[_tokenID] = false;
    }

    function buyAppNFT(uint256 _tokenID) external payable {
        uint256 price = priceOf[_tokenID];
        require(msg.value >= price,"Paid less than price");
        require(onSale[_tokenID], "This NFT is not on sale");
        priceOf[_tokenID] = 0;
        onSale[_tokenID] = false;
        require(payable(_ownerOf(_tokenID)).send(price-price*fees/100000000000),"payment transfer failed");
        _safeTransfer( _ownerOf(_tokenID),msg.sender,_tokenID,"");
    }

    function setMintSpecialFlag(bool _mintSpecialFlag) external onlyOwner {
        mintSpecialFlag = _mintSpecialFlag;
    }
    function setMintManyFlag(bool _mintManyFlag) external onlyOwner {
        mintManyFlag = _mintManyFlag;
    }
    function setCheckDappNamesListFlag(bool _checkDappNamesListFlag) external onlyOwner {
        checkDappNamesListFlag = _checkDappNamesListFlag;
    }

    function feesWithdraw(address payable _to) external onlyOwner{
        uint256 amount = (address(this)).balance;
        require(_to.send(amount), 'Fee Transfer to Owner failed.');
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        whenNotPaused
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        onlyOwner
        override
    {}

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId)
        internal
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable, ERC721APPStorageUpgradeable)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
