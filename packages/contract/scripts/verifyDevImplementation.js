const { ethers } = require("hardhat");
const contractAddress = require("./config.json");


async function verifyDevNFT() {
    try{
        await run("verify:verify", {
            constructorArguments: [],
            contract: "contracts/DevNFTUpgradeable.sol:DevNFTUpgradeable",
            address: contractAddress.DevNFTUpgradeable
          });
    } catch (err) {
        console.log("verifyFactory error: ", err)
    }
    
}

async function main() {
    console.log("starting verify");
    const blockNumber = await ethers.provider.getBlockNumber();
    console.log("blockNumber: ", blockNumber);
    await verifyDevNFT();

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });