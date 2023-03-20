// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const fs = require('fs');
const hre = require("hardhat");
const fileName = './scripts/config.json';
var file = require("./config.json");

async function main() {
  console.log("starting deploy")
  const AppNFT = await hre.ethers.getContractFactory("AppNFT");
  const appNFT = await AppNFT.deploy();

  await appNFT.deployed();

  console.log(
    `AppNFT deployed to ${appNFT.address}`
  );
  file.AppNFT = appNFT.address;
  fs.writeFileSync(fileName, JSON.stringify(file, null, 2), function writeJSON(err) {
      if (err) return console.log(err);
      console.log(JSON.stringify(file));
      console.log('writing to ' + fileName);
    });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
