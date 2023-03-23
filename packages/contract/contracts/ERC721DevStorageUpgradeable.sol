// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/**
 * @dev ERC721 token with storage based dev Name management.
 */
abstract contract ERC721DevStorageUpgradeable is Initializable, ERC721Upgradeable {
    function __ERC721DevStorage_init() internal onlyInitializing {
        devSuffix = ".dev";
    }

    function __ERC721DevStorage_init_unchained() internal onlyInitializing {
    }
    using StringsUpgradeable for uint256;

    // Mapping for dev Names
    mapping(uint256 => string) private _tokensDevNames;
    // Mapping for dev Names to ids
    mapping(string => uint256) private _tokenIdForDevNames;
    // storing the suffix of the dev name
    bytes public devSuffix;

    function tokensDevName(uint256 tokenId) public view virtual returns (string memory) {
        _requireMinted(tokenId);
        string memory _devName = _tokensDevNames[tokenId];
        return _devName;
    }
    function tokenIdForDevName(string memory _devName) public view virtual returns (uint256) {
        uint256 _tokenId = _tokenIdForDevNames[_devName];
        _requireMinted(_tokenId);
        return _tokenId;
    }

    /**
     * @dev Validates `_devName` and returns a valid dev Name ie(should end with .dev)
     *
     * Requirements:
     *
     * - `_devName` must be valid.
     */
    function _validateDevName(string calldata str) internal virtual returns (string memory) {
        bytes calldata strBytes = bytes(str);
        if (strBytes.length < 4) {
            return string(abi.encodePacked(string(strBytes),string(devSuffix)));
        }
        uint256 strBytesLength = strBytes.length;
        bytes memory strBytesSuffix = strBytes[strBytesLength-4:strBytesLength];
        if(strBytes.length == 4 && keccak256(strBytesSuffix) == keccak256(devSuffix)){
            revert("Validation error: name is empty");
        }else if(keccak256(strBytesSuffix) == keccak256(devSuffix)){
           return string(strBytes);
        }else{
            return string(abi.encodePacked(string(strBytes),string(devSuffix)));
        }
    }

    /**
     * @dev Sets `_devName` as the devName of `tokenId`.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function _setTokensDevName(uint256 tokenId, string memory _devName) internal virtual {
        require(_exists(tokenId), "ERC721DevStorage: dev Name set of nonexistent token");
        uint256 checkTokenId = _tokenIdForDevNames[_devName];
        if(tokenId != 0){
            require(!_exists(checkTokenId), "ERC721DevStorage: this dev Name already in use");
        }
        _tokensDevNames[tokenId] = _devName;
        _tokenIdForDevNames[_devName] = tokenId;
    }

    /**
     * @dev See {ERC721-_burn}. This override additionally checks to see if a
     * token-specific dev name was set for the token, and if so, it deletes the token's Dev Name from
     * the storage mapping.
     */
    function _burn(uint256 tokenId) internal virtual override {
        super._burn(tokenId);

        if (bytes(_tokensDevNames[tokenId]).length != 0) {
            delete _tokenIdForDevNames[_tokensDevNames[tokenId]];
            delete _tokensDevNames[tokenId];
        }
    }

    /**
     * @dev This empty reserved space is put in place to allow future versions to add new
     * variables without shifting down storage in the inheritance chain.
     * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
     */
    uint256[49] private __gap;
}
