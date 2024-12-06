import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import VaultTrackSrc from "../assets/VaultTrack.jpg";

export default function Home() {
  return (
    <Box bgColor={"blackAlpha.900"} w={"full"} h={"85vh"}>
      <Image
        w={"100%"}
        h={"full"}
        objectFit={"cover"}
        src={VaultTrackSrc}
        //filter={"grayscale(1)"}
      />

      <Text
        fontSize={["1xl", "5xl"]}
        textAlign={"center"}
        fontWeight={"bold"}
        color={"whiteAlpha.700"}
        mt={-20}
      >
        VaultTrack : A Crypto App
      </Text>
    </Box>
  );
}
