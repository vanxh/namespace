# .appNFT & .devNFT contracts (upgradeable)
- Using @openzeppelin/contracts & @openzeppelin/contracts-upgradeable for standard libraries for Context, Strings, ERC721, ERC721Enumerable

add pvt key in .env file, for onchain deployments
add reservedDappNames in ./scripts/reservedDappNames.json

Current deployments are configured for mumbai(Polygon)
```shel
npm run deployDappNameList  //to deploy .dappNameList contract
npm run deployDevProxy      //to deploy .devNFT contract
npm run deployAppProxy      //to deploy .appNFT contract

npm run verifyDappNameList  //to verify .dappNameList contract
npm run verifyDI            //to verify .devNFT contract
npm run verifyAI            //to verify .appNFT contract

npm run addDappNames        //to add reserved dappNames in the list to avoid their minting in .appNFT

npx hardhat compile         //to compile NFT contracts
npx hardhat test            //to test NFT contracts

```

# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
