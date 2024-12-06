import {
  Box,
  Container,
  HStack,
  VStack,
  Text,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Progress,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import Loader from "./Loader";
import axios from "axios";
import { useParams } from "react-router-dom";
import { server } from "../index";
import ErrorComponent from "./ErrorComponent";
import { RadioGroup, Radio } from "@chakra-ui/react";
import Chart from "./Chart";

export default function CoinDetails() {
  const parms = useParams();
  const [coin, setCoin] = useState([]);

  /*NOTE - 
  	1.	useState([]):
	•	useState is a React hook that allows you to add state to a functional component.
	•	The [] (empty array) inside useState is the initial value of the state, which means when the component first renders,
   exchanges will be an empty array.
*/

  const [loading, setLoading] = useState(true);
  //NOTE - we using this only to show something to the user while data are being feched by the the API's. Initally we set the value true.
  // eslint-disable-next-line no-unused-vars

  const [error, setError] = useState(false);

  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];
  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h");
        setLoading(true);
        break;
      case "7d":
        setDays("7d");
        setLoading(true);
        break;
      case "14d":
        setDays("14d");
        setLoading(true);
        break;
      case "30d":
        setDays("30d");
        setLoading(true);
        break;
      case "60d":
        setDays("60d");
        setLoading(true);
        break;
      case "200d":
        setDays("200d");
        setLoading(true);
        break;
      case "1y":
        setDays("365d");
        setLoading(true);
        break;
      case "max":
        setDays("max");
        setLoading(true);
        break;

      default:
        setDays("24h");
        setLoading(true);
        break;
    }
  };
  useEffect(() => {
    const fetchCoin = async () => {
      /*NOTE - async Keyword: You use the async keyword before a function to mark it as asynchronous. 
      This means it can perform tasks that take time, without stopping the rest of the program*/

      try {
        const { data } = await axios.get(`${server}/coins/${parms.id}`);

        /*NOTE - await Keyword: Inside an async function, you can use the await keyword before a promise. 
      It tells JavaScript to “wait” for the promise to resolve (finish) before moving on to the next line of code.
      
      •	The await keyword is used here to wait for the promise returned by axios.get() to resolve. 
      In this case, axios.get() is an asynchronous function that fetches data from the specified URL (${server}/exchanges).

	  •	The code will pause here until the axios.get() request is completed and the data is returned.
      */
        const { data: chartData } = await axios.get(
          `${server}/coins/${parms.id}/market_chart?vs_currency=${currency}&days=${days}`
        );

        setCoin(data);
        setChartArray(chartData.prices);
        setLoading(false);
        //NOTE - after the data fetched we update the value as a false so that the loding get removed and data will show.
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchCoin();
  }, [parms.id, currency, days]);

  if (error)
    /*NOTE - If any kind of error occur while fetching the url then
  the ErrorComponent will show to the user */

    return <ErrorComponent message={"Error while fetching Coin"} />;

  const {
    high_24h: highValue,
    low_24h: lowValue,
    max_supply: max_supply_value,
    circulating_supply: Circulating_supply,
    market_cap: marketCap,
    atl: allTimeLow,
    ath: allTimeHigh,
  } = coin.market_data || {};

  return (
    <Container maxWidth={"container.xl"}>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Box width={"full"} borderWidth={1}>
          <Chart arr={chartArray} currency={currencySymbol} days={days} />
        </Box>
      )}
      <HStack p="4" overflowX={"auto"}>
        {btns.map((i) => (
          <Button key={i} onClick={() => switchChartStats(i)}>
            {i}
          </Button>
        ))}
      </HStack>
      <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
        <HStack spacing={"4"}>
          <Radio value={"inr"}>INR</Radio>
          <Radio value={"usd"}>USD</Radio>
          <Radio value={"eur"}>EUR</Radio>
        </HStack>
      </RadioGroup>

      <VStack spacing={"4"} p="16" alignItems={"flex-start"}>
        <Text fontSize={"small"} alignSelf="center" opacity={0.7}>
          {/* Check if market_data and last_updated exist before rendering */}

          {coin.market_data && coin.market_data.last_updated && (
            <Text fontSize={"small"} alignSelf="center" opacity={0.7}>
              Last Updated On{" "}
              {new Date(coin.market_data.last_updated).toLocaleString()}
            </Text>
          )}
        </Text>

        {/* Check if coin.image and coin.image.large exist */}

        {coin.image && coin.image.large ? (
          <Image
            src={coin.image.large}
            w={"16"}
            h={"16"}
            objectFit={"contain"}
          />
        ) : (
          <Text>No Image Available</Text> // Display a fallback message if image is not available
        )}

        {/* Check if market_data and current_price[currency] exist before rendering */}

        {coin.market_data && coin.market_data.current_price !== undefined ? (
          <Stat>
            <StatLabel>{coin.name}</StatLabel>
            <StatNumber>
              {currencySymbol}
              {coin.market_data.current_price[currency]}
            </StatNumber>
            <StatHelpText>
              <StatArrow
                type={
                  coin.market_data.price_change_24h > 0
                    ? "increase"
                    : "decrease"
                }
              />
              {coin.market_data.price_change_24h}%
            </StatHelpText>
          </Stat>
        ) : (
          <Text>Price Data Unavailable</Text> // Fallback if price data is not available
        )}
        <Badge fontSize={"2xl"} bgColor={"blackAlpha.800"} color={"white"}>
          {`#${coin.market_cap_rank}`}
        </Badge>
        {highValue && lowValue ? (
          <CustomBar
            high={`${currencySymbol} ${highValue[currency]}`}
            low={`${currencySymbol} ${lowValue[currency]}`}
          />
        ) : (
          <Text>Price Data unavailable</Text>
        )}
        {max_supply_value && Circulating_supply && marketCap ? (
          <Box w={"full"} p={4}>
            <Item title={"Max Supply"} value={max_supply_value} />
            <Item title={"Circulating Supply"} value={Circulating_supply} />
            <Item
              title={"Market Capital"}
              value={`${currencySymbol}${marketCap[currency]}`}
            />
            <Item
              title={"All Time Low"}
              value={`${currencySymbol}${allTimeLow[currency]}`}
            />
            <Item
              title={"All Time High"}
              value={`${currencySymbol}${allTimeHigh[currency]}`}
            />
          </Box>
        ) : (
          <Text>Supply data Unavailable </Text>
        )}
      </VStack>
    </Container>
  );
}

const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Nenu"} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
);

const CustomBar = ({ high, low }) => (
  <VStack w={"full"}>
    <Progress value={50} colorScheme={"teal"} w={"full"}></Progress>
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme={"red"} />
      <Text fontSize={"sm"}>24H Range</Text>
      <Badge children={high} colorScheme={"green"} />
    </HStack>
  </VStack>
);
