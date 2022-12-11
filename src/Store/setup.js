import create from "zustand";
import { ethers } from "ethers";
import { devtools } from "zustand/middleware";
//
import { addresses } from "Utils/Constants";
import TokenAbi from "Abis/Token.json";
import { c } from "Utils/Helpers";

const useSetup = create(
  devtools((set, get) => ({
    provider: null,
    chainId: "",
    account: "",
    token: null,
    symbol: "",

    // Methods
    loadProvider: () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      set({ provider }, false, "Provider_Loaded");
      return provider;
    },
    loadNetwork: async () => {
      const { chainId } = await get().loadProvider().getNetwork();
      c({ chainId });
      set({ chainId }, false, "Network_Loaded");
      return chainId;
    },
    loadAccount: async () => {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = ethers.utils.getAddress(accounts[0]);
      c({ account });
      set({ account }, false, "Account_Loaded");
      return account;
    },
    loadToken: async () => {
      let token, symbol;

      token = new ethers.Contract(addresses.Dapp, TokenAbi, get().provider);
      symbol = await token.symbol();
      c({ token, symbol });
      set({ token, symbol }, false, "Token_Loaded");
      return token;
    },
    initSetUp: async () => {
      await get().loadAccount();
      await get().loadProvider();
      await get().loadNetwork();
      await get().loadToken();
    },
  }))
);

export default useSetup;
