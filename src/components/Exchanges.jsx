import React, { useEffect, useState } from "react";
import axios from "axios";
import ErrorComponent from "./ErrorComponent";
/*NOTE - Axios is a popular JavaScript 
  library used to make HTTP requests (like GET, POST, PUT, DELETE, etc.) 
  from both the browser and Node.js.*/

import { server } from "../index";
import {
  Container,
  HStack,
  VStack,
  Image,
  Heading,
  Text,
} from "@chakra-ui/react";
import Loader from "./Loader";

export default function Exchanges() {
  const [exhanges, setExchanges] = useState([]);
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
  useEffect(() => {
    const fetchExchanges = async () => {
      /*NOTE - async Keyword: You use the async keyword before a function to mark it as asynchronous. 
      This means it can perform tasks that take time, without stopping the rest of the program*/

      try {
        const { data } = await axios.get(`${server}/exchanges`);
        /*NOTE - await Keyword: Inside an async function, you can use the await keyword before a promise. 
      It tells JavaScript to “wait” for the promise to resolve (finish) before moving on to the next line of code.
      
      •	The await keyword is used here to wait for the promise returned by axios.get() to resolve. 
      In this case, axios.get() is an asynchronous function that fetches data from the specified URL (${server}/exchanges).
	  •	The code will pause here until the axios.get() request is completed and the data is returned.
      */

        setExchanges(data);
        setLoading(false); //NOTE - after the data fetched we update the value as a false so that the loding get removed and data will show.
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  }, []);
  if (error)
    /*NOTE - If any kind of error occur while fetching the url then
  the ErrorComponent will show to the user */
    return <ErrorComponent message={"Error while fetching Exchanges"} />;
  return (
    <Container maxW={"container.xl"}>
      {loading ? ( //NOTE - if the loading value is true the loader component will show to the user and if the loading vale is false it will show the data that are fetched.
        <Loader></Loader>
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {/*NOTE - The prop wrap={"wrap"} means that if there are too many children to fit on one line, 
            it will wrap them to the next line, making the layout responsive.*/}

            {exhanges.map((i) => (
              <ExchangeCart
                key={i.id}
                name={i.name}
                img={i.image}
                rank={i.trust_score_rank}
                url={i.url}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
}

const ExchangeCart = ({ name, img, rank, url }) => (
  <a href={url} target={"blank"}>
    <VStack
      w={"52"}
      shadow={"lg"}
      p={"8"}
      borderRadius={"lg"}
      transition={"all 0.5s"}
      m={"4"}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
        /*NOTE - 
          •	"&:hover": This is a CSS pseudo-class that triggers when the user hovers over the element.
	        •	transform: scale(1.1): This makes the element grow by 10% when hovered (scales up by a factor of 1.1).*/
      }}
    >
      {/*NOTE - VStack from Chakra UI is a vertical stack container. It arranges the child elements (image, heading, text) in a column layout.*/}

      <Image
        src={img}
        w={"10"}
        h={"10"}
        objectFit={"contain"}
        alt={"Exchange"}
      />

      <Heading size={"md"} noOfLines={1}>
        {rank}
      </Heading>

      <Text noOfLines={1}>{name}</Text>
    </VStack>
  </a>
);
