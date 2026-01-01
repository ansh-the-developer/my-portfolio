import {
  Box,
  Flex,
  Heading,
  Text,
  HStack,
  Image,
  VStack,
} from "@chakra-ui/react";
import lineImg from "../../../assets/icons/Line.png";
import mailIcon from "../../../assets/icons/social/Email.png";    // adjust to your icons
import discordIcon from "../../../assets/icons/social/Discord.png";

const Contacts = () => {
  return (
    <Box as="section" id="contacts" mt={20} mb={24}>
      {/* Header: #contacts + line */}
      <Flex
        justify="space-between"
        align="center"
        mb={8}
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
            contacts
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

      {/* Content row: text left, card right */}
      <Flex
        direction={{ base: "column", md: "row" }}
        align={{ base: "flex-start", md: "center" }}
        justify="space-between"
        gap={8}
      >
        {/* LEFT text */}
        <Box maxW="480px">
          <Text
            fontFamily='"Fira Code", monospace'
            fontSize="sm"
            color="gray.300"
            mb={2}
          >
            I&apos;m interested in freelance opportunities. However, if you have
            other request or question, don&apos;t hesitate to contact me.
          </Text>
        </Box>

        {/* RIGHT contact card */}
        <Box
          borderWidth="1px"
          borderColor="gray.600"
          bg="gray.900"
          px={6}
          py={4}
          minW={{ base: "260px", md: "280px" }}
        >
          <Text
            fontFamily='"Fira Code", monospace'
            fontSize="sm"
            fontWeight="600"
            color="white"
            mb={4}
          >
            Message me here
          </Text>

          <VStack align="flex-start" spacing={3}>
            <HStack spacing={3}>
              <Image src={discordIcon} alt="Discord" boxSize="18px" />
              <Text
                fontFamily='"Fira Code", monospace'
                fontSize="sm"
                color="gray.300"
              >
                @aman#1234
              </Text>
            </HStack>

            <HStack spacing={3}>
              <Image src={mailIcon} alt="Email" boxSize="18px" />
              <Text
                fontFamily='"Fira Code", monospace'
                fontSize="sm"
                color="gray.300"
              >
                aman@example.com
              </Text>
            </HStack>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Contacts;
