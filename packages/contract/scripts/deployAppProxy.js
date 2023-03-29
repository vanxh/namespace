// scripts/create-box.js
const { ethers, upgrades } = require("hardhat");
const fs = require("fs");
const fileName = "./scripts/config.json";
var file = require("./config.json");

async function main() {
  const AppNFT = await ethers.getContractFactory("AppNFTUpgradeable");
  const appNFT = await upgrades.deployProxy(AppNFT, [
    file.DevNFTUpgradeable,
    file.DappNameList,
  ]);
  await appNFT.deployed();
  console.log("AppNFT deployed to:", appNFT.address);
  file.AppNFTUpgradeable = appNFT.address;
  fs.writeFileSync(
    fileName,
    JSON.stringify(file, null, 2),
    function writeJSON(err) {
      if (err) return console.log(err);
      console.log(JSON.stringify(file));
      console.log("writing to " + fileName);
    }
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
