// scripts/upgradeProxy.js
const { ethers, upgrades } = require("hardhat");

async function main() {
  const AppNFT = await ethers.getContractFactory("AppNFT");
  const appNFT = await upgrades.upgradeProxy(AppNFTUpgradeable, AppNFT);
  console.log("AppNFT upgraded");
}



main();