import create from "zustand";
import { ethers } from "ethers";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import _ from "lodash";
//
import { addresses, orderTypeColors } from "Utils/Constants";
import ExchangeAbi from "Abis/Exchange.json";
import TokenAbi from "Abis/Token.json";
import { buildGraphdata, c, formatOrders } from "Utils/Helpers";

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
        allOrders: {
          loaded: false,
          data: [],
          orderBook: {
            loadingOrderBook: false,
            data: { groupedOrders: [], buyOrders: [], sellOrders: [] },
          },
        },
        openOrders: {
          loaded: false,
          data: { all: [], buyOrders: [], sellOrders: [] },
        },
        cancelledOrders: {
          loaded: false,
          data: { all: [], buyOrders: [], sellOrders: [] },
        },
        filledOrders: {
          loaded: false,
          data: { all: [], buyOrders: [], sellOrders: [] },
        },
        chartdata: {
          lastPrice: 0,
          lastPriceChangeStatus: 0,
          series: [{ data: [] }],
        },
        trades: {
          loaded: false,
          data: [],
        },
        myOpenOrders: {
          loaded: false,
          data: [],
        },
        myFilledOrders: {
          loaded: false,
          data: [],
        },
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
        await get().getMyOpenOrders();
        await get().getMyFilledOrders();

        return account;
      },
      loadToken: async (addrress1, address2) => {
        // const tokens = { ...get().tokens };

        let token, symbol;

        // Load Token 1
        token = new ethers.Contract(
          addrress1,
          TokenAbi,
          get().provider.connection
        );
        symbol = await token.symbol();
        // tokens.contracts[0] = token;
        // tokens.symbols[0] = symbol;

        set(
          (state) => {
            state.tokens.contracts = [token];
            state.tokens.symbols = [symbol];
          },
          false,
          "Token_1_Loaded"
        );

        // set({ tokens }, false, "Token_1_Loaded");

        // Load Token 2
        token = new ethers.Contract(
          address2,
          TokenAbi,
          get().provider.connection
        );
        symbol = await token.symbol();
        // tokens.contracts[1] = token;
        // tokens.symbols[1] = symbol;

        set(
          (state) => {
            state.tokens.contracts = [state.tokens.contracts[0], token];
            state.tokens.symbols = [state.tokens.symbols[0], symbol];
            state.tokens.loaded = true;
          },
          false,
          "Token_2_Loaded"
        );

        // tokens.loaded = true;
        // set({ tokens }, false, "Token_2_Loaded");

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

      transferTokens: async (token, amount, type) => {
        set(
          (state) => {
            state.exchange.transferInProgress = true;
            state.exchange.transaction.transactionType = type;
            state.exchange.transaction.isPending = true;
            state.exchange.transaction.isSuccessful = false;
          },
          false,
          `${type}_request_started`
        );
        const provider = get().provider.connection;
        const exchange = get().exchange.contract;
        let transaction;

        const signer = await provider.getSigner();
        const amountToTransfer = ethers.utils.parseUnits(amount.toString(), 18);

        if (type === "Deposit" && amount) {
          try {
            // Aprrove exchange to be able to spend token on users behalf
            transaction = await token
              .connect(signer)
              .approve(exchange.address, amountToTransfer);
            await transaction.wait();

            // Transfer Token
            transaction = await exchange
              .connect(signer)
              .depositToken(token.address, amountToTransfer);
            await transaction.wait();
          } catch (error) {
            set(
              (state) => {
                state.exchange.transferInProgress = false;
                state.exchange.transaction.transactionType = type;
                state.exchange.transaction.isPending = false;
                state.exchange.transaction.isSuccessful = false;
                state.exchange.transaction.isError = true;
              },
              false,
              `${type}_request_failed`
            );
          }
        }
        if (type === "Withdraw" && amount) {
          // c({ amount });
          try {
            // Withdraw Token
            transaction = await exchange
              .connect(signer)
              .withdrawToken(token.address, amountToTransfer);
            await transaction.wait();
          } catch (error) {
            set(
              (state) => {
                state.exchange.transferInProgress = false;
                state.exchange.transaction.transactionType = type;
                state.exchange.transaction.isPending = false;
                state.exchange.transaction.isSuccessful = false;
                state.exchange.transaction.isError = true;
              },
              false,
              `${type}_request_failed`
            );
          }
        }
      },
      subscribeToEvents: async () => {
        const exchange = get().exchange.contract;

        // provider.once("block", () => {
        // Listen to 'Deposit' events
        exchange.on("Deposit", (token, user, amount, balance, events) => {
          console.log({ depositEvent: events });

          set(
            (state) => {
              state.exchange.transferInProgress = false;
              state.exchange.transaction.isPending = false;
              state.exchange.transaction.isSuccessful = true;

              // Add new events
              let lastEvent = state.exchange.events[0]; // check for last event if available
              if (!lastEvent) {
                state.exchange.events = [events];
              } else if (lastEvent.blockNumber !== events.blockNumber) {
                state.exchange.events = [events, ...state.exchange.events];
              }
            },
            false,
            "Deposit_request_completed"
          );
        });

        // Listen to 'Withdraw' events
        exchange.on("Withdraw", (token, user, amount, balance, events) => {
          set(
            (state) => {
              state.exchange.transferInProgress = false;
              state.exchange.transaction.isPending = false;
              state.exchange.transaction.isSuccessful = true;

              // Add new events
              let lastEvent = state.exchange.events[0]; // check for last event if available
              if (!lastEvent) {
                state.exchange.events = [events];
              } else if (lastEvent.blockNumber !== events.blockNumber) {
                state.exchange.events = [events, ...state.exchange.events];
              }
            },
            false,
            "Withdraw_request_completed"
          );
        });

        // Listen to 'Order' events
        exchange.on(
          "Order",
          (
            id,
            user,
            tokenGet,
            amountGet,
            tokenGive,
            amountGive,
            timestamp,
            events
          ) => {
            const order = events.args;
            set(
              (state) => {
                state.exchange.transferInProgress = false;
                state.exchange.transaction.isPending = false;
                state.exchange.transaction.isSuccessful = true;
                // state.exchange.allOrders = [order, ...state.exchange.allOrders];

                // Add new events
                let lastEvent = state.exchange.events[0]; // check for last event if available
                if (!lastEvent) {
                  state.exchange.events = [events];
                } else if (lastEvent.blockNumber !== events.blockNumber) {
                  state.exchange.events = [events, ...state.exchange.events];
                }

                // Add new Order
                let index = state.exchange.allOrders.data.findIndex(
                  (order) => order.id.toString() === id.toString()
                );
                if (index === -1) {
                  state.exchange.allOrders.data = [
                    order,
                    ...state.exchange.allOrders.data,
                  ];
                  // state.exchange.allOrders.data = [
                  //   order,
                  //   ...state.exchange.allOrders.data,
                  // ];
                } else {
                }

                // Updated Order loaded status
                state.exchange.allOrders.loaded = true;
              },
              false,
              "Order_request_completed"
            );
          }
        );
        // });
      },
      makeBuyOrder: async (amount, price) => {
        set(
          (state) => {
            state.exchange.transferInProgress = true;
            state.exchange.transaction.transactionType = "New Order";
            state.exchange.transaction.isPending = true;
            state.exchange.transaction.isSuccessful = false;
          },
          false,
          "Order_request_started"
        );
        const provider = get().provider.connection;
        const exchange = get().exchange.contract;
        const tokens = get().tokens.contracts;

        const tokenGet = tokens[0].address;
        const amountGet = ethers.utils.parseUnits(amount.toString(), 18);
        const tokenGive = tokens[1].address;
        const amountGive = ethers.utils.parseUnits(
          (amount * price).toString(),
          18
        );

        let transaction;
        try {
          const signer = await provider.getSigner();
          transaction = await exchange
            .connect(signer)
            .makeOrder(tokenGet, amountGet, tokenGive, amountGive);
          await transaction.wait();
        } catch (error) {
          set(
            (state) => {
              state.exchange.transferInProgress = true;
              state.exchange.transaction.isPending = false;
              state.exchange.transaction.isSuccessful = false;
              state.exchange.transaction.isError = true;
            },
            false,
            "Order_request_failed"
          );
        }
      },
      makeSellOrder: async (amount, price) => {
        set(
          (state) => {
            state.exchange.transferInProgress = true;
            state.exchange.transaction.transactionType = "New Order";
            state.exchange.transaction.isPending = true;
            state.exchange.transaction.isSuccessful = false;
          },
          false,
          "Order_request_started"
        );
        const provider = get().provider.connection;
        const exchange = get().exchange.contract;
        const tokens = get().tokens.contracts;

        const tokenGive = tokens[0].address;
        const amountGive = ethers.utils.parseUnits(amount.toString(), 18);
        const tokenGet = tokens[1].address;
        const amountGet = ethers.utils.parseUnits(
          (amount * price).toString(),
          18
        );

        let transaction;
        try {
          const signer = await provider.getSigner();
          transaction = await exchange
            .connect(signer)
            .makeOrder(tokenGet, amountGet, tokenGive, amountGive);
          await transaction.wait();
        } catch (error) {
          set(
            (state) => {
              state.exchange.transferInProgress = true;
              state.exchange.transaction.isPending = false;
              state.exchange.transaction.isSuccessful = false;
              state.exchange.transaction.isError = true;
            },
            false,
            "Order_request_failed"
          );
        }
      },
      loadAllOrders: async () => {
        const provider = get().provider.connection;
        const exchange = get().exchange.contract;
        const block = await provider.getBlockNumber();

        // Fetch all orders
        const orderStream = await exchange.queryFilter("Order", 0, block);
        const allOrders = orderStream.map((event) => event.args);
        // Fetch all cancelled orders
        const cancelStream = await exchange.queryFilter("Cancel", 0, block);
        const cancelledOrders = cancelStream.map((event) => event.args);
        // Fetch all filled orders
        const filledStream = await exchange.queryFilter("Trade", 0, block);
        const filledOrders = filledStream.map((event) => event.args);

        set(
          (state) => {
            state.exchange.allOrders.data = allOrders;
            state.exchange.allOrders.loaded = true;
          },
          false,
          "All_Orders_loaded"
        );
        set(
          (state) => {
            state.exchange.cancelledOrders.data.all = cancelledOrders;
            state.exchange.cancelledOrders.loaded = true;
          },
          false,
          "Canclled_Orders_loaded"
        );
        set(
          (state) => {
            state.exchange.filledOrders.data.all = filledOrders;
            state.exchange.filledOrders.loaded = true;
          },
          false,
          "Filled_Orders_loaded"
        );
      },
      orderBookSelector: async () => {
        // Filter orders by seleted tokens
        const tokens = get().tokens.contracts;
        const stateOrders = get().exchange.allOrders.data;
        let orders = [...stateOrders];

        // Check if tokens are available
        if (!tokens[0] || !tokens[1]) return;

        // Filter out orders that are perculier to the current selected tokens in the exchange
        orders = orders.filter(
          (order) =>
            order.tokenGet === tokens[0].address ||
            order.tokenGet === tokens[1].address
        );
        orders = orders.filter(
          (order) =>
            order.tokenGive === tokens[0].address ||
            order.tokenGive === tokens[1].address
        );

        // Modify all orders by adding new useful data
        let formattedOrders = formatOrders(orders, tokens);

        // Group all orders by order type
        const groupedOrders = _.groupBy(formattedOrders, "orderType");

        // Fetch all buy and sell orders
        let buyOrders = _.get(groupedOrders, "buy", []);
        let sellOrders = _.get(groupedOrders, "sell", []);

        // Sort all buy and sell orders based on orderPrice
        buyOrders = buyOrders.sort((a, b) => b.tokenPrice - a.tokenPrice);
        sellOrders = sellOrders.sort((a, b) => b.tokenPrice - a.tokenPrice);
        //

        // Get open orders *****************/
        const filledOrders = get().exchange.filledOrders.data.all;
        const cancelledOrders = get().exchange.cancelledOrders.data.all;

        const openOrders = _.reject(formattedOrders, (order) => {
          let orderFilled = filledOrders.some((o) => {
            return o.id.toString() === order.id.toString();
          });
          let orderCancelled = cancelledOrders.some((o) => {
            return o.id.toString() === order.id.toString();
          });

          return orderFilled || orderCancelled;
        });

        const groupedOpenOrders = _.groupBy(openOrders, "orderType");
        let openBuyOrders = _.get(groupedOpenOrders, "buy", []);
        let openSellOrders = _.get(groupedOpenOrders, "sell", []);
        openBuyOrders = openBuyOrders.sort(
          (a, b) => b.tokenPrice - a.tokenPrice
        );
        openSellOrders = openSellOrders.sort(
          (a, b) => b.tokenPrice - a.tokenPrice
        );
        // Get open orders *****************/
        // Update store
        set(
          (state) => {
            state.exchange.allOrders.orderBook.data = {
              groupedOrders,
              buyOrders,
              sellOrders,
            };

            state.exchange.openOrders.data.all = openOrders;
            state.exchange.openOrders.data.buyOrders = openBuyOrders;
            state.exchange.openOrders.data.sellOrders = openSellOrders;
          },
          false,
          "Loaded_OrderBook_slector"
        );
      },
      priceChartSelector: async () => {
        // Filter orders by seleted tokens
        const filledOrders = get().exchange.filledOrders.data.all;
        let orders = [...filledOrders];
        const tokens = get().tokens.contracts;

        // Check if tokens are available
        if (!tokens[0] || !tokens[1]) return;

        // Filter out orders that are perculier to the current selected tokens in the exchange
        orders = orders.filter(
          (order) =>
            order.tokenGet === tokens[0].address ||
            order.tokenGet === tokens[1].address
        );
        orders = orders.filter(
          (order) =>
            order.tokenGive === tokens[0].address ||
            order.tokenGive === tokens[1].address
        );

        // Sort orders by date (ascending) to compare history
        orders = orders.sort((a, b) => a.timestamp - b.timestamp);

        // Modify all orders by adding new useful data
        let formattedOrders = formatOrders(orders, tokens);
        const lastOrder = formattedOrders.at(-1);
        const secondLastOrder = formattedOrders.at(-2);
        const lastPrice = _.get(lastOrder, "tokenPrice", 0);
        const secondLastPrice = _.get(secondLastOrder, "tokenPrice", 0);
        const lastPriceChangeStatus = lastPrice >= secondLastPrice ? "+" : "-";

        set((state) => {
          state.exchange.chartdata.series[0].data =
            buildGraphdata(formattedOrders);
          state.exchange.chartdata.lastPrice = lastPrice;
          state.exchange.chartdata.lastPriceChangeStatus =
            lastPriceChangeStatus;
        });
      },
      tradesSelector: async () => {
        // Filter orders by seleted tokens
        const filledOrders = get().exchange.filledOrders.data.all;
        let orders = [...filledOrders];
        const tokens = get().tokens.contracts;

        // Check if tokens are available
        if (!tokens[0] || !tokens[1]) return;

        // Filter out orders that are perculier to the current selected tokens in the exchange
        orders = orders.filter(
          (order) =>
            order.tokenGet === tokens[0].address ||
            order.tokenGet === tokens[1].address
        );
        orders = orders.filter(
          (order) =>
            order.tokenGive === tokens[0].address ||
            order.tokenGive === tokens[1].address
        );

        // Sort orders by date (ascending) to compare history
        orders = orders.sort((a, b) => a.timestamp - b.timestamp);

        // Modify all orders by adding new useful data
        let formattedOrders = formatOrders(orders, tokens);

        orders = formattedOrders.map((order) => {
          let previousOrder = formattedOrders[0];

          const isUp =
            previousOrder.id === order.id
              ? true
              : previousOrder.tokenPrice < order.tokenPrice
              ? true
              : false;

          previousOrder = order;

          return {
            ...order,
            orderTradeTypeClass: isUp
              ? orderTypeColors.buyColor
              : orderTypeColors.sellColor,
          };
        });

        // Sort orders by date (descending) to compare history
        orders = orders.sort((a, b) => b.timestamp - a.timestamp);

        set(
          (state) => {
            state.exchange.trades.data = orders;
            state.exchange.trades.loaded = true;
          },
          false,
          "Trades_loaded"
        );
      },
      getMyOpenOrders: async () => {
        // Filter orders by seleted tokens
        const openOrders = get().exchange.openOrders.data.all;
        let orders = [...openOrders];
        const tokens = get().tokens.contracts;
        const account = get().provider.account;

        // Check if tokens are available
        if (!tokens[0] || !tokens[1]) return;

        // Get user orders
        orders = orders.filter((order) => order.user === account);

        // Filter out orders that are perculier to the current selected tokens in the exchange
        orders = orders.filter(
          (order) =>
            order.tokenGet === tokens[0].address ||
            order.tokenGet === tokens[1].address
        );
        orders = orders.filter(
          (order) =>
            order.tokenGive === tokens[0].address ||
            order.tokenGive === tokens[1].address
        );

        // Sort orders by date (ascending) to compare history
        // orders = orders.sort((a, b) => a.timestamp - b.timestamp);

        // Sort orders by date (descending) to compare history
        orders = orders.sort((a, b) => b.timestamp - a.timestamp);

        set(
          (state) => {
            state.exchange.myOpenOrders.data = orders;
            state.exchange.myOpenOrders.loaded = true;
          },
          false,
          "My_open_orders_loaded"
        );
      },
      getMyFilledOrders: async () => {
        // Filter orders by seleted tokens
        const filledOrders = get().exchange.filledOrders.data.all;
        let orders = [...filledOrders];
        const tokens = get().tokens.contracts;
        const account = get().provider.account;

        // Check if tokens are available
        if (!tokens[0] || !tokens[1]) return;

        // Get our  orders
        orders = orders.filter(
          (order) => order.user === account || order.creator === account
        );

        // Filter out orders that are perculier to the current selected tokens in the exchange
        orders = orders.filter(
          (order) =>
            order.tokenGet === tokens[0].address ||
            order.tokenGet === tokens[1].address
        );
        orders = orders.filter(
          (order) =>
            order.tokenGive === tokens[0].address ||
            order.tokenGive === tokens[1].address
        );

        // Sort orders by date (descending) to compare history
        orders = orders.sort((a, b) => b.timestamp - a.timestamp);

        // Decorate orders
        orders = formatOrders(orders, tokens);
        orders = orders.map((order) => {
          const myOrder = order.creator === account;
          let orderType;
          if (myOrder) {
            orderType = order.tokenGive === tokens[1].address ? "buy" : "sell";
          } else {
            orderType = order.tokenGive === tokens[1].address ? "sell" : "buy";
          }
          return {
            ...order,
            orderType,
            orderClass:
              orderType === "buy"
                ? orderTypeColors.buyColor
                : orderTypeColors.sellColor,
            tokenTradeAmount:
              orderType === "buy"
                ? `+${order.token0Amount}`
                : `-${order.token0Amount}`,
          };
        });

        console.log({ orders });

        set(
          (state) => {
            state.exchange.myFilledOrders.data = orders;
            state.exchange.myFilledOrders.loaded = true;
          },
          false,
          "My_filled_orders_loaded"
        );
      },
      initSetUp: async () => {
        // Connect Ethers to blockchain
        await get().loadProvider();
        // Fetch current network's chainId (e.g. hardhat: 31337, kovan: 42)
        await get().loadNetwork();
        // Fetch current account and balance from metamask
        // await get().loadAccount(); // comment back
        // // Fetch balance of current account from metamask
        // await get().loadBalance(); // Comment back
        // Load token smart contracts
        await get().loadToken(addresses.Dapp, addresses.mETH);
        // Load exchange smart contracts
        await get().loadExchange();
        // Subscribe to events
        await get().subscribeToEvents();
        // Load events
        await get().loadAllOrders();
        // Load order book
        await get().orderBookSelector();
        // Load price chart
        await get().priceChartSelector();
        // Load trades
        await get().tradesSelector();
        // Load my open orders
        // await get().getMyOpenOrders();
      },
    }))
  )
);

export default useSetup;
