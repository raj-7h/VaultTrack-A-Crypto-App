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
        fontSize={"6xl"}
        textAlign={"center"}
        fontWeight={"bold"}
        color={"whiteAlpha.700"}
        position={"absolute"}
        top={"75%"} // Position text vertically centered
        left={"50%"} // Center horizontally
        transform={"translate(-50%, -50%)"} // Adjust for perfect centering
        zIndex={1}
      >
        VaultTrack : A Crypto App
      </Text>
    </Box>
  );
}
