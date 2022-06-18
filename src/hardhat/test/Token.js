const { expect } = require("chai");

describe("Token contract", function () {
  let Token;
  let TBCToken;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("Token");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    TBCToken = await Token.deploy();
  });


  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await TBCToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await TBCToken.balanceOf(owner.address);
      expect(await TBCToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      await TBCToken.transfer(addr1.address, 50);
      const addr1Balance = await TBCToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      await TBCToken.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await TBCToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it("Should fail if sender doesn’t have enough tokens", async function () {
      const initialOwnerBalance = await TBCToken.balanceOf(owner.address);

      await expect(
        TBCToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("Not enough tokens");

      expect(await TBCToken.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    it("Should update balances after transfers", async function () {
      const initialOwnerBalance = await TBCToken.balanceOf(owner.address);

      await TBCToken.transfer(addr1.address, 100);
      await TBCToken.transfer(addr2.address, 50);

      const finalOwnerBalance = await TBCToken.balanceOf(owner.address);
      expect(finalOwnerBalance).to.equal(initialOwnerBalance - 150);

      const addr1Balance = await TBCToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(100);

      const addr2Balance = await TBCToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });
  });
});
