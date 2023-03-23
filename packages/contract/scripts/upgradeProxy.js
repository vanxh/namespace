// scripts/upgradeProxy.js
const { ethers, upgrades } = require("hardhat");
var file = require("./config.json");
async function main() {
  const AppNFT = await ethers.getContractFactory("AppNFTUpgradeable");
  // const appNFT = await upgrades.upgradeProxy(AppNFTUpgradeable, AppNFT);
  const appNFT = await upgrades.upgradeProxy("0x7D6612A6acf6F9B2e799231eCa1E00C26cB52E01",AppNFT, ["0x65dfeea95a6e2fae38bfd748b6a042bbddacc3d4", "0x98FE2Fe391cc3b9450A1966c689F8Cf5531C3297"]);
  console.log("AppNFT upgraded", appNFT);
}



main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
