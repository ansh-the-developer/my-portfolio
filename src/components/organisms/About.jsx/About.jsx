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
          >
            Hello, I&apos;m Aman!
          </Text>

          <Text
            mb={4}
            fontFamily='"Fira Code", monospace'
            fontSize="sm"
            color="gray.300"
          >
            I&apos;m a self-taught full-stack web developer based in Haryana,
            India. I build responsive web applications and clean UIs, focusing
            on modern HRMS and enterprise systems.
          </Text>

          <Text
            mb={4}
            fontFamily='"Fira Code", monospace'
            fontSize="sm"
            color="gray.300"
          >
            Transforming ideas into usable interfaces has been my passion for
            years. I enjoy designing component-driven React apps, integrating
            scalable backends, and continuously learning new tools and
            frameworks.
          </Text>

          <Button
            mt={4}
            variant="outline"
            borderColor="purple.400"
            color="white"
            fontFamily='"Fira Code", monospace'
            size="sm"
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
            alt="About Aman"
            maxW={{ base: "260px", md: "320px", lg: "360px" }}
            objectFit="cover"
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default About;
