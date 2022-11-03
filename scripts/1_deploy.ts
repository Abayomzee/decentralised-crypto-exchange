import { ethers } from "hardhat";

async function main() {
  //   Fetch contract to deply
  const Token = await ethers.getContractFactory("Token");

  // Deploy contract
  const token = await Token.deploy();
  await token.deployed();

  const name = await token.name()
  console.log(`Token ${name} deployed to: ${token.address}`);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
