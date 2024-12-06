import React from "react";
import { VStack, Image, Heading, Text } from "@chakra-ui/react";

const CoinCard = ({ id, name, img, symbol, price, currencySymbol = "₹" }) => (
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  <a href={`/coin/${id}`}>
    {/*NOTE - Here we use link insed of anchor tag because we want the react page only we don't have
    to send this to any external website*/}
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

      <Image src={img} w={"10"} h={"10"} objectFit={"contain"} alt={"Coin"} />

      <Heading size={"md"} noOfLines={1}>
        {symbol}
      </Heading>

      <Text noOfLines={1}>{name}</Text>
      <Text noOfLines={1}>{price ? `${currencySymbol}${price}` : "NA"}</Text>
    </VStack>
  </a>
);

export default CoinCard;
