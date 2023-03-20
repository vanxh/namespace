// solidity contract to store dApp names
pragma solidity ^0.8.0;

contract dappNameStore {
    mapping (address => string) public dappNames;
    mapping (string => address) public dappAddresses;
    
    function setDappName(string memory _dappName) public {
        dappNames[msg.sender] = _dappName;
        dappAddresses[_dappName] = msg.sender;
    }
    
    function getDappName(address _dappAddress) public view returns (string memory) {
        return dappNames[_dappAddress];
    }
    
    function getDappAddress(string memory _dappName) public view returns (address) {
        return dappAddresses[_dappName];
    }

    //function to store many dapp names in array
    function setDappNames(string[] memory _dappNames) public {
        for (uint i = 0; i < _dappNames.length; i++) {
            dappNames[msg.sender] = _dappNames[i];
            dappAddresses[_dappNames[i]] = msg.sender;
        }
    }

    //function to store dappNames in gas optimized way (using bytes)
    function setDappNamesBytes(bytes memory _dappNames) public {
        uint i = 0;
        while (i < _dappNames.length) {
            uint j = i;
            while (j < _dappNames.length && _dappNames[j] != 0) {
                j++;
            }
            bytes memory dappName = new bytes(j - i);
            for (uint k = i; k < j; k++) {
                dappName[k - i] = _dappNames[k];
            }
            dappNames[msg.sender] = string(dappName);
            dappAddresses[string(dappName)] = msg.sender;
            i = j + 1;
        }
    }
}