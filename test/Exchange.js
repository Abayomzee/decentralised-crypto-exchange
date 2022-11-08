import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};
const invalidAddress = "0x0000000000000000000000000000000000000000";

describe("Token", () => {
  let exchange, accounts, deployer, feeAccount;
  const feePercent = 10;

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    deployer = accounts[0];
    feeAccount = accounts[1];

    const Exchange = await ethers.getContractFactory("Exchange");
    exchange = await Exchange.deploy(feeAccount.address, feePercent);
  });

  describe("Deployment", () => {
    it("tracks fee account", async () => {
      const exchangeFeeAccount = await exchange.feeAccount();
      expect(exchangeFeeAccount).to.equal(feeAccount.address);
    });

    it("tracks fee percent", async () => {
      const exchangeFeePercent = await exchange.feePercent();
      expect(exchangeFeePercent).to.equal(feePercent);
    });
  });
});
