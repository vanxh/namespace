// scripts/create-box.js
const { ethers, upgrades } = require("hardhat");
const fs = require('fs');
const fileName = './scripts/config.json';
var file = require("./config.json");

async function main() {
  const DevNFT = await ethers.getContractFactory("DevNFTUpgradeable");
  const devNFT = await upgrades.deployProxy(DevNFT);
  await devNFT.deployed();
  console.log("DevNFT deployed to:", devNFT.address);
  file.DevNFTUpgradeable = devNFT.address;
  fs.writeFileSync(fileName, JSON.stringify(file, null, 2), function writeJSON(err) {
      if (err) return console.log(err);
      console.log(JSON.stringify(file));
      console.log('writing to ' + fileName);
    });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
