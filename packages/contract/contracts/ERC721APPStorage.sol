// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/**
 * @dev ERC721 token with storage based app Name management.
 */
abstract contract ERC721APPStorage is ERC721 {
    using Strings for uint256;

    // Mapping for token Names
    mapping(uint256 => string) private _tokensAppNames;
    // Mapping for token Names to ids
    mapping(string => uint256) private _tokenIdForAppNames;

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
     * token-specific URI was set for the token, and if so, it deletes the token URI from
     * the storage mapping.
     */
    function _burn(uint256 tokenId) internal virtual override {
        super._burn(tokenId);

        if (bytes(_tokensAppNames[tokenId]).length != 0) {
            delete _tokenIdForAppNames[_tokensAppNames[tokenId]];
            delete _tokensAppNames[tokenId];
        }
    }
}