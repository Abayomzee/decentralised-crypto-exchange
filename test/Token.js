import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("Token", () => {
  const tokenName = "My Token";
  const tokenSymbol = "DAPP";
  const tokenDecimals = 18;
  // const tokenTotalSupply = "1000000000000000000000000";
  const tokenTotalSupply = tokens("1000000");
  let token;

  beforeEach(async () => {
    const Token = await ethers.getContractFactory("Token");
    token = await Token.deploy(tokenName, tokenSymbol, "1000000");
  });

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
});
