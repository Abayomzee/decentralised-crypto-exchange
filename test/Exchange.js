import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};
const invalidAddress = "0x0000000000000000000000000000000000000000";

describe("Exchange", () => {
  let exchange, accounts, deployer, feeAccount, user1, user2, token1, token2;
  const feePercent = 10;

  beforeEach(async () => {
    const Exchange = await ethers.getContractFactory("Exchange");
    const Token = await ethers.getContractFactory("Token");

    accounts = await ethers.getSigners();
    deployer = accounts[0];
    feeAccount = accounts[1];
    user1 = accounts[2];
    user2 = accounts[3];

    exchange = await Exchange.deploy(feeAccount.address, feePercent);
    token1 = await Token.deploy("Token1", "TK1", "1000000");
    token2 = await Token.deploy("Mock Dai", "mDai", "1000000");

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
        expect(await exchange.tokens(token1.address, user1.address)).to.equal(
          amount
        );
        expect(
          await exchange.balanceOf(token1.address, user1.address)
        ).to.equal(amount);
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
          exchange.connect(user1).depositToken(token1.address, amount)
        ).to.be.reverted;
      });
    });
  });

  describe("Withdrawing Tokens", () => {
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

        // Withdraw token
        transaction = await exchange
          .connect(user1)
          .withdrawToken(token1.address, amount);
        result = await transaction.wait();
      });

      it("withdraw token funds", async () => {
        expect(await token1.balanceOf(exchange.address)).to.equal(0);
        expect(await exchange.tokens(token1.address, user1.address)).to.equal(
          0
        );
        expect(
          await exchange.balanceOf(token1.address, user1.address)
        ).to.equal(0);
      });

      it("emits a Withdraw event", async () => {
        const event = result.events[1];
        expect(event.event).to.equal("Withdraw");

        const args = event.args;
        expect(args.token).to.equal(token1.address);
        expect(args.user).to.equal(user1.address);
        expect(args.amount).to.equal(amount);
        expect(args.balance).to.equal(0);
      });
    });
    describe("Failure", () => {
      it("fails for insufficient balance", async () => {
        await expect(
          exchange.connect(user1).withdrawToken(token1.address, amount)
        ).to.be.reverted;
      });
    });
  });

  describe("Checking Balances", () => {
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

      it("returns user balance", async () => {
        expect(
          await exchange.balanceOf(token1.address, user1.address)
        ).to.equal(amount);
      });
    });
  });

  describe("Making Orders", () => {
    let transaction, result;
    const amount = tokens(1);

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

        // Make Order
        transaction = await exchange
          .connect(user1)
          .makeOrder(token2.address, amount, token1.address, amount);
        result = await transaction.wait();
      });

      it("tracks the newly created order", async () => {
        expect(await exchange.orderCount()).to.equal(1);
      });
      it("emits a Order event", async () => {
        const event = result.events[0];
        expect(event.event).to.equal("Order");

        const args = event.args;
        expect(args.id).to.equal(1);
        expect(args.user).to.equal(user1.address);
        expect(args.tokenGet).to.equal(token2.address);
        expect(args.amountGet).to.equal(amount);
        expect(args.tokenGive).to.equal(token1.address);
        expect(args.amountGive).to.equal(amount);
        expect(args.timestamp).to.at.least(1);
      });
    });

    describe("Failure", () => {
      it("rejects with no balance", async () => {
        await expect(
          exchange
            .connect(user1)
            .makeOrder(token2.address, tokens(1), token1.address, tokens(2))
        ).to.be.reverted;
      });
    });
  });

  describe("Order actions", () => {
    let transaction, result;
    const amount = tokens(1);
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

      // Give user2 some tokens
      transaction = await token2
        .connect(deployer)
        .transfer(user2.address, tokens(100));
      result = await transaction.wait();

      // User2 Approves tokens
      transaction = await token2
        .connect(user2)
        .approve(exchange.address, tokens(2));
      result = await transaction.wait();

      // User2 deposit tokens
      transaction = await exchange
        .connect(user2)
        .depositToken(token2.address, tokens(2));
      result = await transaction.wait();

      // Make Order
      transaction = await exchange
        .connect(user1)
        .makeOrder(token2.address, amount, token1.address, amount);
      result = await transaction.wait();
    });

    describe("Cancelling orders", () => {
      describe("Success", () => {
        beforeEach(async () => {
          // Cancel Order
          transaction = await exchange.connect(user1).cancelOrder(1);
          result = await transaction.wait();
        });

        it("updates cancelled orders", async () => {
          expect(await exchange.orderCancelled(1)).to.equal(true);
        });

        it("emits a Cancel event", async () => {
          const event = result.events[0];
          expect(event.event).to.equal("Cancel");

          const args = event.args;
          expect(args.id).to.equal(1);
          expect(args.user).to.equal(user1.address);
          expect(args.tokenGet).to.equal(token2.address);
          expect(args.amountGet).to.equal(amount);
          expect(args.tokenGive).to.equal(token1.address);
          expect(args.amountGive).to.equal(amount);
          expect(args.timestamp).to.at.least(1);
        });
      });
      describe("Failure", () => {
        it("rejects invalid order ids", async () => {
          await expect(exchange.connect(user1).cancelOrder(999)).to.be.reverted;
        });
        it("rejects unauthourized cancelations", async () => {
          await expect(exchange.connect(user2).cancelOrder(1)).to.be.reverted;
        });
      });
    });

    describe("Filling orders", () => {
      describe("Success", () => {
        beforeEach(async () => {
          // Fill Order
          transaction = await exchange.connect(user2).fillOrder(1);
          result = await transaction.wait();
        });
        it("executes the trade and charge fees", async () => {
          // Token give
          expect(
            await exchange.balanceOf(token1.address, user1.address)
          ).to.equal(tokens(0));
          expect(
            await exchange.balanceOf(token1.address, user2.address)
          ).to.equal(tokens(1));
          expect(
            await exchange.balanceOf(token1.address, feeAccount.address)
          ).to.equal(tokens(0));
          // Token get
          expect(
            await exchange.balanceOf(token2.address, user1.address)
          ).to.equal(tokens(1));
          expect(
            await exchange.balanceOf(token2.address, user2.address)
          ).to.equal(tokens(0.9));
          expect(
            await exchange.balanceOf(token2.address, feeAccount.address)
          ).to.equal(tokens(0.1));
        });

        it("updates filled orders", async () => {
          expect(await exchange.orderFilled(1)).to.equal(true);
        });

        it("emits a Trade event", async () => {
          const event = result.events[0];
          expect(event.event).to.equal("Trade");

          const args = event.args;
          expect(args.id).to.equal(1);
          expect(args.user).to.equal(user2.address);
          expect(args.tokenGet).to.equal(token2.address);
          expect(args.amountGet).to.equal(amount);
          expect(args.tokenGive).to.equal(token1.address);
          expect(args.amountGive).to.equal(amount);
          expect(args.timestamp).to.at.least(1);
        });
      });

      describe("Failure", () => {
        it("rejects invalid order ids", async () => {
          await expect(exchange.connect(user2).fillOrder(999)).to.be.reverted;
        });
        it("rejects already filled orders", async () => {
          transaction = await exchange.connect(user2).fillOrder(1);
          await transaction.wait();

          await expect(exchange.connect(user2).fillOrder(1)).to.be.reverted;
        });
        it("rejects cancelled orders", async () => {
          transaction = await exchange.connect(user1).cancelOrder(1);
          await transaction.wait();

          await expect(exchange.connect(user2).cancelOrder(1)).to.be.reverted;
        });
      });
    });
  });
});
// });
