import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};
const invalidAddress = "0x0000000000000000000000000000000000000000";

describe("Exchange", () => {
  let exchange, accounts, deployer, feeAccount, user1, token1;
  const feePercent = 10;

  beforeEach(async () => {
    const Exchange = await ethers.getContractFactory("Exchange");
    const Token = await ethers.getContractFactory("Token");

    accounts = await ethers.getSigners();
    deployer = accounts[0];
    feeAccount = accounts[1];
    user1 = accounts[2];

    exchange = await Exchange.deploy(feeAccount.address, feePercent);
    token1 = await Token.deploy("Token1", "TK1", "1000000");

    let transaction = await token1
      .connect(deployer)
      .transfer(user1.address, tokens(100));
    await transaction.wait();
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

  describe("Depositing Tokens", () => {
    let transaction, result;
    const amount = tokens(10);

    describe("Success", () => {

        beforeEach(async () => {
          // Approve exchange
          transaction = await token1
            .connect(user1)
            .approve(exchange.address, amount);
          result = await transaction.wait();
          // Deposit token
          transaction = await exchange
            .connect(user1)
            .depositToken(token1.address, amount);
          result = await transaction.wait();
        });

      it("tracks the token deposit", async () => {

        expect(await token1.balanceOf(exchange.address)).to.equal(amount);
        expect(await exchange.tokens(token1.address, user1.address)).to.equal(amount);
        expect(await exchange.balanceOf(token1.address, user1.address)).to.equal(amount);

      });

      it("emits a Deposit event", async () => {
        const event = result.events[1];
        expect(event.event).to.equal("Deposit");

        const args = event.args;
        expect(args.token).to.equal(token1.address);
        expect(args.user).to.equal(user1.address);
        expect(args.amount).to.equal(amount);
        expect(args.balance).to.equal(amount);
      });
    });
    describe("Failure", () => {
        it("fails when no tokens are approved", async () => {
          await expect(
            exchange
              .connect(user1)
              .depositToken(token1.address, amount)
          ).to.be.reverted;
        });
    });
  });
});
