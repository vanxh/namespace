const { ethers } = require("hardhat");
const contractAddress = require("./config.json");


async function addDappNames() {
    try{
        // ethers function to call dappNameList contract's function setDappName
        // setDappName takes in an array of strings and adds them to the dappNames array
        // in the dappNameList contract
        const dappNameList = new ethers.Contract(contractAddress.DappNameList, [
            "function setDappNames(string[] memory dappNames)"
        ], ethers.provider.getSigner());
        await dappNameList.setDappNames(["dapp1", "dapp2", "dapp3"]);
    } catch (err) {
        console.log("verifyFactory error: ", err)
    }
    
}

async function main() {
    console.log("adding list of dapp names");

    await addDappNames();
    // const [deployer] = await ethers.getSigners();
    // const DappNameListAddress = contractAddress.DappNameList
    // const DappNameList = await ethers.getContractFactory("dappNameList");
    // const dappNameListInstance = await DappNameList.attach(DappNameListAddress);
    // await dappNameListInstance.connect(deployer).setDappNames(["dapp1", "dapp2", "dapp3"]);

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });