import { ethers } from "ethers";
import moment from "moment";
import { orderTypeColors } from "Utils/Constants";
import _ from 'lodash'

export const c = console.log.bind(document);

export const formatOrders = (orders: any, tokens: any) => {
  let formattedOrders = orders.map((order: any) => {
    let token0Amount, token1Amount, tokenPrice;
    if (order.tokenGive === tokens[1].address) {
      token0Amount = order.amountGive;
      token1Amount = order.amountGet;
    } else {
      token0Amount = order.amountGet;
      token1Amount = order.amountGive;
    }

    let precision = 100000;
    tokenPrice = token1Amount / token0Amount;
    tokenPrice = Math.round(tokenPrice * precision) / precision;

    const orderType = order.tokenGive === tokens[1].address ? "buy" : "sell";

    return {
      ...order,
      orderId: order.id,
      id: order.id.toString(),
      token0Amount: ethers.utils.formatUnits(token0Amount, "ether"),
      token1Amount: ethers.utils.formatUnits(token1Amount, "ether"),
      formattedTimestamp: moment
        .unix(order.timestamp.toString())
        .format("h:mm:ssa d MMM D"),
      tokenPrice,
      orderType,
      orderTypeClass:
        orderType === "buy"
          ? orderTypeColors.buyColor
          : orderTypeColors.sellColor,
      orderFillAction: orderType === "buy" ? "sell" : "buy",
    };
  });

  return formattedOrders;
};

export const buildGraphdata = (allOrders: any) => {
  // Group orders by hours for the graph
  let orders = _.groupBy(allOrders, (order) =>
    moment.unix(order.timestamp).startOf("hour").format()
  );

  // Get each hour where data exists
  const hours = Object.keys(orders);

  // Build the graph series
  const graphData = hours.map((hour) => {
    // Fetch all orders from current hour
    const group = orders[hour];

    // Calculate price values: open, high, low, close
    const open = group[0];
    const high = _.maxBy(group, "tokenPrice");
    const low = _.minBy(group, "tokenPrice");
    const close = group[group.length - 1];

    return {
      x: new Date(hour),
      y: [open.tokenPrice, high.tokenPrice, low.tokenPrice, close.tokenPrice],
    };
  });

  return graphData;
};

