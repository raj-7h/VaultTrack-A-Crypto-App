import React, { useEffect, useState } from "react";
import axios from "axios";
import ErrorComponent from "./ErrorComponent";
import CoinCard from "./CoinCard";
import { Button } from "@chakra-ui/react";
import { RadioGroup } from "@chakra-ui/react";
import { Radio } from "@chakra-ui/react";

/*NOTE - Axios is a popular JavaScript 
  library used to make HTTP requests (like GET, POST, PUT, DELETE, etc.) 
  from both the browser and Node.js.*/

import { server } from "../index";
import { Container, HStack } from "@chakra-ui/react";
import Loader from "./Loader";

export default function Coins() {
  const [coins, setCoins] = useState([]);
  /*NOTE - 
  	1.	useState([]):
	•	useState is a React hook that allows you to add state to a functional component.
	•	The [] (empty array) inside useState is the initial value of the state, which means when the component first renders,
   exchanges will be an empty array.

	2.	const [exchanges, setExchanges]:
	•	This is array destructuring. useState returns two values:
	•	exchanges: This is the current state (in this case, an empty array initially).
	•	setExchanges: This is the function used to update the exchanges state.*/

  const [loading, setLoading] = useState(true); //NOTE - we using this only to show something to the user while data are being feched by the the API's. Initally we set the value true.
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");
  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };
  const btns = new Array(132).fill(1);

  useEffect(() => {
    const fetchCoins = async () => {
      /*NOTE - async Keyword: You use the async keyword before a function to mark it as asynchronous. 
      This means it can perform tasks that take time, without stopping the rest of the program*/

      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        /*NOTE - await Keyword: Inside an async function, you can use the await keyword before a promise. 
      It tells JavaScript to “wait” for the promise to resolve (finish) before moving on to the next line of code.
      
      •	The await keyword is used here to wait for the promise returned by axios.get() to resolve. 
      In this case, axios.get() is an asynchronous function that fetches data from the specified URL (${server}/exchanges).
	  •	The code will pause here until the axios.get() request is completed and the data is returned.
      */

        setCoins(data);
        setLoading(false); //NOTE - after the data fetched we update the value as a false so that the loding get removed and data will show.
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency, page]);
  if (error)
    /*NOTE - If any kind of error occur while fetching the url then
  the ErrorComponent will show to the user */
    return <ErrorComponent message={"Error while fetching Coins"} />;
  return (
    <Container maxW={"container.xl"}>
      {loading ? ( //NOTE - if the loading value is true the loader component will show to the user and if the loading vale is false it will show the data that are fetched.
        <Loader></Loader>
      ) : (
        <>
          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"usd"}>USD</Radio>
              <Radio value={"eur"}>EUR</Radio>
            </HStack>
          </RadioGroup>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {/*NOTE - The prop wrap={"wrap"} means that if there are too many children to fit on one line, 
            it will wrap them to the next line, making the layout responsive.*/}

            {coins.map((i) => (
              <CoinCard
                id={i.id}
                key={i.id}
                name={i.name}
                price={i.current_price}
                img={i.image}
                symbol={i.symbol}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>
          <HStack w={"full"} overflowX={"auto"} p={"8"}>
            {btns.map((items, index) => (
              <Button
                key={index}
                bgColor={"blackAlpha.900"}
                color={"white"}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
}
