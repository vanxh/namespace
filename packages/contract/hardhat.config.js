require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');
require("dotenv/config")

const accounts = {
  mnemonic: ""
}
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  abiExporter: {
    path: "./build/abi",
    //clear: true,
    flat: true,
    // only: [],
    // except: []
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey:{
      //ethereum
      mainnet: 'H2EPP8FBXTDEDAAN93Z4975HU6FZYSFQY8',
      ropsten: 'H2EPP8FBXTDEDAAN93Z4975HU6FZYSFQY8',
      rinkeby: 'H2EPP8FBXTDEDAAN93Z4975HU6FZYSFQY8',
      goerli: 'H2EPP8FBXTDEDAAN93Z4975HU6FZYSFQY8',
      kovan: 'H2EPP8FBXTDEDAAN93Z4975HU6FZYSFQY8',
      sepolia: 'H2EPP8FBXTDEDAAN93Z4975HU6FZYSFQY8',

      //polygon
      polygon: 'NHKRRX8TVHS6W918QJQVGK99TRWKU5FERQ',
      polygonMumbai: 'NHKRRX8TVHS6W918QJQVGK99TRWKU5FERQ',
    }, ////'82I9WI5C9SVS9E85HJKRUQFUGVRFI2K7XH'//process.env.ETHERSCAN_API_KEY
    customChains: []  
  },
  networks: {
    hardhat: {
      chainId: 31337,
      // accounts,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/d936a575133e4dea8714cc109056237c`,
      accounts,
      from: "",
      chainId: 1,
      live: true,
      saveDeployments: true,
      tags: ["mainnet"],
      gasPrice: 20000000000,
      gasMultiplier: 5,
      timeout : 200000
    },
    goerli: {
        url: `https://goerli.infura.io/v3/d936a575133e4dea8714cc109056237c`,
        accounts: [process.env.PRIVATE_KEY], //add private key in this
        chainId: 5,
        live: true,
        saveDeployments: true,
        tags: ["staging"],
        gasPrice: 20000000000,
        gasMultiplier: 2,
      },
    mumbai: {
        url: `https://matic-mumbai.chainstacklabs.com`,
        accounts: [process.env.PRIVATE_KEY], //add private key in this
        chainId: 80001,
        live: true,
        saveDeployments: true,
        tags: ["staging"],
        gasPrice: 20000000000,
        gasMultiplier: 2,
      }
  },
  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.8.1",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      }
    ]
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
};
