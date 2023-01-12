import create from "zustand";
import { ethers } from "ethers";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
//
import { addresses } from "Utils/Constants";
import TokenAbi from "Abis/Token.json";
import ExchangeAbi from "Abis/Exchange.json";

const useSetup = create(
  immer(
    devtools((set, get) => ({
      provider: {
        connection: null,
        chainId: "",
        account: "",
        balance: "",
        isLoading: false,
      },
      tokens: {
        loaded: false,
        contracts: [],
        symbols: [],
        balances: [],
      },
      exchange: {
        loaded: false,
        contract: null,
        balances: [],
        transaction: {
          transactionType: "Transfer",
          isPending: false,
          isSuccessful: false,
          isError: false,
        },
        events: [],
        transferInProgress: false,
      },

      // Methods
      loadProvider: () => {
        const provider = { ...get().provider };
        const connection = new ethers.providers.Web3Provider(window.ethereum);
        provider.connection = connection;
        set({ provider }, false, "Provider_Loaded");
        return connection;
      },
      loadNetwork: async () => {
        const provider = { ...get().provider };
        const { chainId } = await get().loadProvider().getNetwork();
        provider.chainId = chainId;
        set({ provider }, false, "Network_Loaded");
        return chainId;
      },
      loadAccount: async () => {
        const provider = { ...get().provider };
        // Set Loader
        provider.isLoading = true;
        set({ provider }, false, "Account_Loading...");

        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = ethers.utils.getAddress(accounts[0]);
        provider.account = account;
        set({ provider }, false, "Account_Loaded");

        // Load Balance
        let connection = await provider.connection;
        let balance = await connection.getBalance(provider.account);
        balance = ethers.utils.formatEther(balance);
        provider.balance = balance;
        set({ provider }, false, "Balance_Loaded");

        // Set Loader
        provider.isLoading = false;
        set({ provider }, false, "Account_Loading_done");

        await get().loadBalances();

        return account;
      },
      loadToken: async (addrress1, address2) => {
        const tokens = { ...get().tokens };

        let token, symbol;

        // Load Token 1
        token = new ethers.Contract(
          addrress1,
          TokenAbi,
          get().provider.connection
        );
        symbol = await token.symbol();
        tokens.contracts[0] = token;
        tokens.symbols[0] = symbol;
        set({ tokens }, false, "Token_1_Loaded");

        // Load Token 2
        token = new ethers.Contract(
          address2,
          TokenAbi,
          get().provider.connection
        );
        symbol = await token.symbol();
        tokens.contracts[1] = token;
        tokens.symbols[1] = symbol;

        tokens.loaded = true;
        set({ tokens }, false, "Token_2_Loaded");

        return token;
      },
      loadExchange: async () => {
        const exchange = { ...get().exchange };

        let exchangeContract = new ethers.Contract(
          addresses.exchange,
          ExchangeAbi,
          get().provider.connection
        );

        exchange.contract = exchangeContract;
        exchange.loaded = true;
        set({ exchange }, false, "Exchange_Loaded");

        return exchange;
      },
      loadBalances: async () => {
        const tokens = get().tokens.contracts;
        const exchange = get().exchange.contract;
        const account = get().provider.account;

        // Balance of token 1
        let balance = ethers.utils.formatUnits(
          await tokens[0].balanceOf(account),
          18
        );
        // c({ balance });
        set(
          (prevState) => ({
            ...prevState,
            tokens: { ...prevState.tokens, balances: [balance] },
          }),
          false,
          "Token_1_balance_Loaded"
        );

        // Balance of token 2
        balance = ethers.utils.formatUnits(
          await tokens[1].balanceOf(account),
          18
        );
        // c({ balance });
        set(
          (prevState) => ({
            ...prevState,
            tokens: {
              ...prevState.tokens,
              balances: [prevState.tokens.balances[0], balance],
            },
          }),
          false,
          "Token_2_balance_Loaded"
        );

        // Balance of token 1 in exchange
        balance = ethers.utils.formatUnits(
          await exchange.balanceOf(tokens[0].address, account),
          18
        );
        // c({ balance });
        set(
          (prevState) => ({
            ...prevState,
            exchange: { ...prevState.exchange, balances: [balance] },
          }),
          false,
          "Token_1_exchange_balance_Loaded"
        );

        // Balance of token 2 in exchange
        balance = ethers.utils.formatUnits(
          await exchange.balanceOf(tokens[1].address, account),
          18
        );
        // c({ balance });
        set(
          (prevState) => ({
            ...prevState,
            exchange: {
              ...prevState.exchange,
              balances: [prevState.exchange.balances[0], balance],
            },
          }),
          false,
          "Token_2_exchange_balance_Loaded"
        );
      },
      initSetUp: async () => {
        // Connect Ethers to blockchain
        await get().loadProvider();
        // Fetch current network's chainId (e.g. hardhat: 31337, kovan: 42)
        await get().loadNetwork();
        // Fetch current account and balance from metamask
        // await get().loadAccount();
        // // Fetch balance of current account from metamask
        // await get().loadBalance();
        // Load token smart contracts
        await get().loadToken(addresses.Dapp, addresses.mETH);
        // Load exchange smart contracts
        await get().loadExchange();
        // Subscribe to events
        await get().subscribeToEvents();
      },
      transferTokens: async (token, amount) => {
        set(
          (state) => {
            state.exchange.transferInProgress = true;
            state.exchange.transaction.isPending = true;
            state.exchange.transaction.isSuccessful = false;
          },
          false,
          "Transfer_request_started"
        );
        const provider = get().provider.connection;
        const exchange = get().exchange.contract;
        let transaction;

        const signer = await provider.getSigner();
        const amountToTransfer = ethers.utils.parseUnits(amount.toString(), 18);

        try {
          // Aprrove exchange to be able to spend token on users behalf
          transaction = await token
            .connect(signer)
            .approve(exchange.address, amountToTransfer);
          await transaction.wait();

          // Aprrove exchange to be able to spend token on users behalf
          transaction = await exchange
            .connect(signer)
            .depositToken(token.address, amountToTransfer);
          await transaction.wait();
        } catch (error) {
          set(
            (state) => {
              state.exchange.transferInProgress = true;
              state.exchange.transaction.isPending = true;
              state.exchange.transaction.isSuccessful = false;
              state.exchange.transaction.isError = true;
            },
            false,
            "Transfer_request_failed"
          );
        }
      },
      subscribeToEvents: async () => {
        const exchange = get().exchange.contract;

        exchange.on("Deposit", (token, user, amount, balance, events) => {
          set(
            (state) => {
              state.exchange.transferInProgress = false;
              state.exchange.transaction.isPending = false;
              state.exchange.transaction.isSuccessful = true;
              state.exchange.events = [events, ...state.exchange.events];
            },
            false,
            "Transfer_request_completed"
          );
        });
      },
    }))
  )
);

export default useSetup;
