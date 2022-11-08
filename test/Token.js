import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};
const invalidAddress = "0x0000000000000000000000000000000000000000";

describe("Token", () => {
  const tokenName = "My Token";
  const tokenSymbol = "DAPP";
  const tokenDecimals = 18;
  // const tokenTotalSupply = "1000000000000000000000000";
  const tokenTotalSupply = tokens("1000000");

  let token, accounts, deployer, receiver, exchange;

  beforeEach(async () => {
    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy(tokenName, tokenSymbol, "1000000");

    accounts = await ethers.getSigners();
    deployer = accounts[0];
    receiver = accounts[1];
    exchange = accounts[2];
  });

  describe("Deployment", () => {
    it("has a correct name", async () => {
      const name = await token.name();
      expect(name).to.equal(tokenName);
    });

    it("has a correct symbol", async () => {
      const symbol = await token.symbol();
      expect(symbol).to.equal(tokenSymbol);
    });

    it("has a correct decimals", async () => {
      const decimals = await token.decimals();
      expect(decimals).to.equal(tokenDecimals);
    });

    it("has a correct totalSupply", async () => {
      const totalSupply = await token.totalSupply();
      expect(totalSupply).to.equal(tokenTotalSupply);
    });

    it("assigns total supply to deployer", async () => {
      const balance = await token.balanceOf(deployer.address);
      expect(balance).to.equal(tokenTotalSupply);
    });
  });

  describe("Sending Token", () => {
    let amount, transaction, result;

    describe("Success", () => {
      beforeEach(async () => {
        amount = tokens("100");
        transaction = await token
          .connect(deployer)
          .transfer(receiver.address, amount);
        result = await transaction.wait();
      });

      it("transfers token balances", async () => {
        const deployerBalance = await token.balanceOf(deployer.address);
        expect(deployerBalance).to.equal(tokens(1000000 - 100));

        const receiverBalance = await token.balanceOf(receiver.address);
        expect(receiverBalance).to.equal(amount);
      });

      it("emits a Transfer event", async () => {
        const event = result.events[0];
        expect(event.event).to.equal("Transfer");

        const args = event.args;
        expect(args.from).to.equal(deployer.address);
        expect(args.to).to.equal(receiver.address);
        expect(args.value).to.equal(amount);
      });
    });

    describe("Failure", () => {
      it("rejects insufficient balances", async () => {
        const invalidAmount = tokens(10000000);
        await expect(
          token.connect(deployer).transfer(receiver.address, invalidAmount)
        ).to.be.reverted;
      });

      it("rejects invalid recipient", async () => {
        const amount = tokens(100);
        await expect(token.connect(deployer).transfer(invalidAddress, amount))
          .to.be.reverted;
      });
    });
  });

  describe("Approving Tokens", () => {
    let amount, transaction, result;

    beforeEach(async () => {
      amount = tokens("100");
      transaction = await token
        .connect(deployer)
        .approve(exchange.address, amount);
      result = await transaction.wait();
    });

    describe("Success", () => {
      it("allocates an allowance for delegated token spending", async () => {
        const allowance = await token.allowance(
          deployer.address,
          exchange.address
        );
        expect(allowance).to.equal(amount);
      });

      it("emits an Approval event", async () => {
        const event = result.events[0];
        expect(event.event).to.equal("Approval");

        const args = event.args;
        expect(args.owner).to.equal(deployer.address);
        expect(args.spender).to.equal(exchange.address);
        expect(args.value).to.equal(amount);
      });
    });

    describe("Failure", () => {
      it("rejects invalid spender", async () => {
        const amount = tokens(100);
        await expect(token.connect(deployer).approve(invalidAddress, amount)).to
          .be.reverted;
      });
    });
  });

  describe("Delegated Token transfer", () => {
    let amount, transaction, result;

    beforeEach(async () => {
      amount = tokens("100");
      transaction = await token
        .connect(deployer)
        .approve(exchange.address, amount);
      result = await transaction.wait();
    });

    describe("Success", () => {
      beforeEach(async () => {
        transaction = await token
          .connect(exchange)
          .transferFrom(deployer.address, receiver.address, amount);
        result = await transaction.wait();
      });

      it("transfer Token balances", async () => {
        const receiverBalance = await token.balanceOf(receiver.address);
        const deployerBalance = await token.balanceOf(deployer.address);

        expect(receiverBalance).to.equal(amount);
        expect(deployerBalance).to.equal(tokens(1000000 - 100));
      });

      it("resets the allowance", async () => {
        const senderAllowanace = await token.allowance(
          deployer.address,
          exchange.address
        );

        expect(senderAllowanace).to.equal(0);
      });

      it("emits a Transfer event", async () => {
        const event = result.events[0];
        expect(event.event).to.equal("Transfer");

        const args = event.args;
        expect(args.from).to.equal(deployer.address);
        expect(args.to).to.equal(receiver.address);
        expect(args.value).to.equal(amount);
      });
    });

    describe("Failure", async () => {
      const invalidAmount = tokens(100000000);

      it("rejects insufficient balances", async () => {
        await expect(
          token
            .connect(exchange)
            .transferFrom(deployer.address, receiver.address, invalidAmount)
        ).to.be.reverted;
      });
    });
  });
});
