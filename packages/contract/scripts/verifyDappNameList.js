const { ethers } = require("hardhat");
const contractAddress = require("./config.json");


async function verifyDappNameList() {
    try{
        await run("verify:verify", {
            constructorArguments: [],
            contract: "contracts/dappNameList.sol:dappNameList",
            address: contractAddress.DappNameList
          });
    } catch (err) {
        console.log("verifyFactory error: ", err)
    }
    
}

async function main() {
    console.log("starting verify");

    await verifyDappNameList();

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
    