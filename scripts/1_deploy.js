import { ethers } from "hardhat";

async function main() {
  console.log(`Preparing Deployment.......\n`);

  //   Fetch contract to deply
  const Token = await ethers.getContractFactory("Token");
  const Exchange = await ethers.getContractFactory("Exchange");

  // Get accounts
  const accounts = await ethers.getSigners();

  // Deploy token Dapp
  const Dapp = await Token.deploy("Dapp", "Dapp", "1000000");
  await Dapp.deployed();
  console.log(`Token Dapp deployed to: ${Dapp.address}`);

  // Deploy token mETH
  const mETH = await Token.deploy("mETH", "mETH", "1000000");
  await mETH.deployed();
  console.log(`Token mETH deployed to: ${mETH.address}`);

  // Deploy token mDai
  const mDai = await Token.deploy("mDai", "mDai", "1000000");
  await mDai.deployed();
  console.log(`Token mDai deployed to: ${mDai.address}`);

  // Deploy exchange
  const exchange = await Exchange.deploy(accounts[0].address, 10);
  await exchange.deployed();
  console.log(`Exchange deployed at: ${exchange.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
