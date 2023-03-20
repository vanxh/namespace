const { ethers } = require("hardhat");
const contractAddress = require("./config.json");


async function verifyAppNFT() {
    try{
        await run("verify:verify", {
            constructorArguments: [],
            contract: "contracts/AppNFT.sol:AppNFT",
            address: contractAddress.AppNFT
          });
    } catch (err) {
        console.log("verifyFactory error: ", err)
    }
    
}

async function main() {
    console.log("starting verify");

    await verifyAppNFT();

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });