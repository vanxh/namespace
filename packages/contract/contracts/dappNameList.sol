// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract dappNameList is Ownable {
    mapping (string => bool) private dappNames;

    // isAppNameAvailable function
    function isAppNameAvailable(string memory _dappName) external view returns (bool) {
        return dappNames[_dappName];
    }
    //function to store many dapp names in array
    function setDappNames(string[] memory _dappNames) external onlyOwner {
        for (uint i = 0; i < _dappNames.length; i++) {
            dappNames[_dappNames[i]] = true;
        }
    }
}
