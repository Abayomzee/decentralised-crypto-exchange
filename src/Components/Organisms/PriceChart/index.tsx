import React, { useEffect } from "react";
import Typography from "Components/Atom/Typography";
import { Wrapper } from "./style";
import Chart from "react-apexcharts";
import useSetup from "Store/setup";
import { options } from "./config";
import { Flex } from "Styles/layouts/Flex";
import { DownArrow, UpArrow } from "Components/Atom/Svgs";
import EmptyState from "Components/Atom/EmptyState";

// Types
interface Props {}
// Main component
const PriceChart: React.FC<Props> = () => {
  // Store
  const { symbols } = useSetup().tokens;
  const { account } = useSetup().provider;
  const { series, lastPrice, lastPriceChangeStatus } =
    useSetup().exchange.chartdata;

  const { transferInProgress } = useSetup().exchange;
  const orderBookSelector = useSetup().orderBookSelector;
  const priceChartSelector = useSetup().priceChartSelector;

  // Effects
  useEffect(() => {
    orderBookSelector();
    priceChartSelector();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transferInProgress]);

  // Data to render
  return (
    <Wrapper className="mb-30">
      <Flex className="mb-30" gap="1.5rem" flexRowAiCenter>
        <Typography
          as="h6"
          className="heading-5"
          text={`${symbols[0]}/${symbols[1]}`}
        />
        {lastPriceChangeStatus === "+" ? <UpArrow /> : <DownArrow />}
        <Typography as="span" className="paragraph-1" text={lastPrice} />
      </Flex>
      {account ? (
        <>
          <Chart
            type="candlestick"
            width="100%"
            height="400px"
            series={series}
            options={options}
          />
        </>
      ) : (
        <EmptyState space="13rem" text="Please connect to metamask" />
      )}
    </Wrapper>
  );
};

export default PriceChart;
