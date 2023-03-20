// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./ERC721APPStorage.sol";

contract AppNFT is ERC721, ERC721Enumerable, ERC721URIStorage, ERC721APPStorage, Pausable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    uint256 public mintPrice = 0;//50000000000000000 = 0.05 ETH
    bool public isPublicMintEnabled = true;
    uint256 public fees = 2000000000; //2Gwei = 2%;
    // flag to prevent specific app name length
    bool public mintSpecialFlag;
    mapping(uint256 => uint256) public priceOf;
    mapping(uint256 => bool) public onSale;

    // function _baseURI() internal pure override returns (string memory) {
    //     return "ipfs://";
    // }
    function togglePublicMint(bool _publicMintFlag) public onlyOwner {
        isPublicMintEnabled = _publicMintFlag;
    }

    function updateMintPrice(uint256 _mintPrice) public onlyOwner {
        mintPrice = _mintPrice;
    }

    constructor() ERC721("appNFT", "appNFT") {
        _tokenIdCounter.increment(); //because we want it to start NFT list index from 1
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(address to, string memory uri, string memory appName) public onlyOwner {
       require(balanceOf(to)==0, "provided wallet already used to create app");

        if (bytes(appName).length < 4) {
            require(mintSpecialFlag, "Minting of such names restricted currently");
        }
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        _setTokensAppName(tokenId, appName);
    }

    function safeMintAppNFT(address to, string memory uri, string memory appName) public whenNotPaused {
        require(balanceOf(to)==0, "provided wallet already used to create app");

        if (bytes(appName).length < 4) {
            require(mintSpecialFlag, "Minting of such names restricted currently");
        }
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        _setTokensAppName(tokenId, appName);
    }

    function createSale(uint256 _tokenID, uint256 _amount) external {
        require(_amount>0, "Set some amount");
        require(msg.sender == _ownerOf(_tokenID), "Not the owner of this tokenId");
        // TODO: put on sale flag
        priceOf[_tokenID] = _amount;
        onSale[_tokenID] = true;
    }

    function buyAppNFT(uint256 _tokenID) external payable {
        uint256 price = priceOf[_tokenID];
        require(msg.value >= price,"less pay");
        priceOf[_tokenID] = 0;
        onSale[_tokenID] = false;
        require(payable(_ownerOf(_tokenID)).send(price-price*fees/100000000000),"payment transfer failed");
        _safeTransfer( _ownerOf(_tokenID),msg.sender,_tokenID,"");
    }

    function setMintSpecialFlag(bool _mintSpecialFlag) external onlyOwner {
        mintSpecialFlag = _mintSpecialFlag;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage, ERC721APPStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function feesWithdraw(address payable _to) external onlyOwner{
        uint256 amount = (address(this)).balance;
        require(_to.send(amount), 'Fee Transfer to Owner failed.');
    }
}