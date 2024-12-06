import { Avatar, Box, Link, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import founderSrc from "../assets/founder.png";

const Footer = () => {
  return (
    <Box
      bgColor={"blackAlpha.900"}
      color={"whiteAlpha.700"}
      minH={"48"}
      px={"16"}
      py={["16", "8"]}
    >
      <Stack direction={["column", "row"]} h={"full"} alignItems={"center"}>
        <VStack w={"full"} alignItems={["center", "flex-start"]}>
          <Text fontWeight={"bold"}>About Us</Text>
          <Text
            fontSize={"sm"}
            letterSpacing={"widest"}
            textAlign={["center", "left"]}
          >
            Track your crypto, secure your future. VaultTrack, where every coin
            counts!
          </Text>
        </VStack>
        <VStack>
          <Avatar boxSize={"28"} mt={["4", "0"]} src={founderSrc} />
          <Text textAlign={"center"}>
            Our Founder <br />{" "}
            <Link
              href="https://www.linkedin.com/in/raj-jha7h/"
              color={"blue.500"}
            >
              Raj Jha
            </Link>
          </Text>
          {/* <p textAlign="center ">Raj Jha </p> */}
        </VStack>
      </Stack>
    </Box>
  );
};

export default Footer;
