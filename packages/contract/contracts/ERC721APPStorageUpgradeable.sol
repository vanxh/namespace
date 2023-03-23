// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

/**
 * @dev ERC721 token with storage based app Name management.
 */
abstract contract ERC721APPStorageUpgradeable is Initializable, ERC721Upgradeable {
    function __ERC721APPStorage_init() internal onlyInitializing {
        appSuffix = ".app";
    }

    function __ERC721APPStorage_init_unchained() internal onlyInitializing {
    }
    using StringsUpgradeable for uint256;

    // Mapping for token Names
    mapping(uint256 => string) private _tokensAppNames;
    // Mapping for token Names to ids
    mapping(string => uint256) private _tokenIdForAppNames;
    // storing the suffix of the app name
    bytes public appSuffix;

    function tokensAppName(uint256 tokenId) public view virtual returns (string memory) {
        _requireMinted(tokenId);
        string memory _appName = _tokensAppNames[tokenId];
        return _appName;
    }
    function tokenIdForAppName(string memory _appName) public view virtual returns (uint256) {
        uint256 _tokenId = _tokenIdForAppNames[_appName];
        _requireMinted(_tokenId);
        return _tokenId;
    }

    /**
     * @dev Validates `_appName` and returns a valid app Name ie(should end with .app)
     *
     * Requirements:
     *
     * - `_appName` must be valid.
     */
    function _validateAppName(string calldata str) internal virtual returns (string memory) {
        bytes calldata strBytes = bytes(str);
        if (strBytes.length < 4) {
            return string(abi.encodePacked(string(strBytes),string(appSuffix)));
        }
        uint256 strBytesLength = strBytes.length;
        bytes memory strBytesSuffix = strBytes[strBytesLength-4:strBytesLength];
        if(strBytes.length == 4 && keccak256(strBytesSuffix) == keccak256(appSuffix)){
            revert("Validation error: name is empty");
        }else if(keccak256(strBytesSuffix) == keccak256(appSuffix)){
           return string(strBytes);
        }else{
            return string(abi.encodePacked(string(strBytes),string(appSuffix)));
        }
    }

    /**
     * @dev Sets `_appName` as the appName of `tokenId`.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function _setTokensAppName(uint256 tokenId, string memory _appName) internal virtual {
        require(_exists(tokenId), "ERC721APPStorage: app Name set of nonexistent token");
        uint256 checkTokenId = _tokenIdForAppNames[_appName];
        if(tokenId != 0){
            require(!_exists(checkTokenId), "ERC721APPStorage: this app Name already in use");
        }
        _tokensAppNames[tokenId] = _appName;
        _tokenIdForAppNames[_appName] = tokenId;
    }

    /**
     * @dev See {ERC721-_burn}. This override additionally checks to see if a
     * token-specific app name was set for the token, and if so, it deletes the token's App Name from
     * the storage mapping.
     */
    function _burn(uint256 tokenId) internal virtual override {
        super._burn(tokenId);

        if (bytes(_tokensAppNames[tokenId]).length != 0) {
            delete _tokenIdForAppNames[_tokensAppNames[tokenId]];
            delete _tokensAppNames[tokenId];
        }
    }

    /**
     * @dev This empty reserved space is put in place to allow future versions to add new
     * variables without shifting down storage in the inheritance chain.
     * See https://docs.openzeppelin.com/contracts/4.x/upgradeable#storage_gaps
     */
    uint256[49] private __gap;
}
