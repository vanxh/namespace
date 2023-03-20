const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

describe(".app & .dev NFT minting", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployNFTsFixture() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const ONE_GWEI = 1_000_000_000;

    const lockedAmount = ONE_GWEI;
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;
    const symbolOfDevNFT = "devNFT";
    const nameOfDevNFT =  "devNFT";
    const symbolOfAppNFT = "appNFT";
    const nameOfAppNFT =  "appNFT";

    // Contracts are deployed using the first signer/account by default
    const [owner, account1, account2, otherAccount] = await ethers.getSigners();
    const devName = {
      owner: "ownerDevName",
      account1: "account1DevName",
      account2: "account2DevName",
      otherAccount: "otherAccountDevName"
    }
    const dev_uri = ".devNFT.com"
    const specialdAppNames = ["uniswap", "curve", "sushiswap"];
    const DappNameList = await ethers.getContractFactory("dappNameList");
    const dappNameList = await DappNameList.deploy();
    await dappNameList.setDappNames(specialdAppNames);
    const DevNFT = await ethers.getContractFactory("DevNFTUpgradeable");
    const devNFT = await upgrades.deployProxy(DevNFT);
    const appName = {
      owner: "ownerAppName",
      account1: "account1AppName",
      account2: "account2AppName",
      otherAccount: "otherAccountAppName"
    }
    const app_uri = ".appNFT.com"

    const AppNFT = await ethers.getContractFactory("AppNFTUpgradeable");
    const appNFT = await upgrades.deployProxy(AppNFT, [devNFT.address, dappNameList.address]);
    // const devNFT = await DevNFT.deploy();

    return { devNFT, appNFT, dappNameList, symbolOfDevNFT, symbolOfAppNFT, nameOfDevNFT, nameOfAppNFT, owner, account1, account2, otherAccount, devName, appName, dev_uri, app_uri, specialdAppNames };
  }

  async function basicMintDone(devNFT, appNFT, dev_uri, app_uri, devName, appName) {
    const [owner, account1, account2, otherAccount] = await ethers.getSigners();

    await devNFT.safeMintDevNFT(owner.address, devName.owner+dev_uri, devName.owner);
    await devNFT.connect(account1).safeMintDevNFT(account1.address, devName.account1+dev_uri, devName.account1);
    await appNFT.safeMintAppNFT(owner.address, appName.owner+app_uri, appName.owner);
    await appNFT.connect(account1).safeMintAppNFT(account1.address, appName.account1+app_uri, appName.account1);

  }

  describe("Deployment", function () {
    it("Should give the right name and symbol of Dev NFT", async function () {
      const { devNFT, symbolOfDevNFT, nameOfDevNFT } = await loadFixture(deployNFTsFixture);

      expect(await devNFT.name()).to.equal(nameOfDevNFT);
      expect(await devNFT.symbol()).to.equal(symbolOfDevNFT);
    });

    it("Should set the right owner of devNFT", async function () {
      const { devNFT, owner } = await loadFixture(deployNFTsFixture);

      expect(await devNFT.owner()).to.equal(owner.address);
    });

    it("Should give the right name and symbol of Dev NFT", async function () {
      const { appNFT, symbolOfAppNFT, nameOfAppNFT } = await loadFixture(deployNFTsFixture);

      expect(await appNFT.name()).to.equal(symbolOfAppNFT);
      expect(await appNFT.symbol()).to.equal(nameOfAppNFT);
    });

    it("Should set the right owner appNFT", async function () {
      const { appNFT, owner } = await loadFixture(deployNFTsFixture);

      expect(await appNFT.owner()).to.equal(owner.address);
    });

    it("Should set the right owner dappNameList", async function () {
      const { dappNameList, owner } = await loadFixture(deployNFTsFixture);

      expect(await dappNameList.owner()).to.equal(owner.address);
    });
  });

  describe("Mint .devNFT", function () {
    describe("Validations", function () {
      it("Should revert with the right error if called from non-owner account in safeMint", async function () {
        const { devNFT, otherAccount, devName, dev_uri } = await loadFixture(
          deployNFTsFixture
        );

        // We use lock.connect() to send a transaction from another account
        await expect(devNFT.connect(otherAccount).safeMint(otherAccount.address, devName.otherAccount+dev_uri, devName.otherAccount)).to.be.revertedWith(
          "Ownable: caller is not the owner"
        );
      });

      it("Shouldn't fail safeMint call if the owner calls it", async function () {
        const { devNFT, owner, devName, dev_uri } = await loadFixture(
          deployNFTsFixture
        );
        await expect(devNFT.safeMint(owner.address, devName.owner+dev_uri, devName.owner)).not.to.be.reverted;
      });

      it("Shouldn't fail safeMintDevNFT call if any address calls for first time", async function () {
        const { devNFT, account1, devName, dev_uri } = await loadFixture(
          deployNFTsFixture
        );
        await expect(devNFT.connect(account1).safeMintDevNFT(account1.address, devName.account1+dev_uri, devName.account1)).not.to.be.reverted;
      });

      it("Should revert with the right error if safeMintDevNFT called again by same user", async function () {
        const { devNFT, account1, devName, dev_uri } = await loadFixture(
          deployNFTsFixture
        );
        // Called first time
        devNFT.connect(account1).safeMintDevNFT(account1.address, devName.account1+dev_uri, devName.account1)
        // Caled second time
        await expect(devNFT.connect(account1).safeMintDevNFT(account1.address, devName.account1+dev_uri, devName.account1)).to.be.revertedWith(
          "provided wallet already used to create app"
        );
      });

      it("Should revert when the devName is already in use", async function () {
        const { devNFT, appNFT, owner, otherAccount, devName, appName, dev_uri, app_uri } = await loadFixture(
          deployNFTsFixture
        );

        await basicMintDone(devNFT, appNFT, dev_uri, app_uri, devName, appName);
        // We use lock.connect() to send a transaction from another account
        await expect(devNFT.connect(otherAccount).safeMintDevNFT(otherAccount.address, devName.otherAccount+dev_uri, devName.owner)).to.be.revertedWith(
          "ERC721DevStorage: this dev Name already in use"
        );
      });
    });

    describe("Events", function () {
      it("Should emit an event on safeMint", async function () {
        const { devNFT, owner, devName, dev_uri } = await loadFixture(
          deployNFTsFixture
        );

        await expect(devNFT.safeMint(owner.address, devName.owner+dev_uri, devName.owner))
          .to.emit(devNFT, "Transfer")
          .withArgs(ADDRESS_ZERO, owner.address, anyValue); // We accept any value as `when` arg
      });
    });
  });

  describe("Mint .appNFT", function () {
    describe("Validations", function () {
      it("Should revert with the right error if called from non-owner account in safeMint", async function () {
        const { appNFT, otherAccount, appName, app_uri } = await loadFixture(
          deployNFTsFixture
        );

        // We use lock.connect() to send a transaction from another account
        await expect(appNFT.connect(otherAccount).safeMint(otherAccount.address, appName.otherAccount+app_uri, appName.otherAccount)).to.be.revertedWith(
          "Ownable: caller is not the owner"
        );
      });

      it("Shouldn't fail safeMint call if the owner calls it", async function () {
        const { appNFT, owner, appName, app_uri } = await loadFixture(
          deployNFTsFixture
        );
        await expect(appNFT.safeMint(owner.address, appName.owner+app_uri, appName.owner)).not.to.be.reverted;
      });

      it("Shouldn't fail safeMintAppNFT call if any address calls for first time after minting .devNFT", async function () {
        const { devNFT, appNFT, account1, devName, appName, app_uri } = await loadFixture(
          deployNFTsFixture
        );
        await devNFT.connect(account1).safeMintDevNFT(account1.address, devName.account1+app_uri, devName.account1)
        await expect(appNFT.connect(account1).safeMintAppNFT(account1.address, appName.account1+app_uri, appName.account1)).not.to.be.reverted;
      });

      it("Should revert with the right error if safeMintAppNFT called by user without minting .devNFT", async function () {
        const { appNFT, account1, appName, app_uri } = await loadFixture(
          deployNFTsFixture
        );

        await expect(appNFT.connect(account1).safeMintAppNFT(account1.address, appName.account1+app_uri, appName.account1)).to.be.revertedWith(
          "Minting of devNFT required"
        );
      });

      it("Should revert with the right error if more than 1 appName is minted by same user", async function () {
        const { devNFT, appNFT, account1, devName, appName, dev_uri, app_uri } = await loadFixture(
          deployNFTsFixture
        );
        
        await devNFT.connect(account1).safeMintDevNFT(account1.address, devName.account1+dev_uri, devName.account1)
        await expect(appNFT.connect(account1).safeMintAppNFT(account1.address, appName.account1+app_uri, appName.account1));
        await expect(appNFT.connect(account1).safeMintAppNFT(account1.address, appName.account1+app_uri, appName.account1)).to.be.revertedWith(
          "provided wallet already used to create app"
        );
      });

      it("Shouldn't fail safeMintAppNFT call if more than 1 appName is minted by same user when mintManyFlag is turned true by owner", async function () {
        const { devNFT, appNFT, account1, devName, appName, dev_uri, app_uri } = await loadFixture(
          deployNFTsFixture
        );
        
        await appNFT.setMintManyFlag(true);
        await devNFT.connect(account1).safeMintDevNFT(account1.address, devName.account1+dev_uri, devName.account1)
        await expect(appNFT.connect(account1).safeMintAppNFT(account1.address, appName.account1+app_uri, appName.account1));
        
        await expect(appNFT.connect(account1).safeMintAppNFT(account1.address, appName.account1+app_uri, "secondName")).not.to.be.reverted;
        expect(await appNFT.tokensAppName(1)).to.equal(appName.account1);
        expect(await appNFT.tokensAppName(2)).to.equal("secondName");
      });
    });

    describe("appName validations", function () {
      it("Should revert when the appName is already in use", async function () {
        const { devNFT, appNFT, owner, otherAccount, devName, appName, dev_uri, app_uri } = await loadFixture(
          deployNFTsFixture
        );

        await basicMintDone(devNFT, appNFT, dev_uri, app_uri, devName, appName);
        devNFT.connect(otherAccount).safeMintDevNFT(otherAccount.address, devName.otherAccount+dev_uri, devName.otherAccount);
        // We use lock.connect() to send a transaction from another account
        await expect(appNFT.connect(otherAccount).safeMintAppNFT(otherAccount.address, appName.otherAccount+app_uri, appName.owner)).to.be.revertedWith(
          "ERC721APPStorage: this app Name already in use"
        );
      });

      it("Should revert when the appName's special ie length is less than equal to 3", async function () {
        const { devNFT, appNFT, owner, otherAccount, devName, appName, dev_uri, app_uri } = await loadFixture(
          deployNFTsFixture
        );

        await basicMintDone(devNFT, appNFT, dev_uri, app_uri, devName, appName);
        await devNFT.connect(otherAccount).safeMintDevNFT(otherAccount.address, devName.otherAccount+dev_uri, devName.otherAccount);

        await expect(appNFT.connect(otherAccount).safeMintAppNFT(otherAccount.address, appName.otherAccount+app_uri, "XX")).to.be.revertedWith(
          "Minting of such names is restricted currently"
        );
      });

      it("Should'nt fail when user mints special appNames when mintSpecialFlag is turned true by owner", async function () {
        const { devNFT, appNFT, owner, otherAccount, devName, appName, dev_uri, app_uri } = await loadFixture(
          deployNFTsFixture
        );

        await basicMintDone(devNFT, appNFT, dev_uri, app_uri, devName, appName);
        await devNFT.connect(otherAccount).safeMintDevNFT(otherAccount.address, devName.otherAccount+dev_uri, devName.otherAccount);

        await appNFT.setMintSpecialFlag(true);
        await expect(appNFT.connect(otherAccount).safeMintAppNFT(otherAccount.address, appName.otherAccount+app_uri, "XX")).not.to.be.reverted;
        // const tokenID = await appNFT.tokenIdForAppName("");
        expect(await appNFT.tokensAppName(3)).to.equal("XX");
      });

      it("Should revert when the appName's blacklisted ie present in dappNameList", async function () {
        const { devNFT, appNFT, dappNameList, owner, otherAccount, devName, appName, dev_uri, app_uri, specialdAppNames } = await loadFixture(
          deployNFTsFixture
        );

        await devNFT.connect(otherAccount).safeMintDevNFT(otherAccount.address, devName.otherAccount+dev_uri, devName.otherAccount);

        await expect(appNFT.connect(otherAccount).safeMintAppNFT(otherAccount.address, appName.otherAccount+app_uri, specialdAppNames[1])).to.be.revertedWith(
          "App name reserved"
        );
      });

      it("Should'nt fail when user mints special appNames when mintSpecialFlag is turned off by owner", async function () {
        const { devNFT, appNFT, owner, otherAccount, devName, appName, dev_uri, app_uri, specialdAppNames } = await loadFixture(
          deployNFTsFixture
        );

        await basicMintDone(devNFT, appNFT, dev_uri, app_uri, devName, appName);
        await devNFT.connect(otherAccount).safeMintDevNFT(otherAccount.address, devName.otherAccount+dev_uri, devName.otherAccount);

        await appNFT.setCheckDappNamesListFlag(false);
        await expect(appNFT.connect(otherAccount).safeMintAppNFT(otherAccount.address, appName.otherAccount+app_uri, specialdAppNames[1])).not.to.be.reverted;
        // const tokenID = await appNFT.tokenIdForAppName("");
        expect(await appNFT.tokensAppName(3)).to.equal(specialdAppNames[1]);
      });

    })

    describe("Events", function () {
      it("Should emit an event on safeMint", async function () {
        const { appNFT, owner, appName, app_uri } = await loadFixture(
          deployNFTsFixture
        );

        await expect(appNFT.safeMint(owner.address, appName.owner+app_uri, appName.owner))
          .to.emit(appNFT, "Transfer")
          .withArgs(ADDRESS_ZERO, owner.address, anyValue); // We accept any value as `when` arg
      });
    });
  });

  describe("Sell .appNFT", function () {
    describe("Validations", function () {
      it("Should revert with the right error if try to buy not-on-sale NFT", async function () {
        const { devNFT, appNFT, otherAccount, devName, appName, dev_uri, app_uri } = await loadFixture(
          deployNFTsFixture
        );

        await basicMintDone(devNFT, appNFT, dev_uri, app_uri, devName, appName);

        await expect(appNFT.connect(otherAccount).buyAppNFT(2)).to.be.revertedWith(
          "This NFT is not on sale"
        );
      });

      it("Should revert with the right error if try to buy on-sale NFT at low value", async function () {
        const { devNFT, appNFT, otherAccount, account1, devName, appName, dev_uri, app_uri } = await loadFixture(
          deployNFTsFixture
        );

        await basicMintDone(devNFT, appNFT, dev_uri, app_uri, devName, appName);
        const tokenID = await appNFT.tokenIdForAppName(appName.account1);
        await appNFT.connect(account1).createSale(tokenID, 10000000000);
        const price = await appNFT.priceOf(tokenID);

        await expect(appNFT.connect(otherAccount).buyAppNFT(2, {value: Number(price)/2})).to.be.revertedWith(
          "Paid less than price"
        );
      });

      it("Shouldn't fail if token on-sale is bought", async function () {
        const { devNFT, appNFT, otherAccount, account1, devName, appName, dev_uri, app_uri } = await loadFixture(
          deployNFTsFixture
        );

        await basicMintDone(devNFT, appNFT, dev_uri, app_uri, devName, appName);
        const tokenID = await appNFT.tokenIdForAppName(appName.account1);
        await appNFT.connect(account1).createSale(tokenID, 10000000000);
        const price = await appNFT.priceOf(tokenID);

        await expect(appNFT.connect(otherAccount).buyAppNFT(2, {value: Number(price)})).not.to.be.reverted;

        expect(await appNFT.ownerOf(tokenID)).to.equal(otherAccount.address);
      });

      it("Should revert with the right error if try to buy NFT when sale is ended", async function () {
        const { devNFT, appNFT, otherAccount, account1, devName, appName, dev_uri, app_uri } = await loadFixture(
          deployNFTsFixture
        );

        await basicMintDone(devNFT, appNFT, dev_uri, app_uri, devName, appName);
        const tokenID = await appNFT.tokenIdForAppName(appName.account1);
        await appNFT.connect(account1).createSale(tokenID, 10000000000);
        
        const price = await appNFT.priceOf(tokenID);
        expect(await appNFT.priceOf(tokenID)).to.equal(price);
        expect(await appNFT.onSale(tokenID)).to.equal(true);

        await appNFT.connect(account1).endSale(tokenID);
        expect(await appNFT.priceOf(tokenID)).to.equal(0);
        expect(await appNFT.onSale(tokenID)).to.equal(false);
        expect(await appNFT.ownerOf(tokenID)).to.equal(account1.address);

        await expect(appNFT.connect(otherAccount).buyAppNFT(2, {value: Number(price)})).to.be.revertedWith(
          "This NFT is not on sale"
        );

        
      });
    });
  });

});
