const fs = require("fs");
const hre = require("hardhat");
const fileName = "./scripts/config.json";
var file = require("./config.json");

async function main() {
  console.log("starting deploy");
  const DappNameList = await hre.ethers.getContractFactory("dappNameList");
  const dappNameList = await DappNameList.deploy();

  await dappNameList.deployed();

  console.log(`DappNameList deployed to ${dappNameList.address}`);
  file.DappNameList = dappNameList.address;
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

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
