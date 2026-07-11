import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  HStack,
} from "@chakra-ui/react";
import lineImg from "../../../assets/icons/Line.png";
import aboutImg from "../../../assets/images/aboutImg.png";
import { Link as RouterLink } from "react-router-dom";

const About = () => {
  return (
    <Box as="section" id="about-me" mt={20}>
      {/* Header: #about-me + line */}
      <Flex
        justify="space-between"
        align="center"
        mb={10}
        gap={4}
        direction={{ base: "column", md: "row" }}
      >
        <HStack align="center" spacing={3} w="full">
          <Heading
            as="h2"
            fontFamily='"Fira Code", monospace'
            fontSize={{ base: "xl", md: "2xl" }}
            color="white"
          >
            <Box as="span" color="purple.400">
              #
            </Box>
            about-me
          </Heading>
          <Image
            src={lineImg}
            alt=""
            flex="1"
            maxW="100%"
            objectFit="cover"
            display={{ base: "none", md: "block" }}
          />
        </HStack>
      </Flex>

      {/* Content: text left, image right */}
      <Flex
        direction={{ base: "column", lg: "row" }}
        align={{ base: "flex-start", lg: "center" }}
        gap={{ base: 10, lg: 16 }}
      >
        {/* LEFT – text */}
        <Box flex="1" maxW="600px">
          <Text
            mb={4}
            fontFamily='"Fira Code", monospace'
            fontSize="sm"
            color="gray.300"
            lineHeight="1.6"
          >
            Hello, I&apos;m Aman Joshi!
          </Text>

          <Text
            mb={4}
            fontFamily='"Fira Code", monospace'
            fontSize="sm"
            color="gray.300"
            lineHeight="1.6"
          >
            I&apos;m a Frontend Engineer with 4 years of experience building enterprise SaaS applications, workflow automation platforms, and scalable user interfaces using React.js, Next.js, TypeScript, and modern frontend architecture.
          </Text>

          <Text
            mb={4}
            fontFamily='"Fira Code", monospace'
            fontSize="sm"
            color="gray.300"
            lineHeight="1.6"
          >
            Throughout my career, I have contributed to approximately 108 production releases across enterprise products serving 100+ business customers, developing reusable design systems with Atomic Design and Chakra UI.
          </Text>

          <Button
            as={RouterLink}
            to="/about"
            mt={4}
            variant="outline"
            borderColor="purple.400"
            color="white"
            fontFamily='"Fira Code", monospace'
            size="sm"
            borderRadius="0"
            _hover={{ bg: "purple.900" }}
          >
            Read more ⟶
          </Button>
        </Box>

        {/* RIGHT – image */}
        <Box
          flex="1"
          display="flex"
          justifyContent={{ base: "center", lg: "flex-end" }}
        >
          <Image
            src={aboutImg}
            alt="About Aman Joshi"
            maxW={{ base: "260px", md: "320px", lg: "360px" }}
            objectFit="cover"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default About;
