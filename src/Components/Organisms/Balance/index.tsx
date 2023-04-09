import React, { useState, useEffect } from "react";
import Typography from "Components/Atom/Typography";
import { Flex } from "Styles/layouts/Flex";
import {
  Wrapper,
  Section,
  TabNavs,
  TabNav,
  TokenDetails,
  TokenDetail,
} from "./style";
import { Input } from "Components/Atom/Inputs";
import Button from "Components/Atom/Button";
import { Dapp, EthIcon } from "Components/Atom/Svgs";
import useSetup from "Store/setup";

// Types
interface Props {}
// Main component
const Balance: React.FC<Props> = () => {
  // States
  const [tab, setTab] = useState<string>("Deposit");
  const [token1Amount, setToken1Amount] = useState<string>("");
  const [token2Amount, setToken2Amount] = useState<string>("");

  // Store
  const { tokens, exchange, transferTokens, loadBalances, provider } =
    useSetup();
  const {
    balances: tokenBalances,
    symbols,
    contracts: tokenContracts,
  } = tokens;
  const { balances: exchangeBalances, transferInProgress } = exchange;
  const { account } = provider;

  // Methods
  const handleChange = (e: any, token: any) => {
    if (token.address === tokenContracts[0].address) {
      setToken1Amount(e.target.value);
    }
    if (token.address === tokenContracts[1].address) {
      setToken2Amount(e.target.value);
    }
  };

  const handleDeposit = async (e: any, token: any) => {
    e.preventDefault();

    if (token.address === tokenContracts[0].address && token1Amount) {
      await transferTokens(token, token1Amount, tab);
      setToken1Amount("");
    }
    if (token.address === tokenContracts[1].address && token2Amount) {
      await transferTokens(token, token2Amount, tab);
      setToken2Amount("");
    }
  };

  // Effects
  useEffect(() => {
    if (account) loadBalances();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transferInProgress, account, tokenContracts[0], tokenContracts[1]]);

  // Data to render
  return (
    <Wrapper>
      {/*  */}
      <Flex gap="" flexRowJcBetweenAiCenter>
        <Typography as="h5" className="heading-3" text="Balance" />
        <TabNavs>
          <TabNav onClick={() => setTab("Deposit")} active={tab === "Deposit"}>
            Deposit
          </TabNav>
          <TabNav
            onClick={() => setTab("Withdraw")}
            active={tab === "Withdraw"}
          >
            Withdraw
          </TabNav>
        </TabNavs>
      </Flex>

      {/* Token 1  */}
      <Section>
        {/*  */}
        <TokenDetails className="mt-20">
          <TokenDetail>
            <Typography as="p" className="paragraph-3" text="Token" />
            <Flex gap=".5rem" className="mt-8" flexRowAiCenter>
              <Dapp />
              <Typography
                as="p"
                className="paragraph-1"
                text={symbols.length ? symbols[0] : ""}
              />
            </Flex>
          </TokenDetail>
          <TokenDetail>
            <Typography as="p" className="paragraph-3" text="Wallet" />
            <Typography
              as="p"
              className="paragraph-1 mt-8"
              text={tokenBalances.length ? tokenBalances[0] : "0.00"}
            />
          </TokenDetail>
          <TokenDetail>
            <Typography as="p" className="paragraph-3" text="Exchange" />
            <Typography
              as="p"
              className="paragraph-1 mt-8"
              text={exchangeBalances.length ? exchangeBalances[0] : "0.00"}
            />
          </TokenDetail>
        </TokenDetails>
        {/*  */}
        <form onSubmit={(e) => handleDeposit(e, tokenContracts[0])}>
          <Input
            placeholder="0.0000"
            label={`${symbols.length ? symbols[0] : ""} Amount`}
            value={token1Amount}
            onChange={(e) => handleChange(e, tokenContracts[0])}
            className="md"
          />
          <Button
            type={"submit"}
            className="btn-bordered btn-full mt-20 btn-md"
          >
            {tab === "Deposit" ? " Deposit  >" : " Withdraw  >"}
          </Button>
        </form>
      </Section>

      {/* Token 2 */}
      <Section>
        <TokenDetails className="mt-20">
          <TokenDetail>
            <Typography as="p" className="paragraph-3" text="Token" />
            <Flex gap=".5rem" className="mt-8" flexRowAiCenter>
              <EthIcon />
              <Typography
                as="p"
                className="paragraph-1"
                text={symbols.length ? symbols[1] : ""}
              />
            </Flex>
          </TokenDetail>
          <TokenDetail>
            <Typography as="p" className="paragraph-3" text="Wallet" />
            <Typography
              as="p"
              className="paragraph-1 mt-8"
              text={tokenBalances.length ? tokenBalances[1] : "0.00"}
            />
          </TokenDetail>
          <TokenDetail>
            <Typography as="p" className="paragraph-3" text="Exchange" />
            <Typography
              as="p"
              className="paragraph-1 mt-8"
              text={exchangeBalances.length ? exchangeBalances[1] : "0.00"}
            />
          </TokenDetail>
        </TokenDetails>
        {/*  */}
        <form onSubmit={(e) => handleDeposit(e, tokenContracts[1])}>
          <Input
            placeholder="0.0000"
            label={`${symbols.length ? symbols[1] : ""} Amount`}
            value={token2Amount}
            onChange={(e) => handleChange(e, tokenContracts[1])}
            className="md"
          />
          <Button
            type={"submit"}
            className="btn-bordered btn-full mt-20 btn-md"
          >
            {tab === "Deposit" ? " Deposit  >" : " Withdraw  >"}
          </Button>
        </form>
      </Section>
    </Wrapper>
  );
};

export default Balance;
