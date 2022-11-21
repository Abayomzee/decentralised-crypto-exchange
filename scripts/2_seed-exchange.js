import { ethers } from "hardhat";
import config from "./../src/config.json";

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};
const wait = (seconds) => {
  const milliSec = seconds * 1000;
  return new Promise((resolve) => setTimeout(resolve, milliSec));
};

async function main() {
  // Fetch accounts from wallet
  const accounts = await ethers.getSigners();

  // Fetch Network
  const { chainId } = await ethers.provider.getNetwork();
  console.log("Using chainId: ", chainId);

  // Fetch deployed tokens
  const Dapp = await ethers.getContractAt(
    "Token",
    config[chainId].Dapp.address
  );
  console.log(`Dapp Token Fetched: ${Dapp.address}`);

  const mETH = await ethers.getContractAt(
    "Token",
    config[chainId].mETH.address
  );
  console.log(`mETH Token Fetched: ${mETH.address}`);

  const mDai = await ethers.getContractAt(
    "Token",
    config[chainId].mDai.address
  );
  console.log(`mDai Token Fetched: ${mDai.address}`);

  // Fetch deployed exchange
  const exchange = await ethers.getContractAt(
    "Exchange",
    config[chainId].exchange.address
  );
  console.log(`Exchange Fetched: ${exchange.address}`);

  //   Give token to account[1]
  const sender = accounts[0];
  const receiver = accounts[1];
  let amount = tokens(10000);

  //   user1 transfer 10,000 mETH
  let transaction, result;
  transaction = await mETH.connect(sender).transfer(receiver.address, amount);
  await transaction.wait();
  console.log(
    `Transferred ${amount} tokens from ${sender.address} to ${receiver.address}`
  );

  // Set up exchange users
  const user1 = accounts[0];
  const user2 = accounts[1];
  amount = tokens(10000);

  //   user1 approve 10,000 Dapp tokens
  transaction = await Dapp.connect(user1).approve(exchange.address, amount);
  await transaction.wait();
  console.log(`Approves ${amount} Dapp tokens from ${user1.address}`);

  //   user1 deposited 10,000 Dapp tokens
  transaction = await exchange
    .connect(user1)
    .depositToken(Dapp.address, amount);
  await transaction.wait();
  console.log(`Deposited ${amount} Dapp tokens from ${user1.address}`);

  //   user2 approve 10,000 mETH tokens
  transaction = await mETH.connect(user2).approve(exchange.address, amount);
  await transaction.wait();
  console.log(`Approves ${amount} mETH tokens from ${user2.address}`);

  //   user1 deposited 10,000 mETH tokens
  transaction = await exchange
    .connect(user2)
    .depositToken(mETH.address, amount);
  await transaction.wait();
  console.log(`Deposited ${amount} mETH tokens from ${user2.address}`);

  //===========================
  // Seed a cancelled Order

  //   User1 makes order to get token
  let orderId;
  transaction = await exchange
    .connect(user1)
    .makeOrder(mETH.address, tokens(100), Dapp.address, tokens(5));
  result = await transaction.wait();
  console.log(`Made Order from ${user1.address}`);

  //   User1 cancels order
  orderId = await result.events[0].args.id;
  transaction = await exchange.connect(user1).cancelOrder(orderId);
  await transaction.wait();
  console.log(`Cancelled Order from ${user1.address}`);

  //   Wait 1 seconds
  await wait(1);

  //===========================
  // Seed a filled Order

  //   User1 makes order to get token
  transaction = await exchange
    .connect(user1)
    .makeOrder(mETH.address, tokens(100), Dapp.address, tokens(10));
  result = await transaction.wait();
  console.log(`Made Order from ${user1.address}`);

  //   User2 fills order
  orderId = result.events[0].args.id;
  transaction = await exchange.connect(user2).fillOrder(orderId);
  await transaction.wait();
  console.log(`Filled Order from ${user2.address}`);

  //   Wait 1 seconds
  await wait(1);

  //   User1 makes order to get token
  transaction = await exchange
    .connect(user1)
    .makeOrder(mETH.address, tokens(200), Dapp.address, tokens(15));
  result = await transaction.wait();
  console.log(`Made Order from ${user1.address}`);

  //   User2 fills order
  orderId = result.events[0].args.id;
  transaction = await exchange.connect(user2).fillOrder(orderId);
  await transaction.wait();
  console.log(`Filled Order from ${user2.address}`);

  //   Wait 1 seconds
  await wait(1);

  //   User1 makes order to get token
  transaction = await exchange
    .connect(user1)
    .makeOrder(mETH.address, tokens(50), Dapp.address, tokens(30));
  result = await transaction.wait();
  console.log(`Made Order from ${user1.address}`);

  //   User2 fills order
  orderId = result.events[0].args.id;
  transaction = await exchange.connect(user2).fillOrder(orderId);
  await transaction.wait();
  console.log(`Filled Order from ${user2.address}\n`);

  //   Wait 1 seconds
  await wait(1);

  //===========================
  // Seed a open Orders

  //   User 1 makes 10 ordera
  for (let i = 1; i <= 10; i++) {
    transaction = await exchange
      .connect(user1)
      .makeOrder(mETH.address, tokens(10 * i), Dapp.address, tokens(10));
    await transaction.wait();
    console.log(`Made Order from ${user1.address}`);

    //   Wait 1 seconds
    await wait(1);
  }

  //   User 2 makes 10 ordera
  for (let i = 1; i <= 10; i++) {
    transaction = await exchange
      .connect(user2)
      .makeOrder(mETH.address, tokens(10 * i), Dapp.address, tokens(10));
    await transaction.wait();
    console.log(`Made Order from ${user2.address}`);

    //   Wait 1 seconds
    await wait(1);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
