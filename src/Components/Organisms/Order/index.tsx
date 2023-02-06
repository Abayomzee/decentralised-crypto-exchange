import React, { useState } from "react";
import Typography from "Components/Atom/Typography";
import { Flex } from "Styles/layouts/Flex";
import {
  Wrapper,
  TabNavs,
  TabNav,
} from "./style";
import { Input } from "Components/Atom/Inputs";
import Button from "Components/Atom/Button";
import useSetup from "Store/setup";

// Types
interface Props {}
// Main component
const Order: React.FC<Props> = () => {
  // States
  const [tab, setTab] = useState<string>("Buy");
  const [amount, setAmount] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  // Store
  const {
    makeBuyOrder,
    makeSellOrder,
  } = useSetup();
 

  // Methods
  const handleChange = (e: any, type: any) => {
    if (type === "amount") {
      setAmount(e.target.value);
    }
    if (type === "price") {
      setPrice(e.target.value);
    }
  };

  const handleOrder = async (e: any) => {
    e.preventDefault();

    if (tab === "Buy" && amount && price) {
      await makeBuyOrder(amount, price);
      setAmount("");
      setPrice("");
    }
    if (tab === "Sell" && amount && price) {
      await makeSellOrder(amount, price);
      setAmount("");
      setPrice("");
    }
  };

  // Data to render
  return (
    <Wrapper>
      {/*  */}
      <Flex gap="" flexRowJcBetweenAiCenter>
        <Typography as="h5" className="heading-3" text="New Order" />
        <TabNavs>
          <TabNav onClick={() => setTab("Buy")} active={tab === "Buy"}>
            Buy
          </TabNav>
          <TabNav onClick={() => setTab("Sell")} active={tab === "Sell"}>
            Sell
          </TabNav>
        </TabNavs>
      </Flex>

      {/*  */}
      <form onSubmit={handleOrder}>
        <Input
          placeholder="0.0000"
          label={tab === "Buy" ? " Buy Amount" : " Sell Amount"}
          value={amount}
          onChange={(e) => handleChange(e, "amount")}
          className="md"
        />
        <Input
          placeholder="0.0000"
          label={tab === "Buy" ? " Buy Price" : " Sell Price"}
          value={price}
          onChange={(e) => handleChange(e, "price")}
          className="md"
          wrapperclassName="mt-5"
        />
        <Button type={"submit"} className="btn-bordered btn-full mt-20 btn-md">
          {tab === "Buy" ? " Buy Order >" : " Sell Order  >"}
        </Button>
      </form>
    </Wrapper>
  );
};

export default Order;
 