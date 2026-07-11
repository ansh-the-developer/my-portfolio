import {
  Box,
  Flex,
  Heading,
  Text,
  HStack,
  Image,
  VStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import lineImg from "../../../assets/icons/Line.png";

const Contacts = () => {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const checkUnlocked = () => {
      setUnlocked(localStorage.getItem("contact_details_unlocked") === "true");
    };
    checkUnlocked();
    window.addEventListener("contact-details-unlocked", checkUnlocked);
    return () => {
      window.removeEventListener("contact-details-unlocked", checkUnlocked);
    };
  }, []);

  const handleOpenGatekeeper = () => {
    window.dispatchEvent(new Event("open-contact-gatekeeper"));
  };

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
            lineHeight="1.6"
          >
            I am open to freelance opportunities, contract roles, and full-stack positions. If you have any inquiries, suggestions, or just want to say hi, feel free to drop a message!
          </Text>
        </Box>

        {/* RIGHT contact card */}
        <Box
          borderWidth="1px"
          borderColor="gray.600"
          bg="gray.900"
          px={6}
          py={4}
          minW={{ base: "260px", md: "300px" }}
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
              <Box color="purple.400">
                <FaEnvelope size="16px" />
              </Box>
              {unlocked ? (
                <Text
                  fontFamily='"Fira Code", monospace'
                  fontSize="sm"
                  color="gray.300"
                  userSelect="all"
                >
                  amanjoshi16011997@gmail.com
                </Text>
              ) : (
                <Text
                  fontFamily='"Fira Code", monospace'
                  fontSize="sm"
                  color="purple.300"
                  cursor="pointer"
                  textDecoration="underline"
                  _hover={{ color: "purple.200" }}
                  onClick={handleOpenGatekeeper}
                >
                  [Click to view email]
                </Text>
              )}
            </HStack>

            <HStack spacing={3}>
              <Box color="purple.400">
                <FaWhatsapp size="16px" />
              </Box>
              {unlocked ? (
                <Text
                  fontFamily='"Fira Code", monospace'
                  fontSize="sm"
                  color="gray.300"
                  userSelect="all"
                >
                  +91 8449503656
                </Text>
              ) : (
                <Text
                  fontFamily='"Fira Code", monospace'
                  fontSize="sm"
                  color="purple.300"
                  cursor="pointer"
                  textDecoration="underline"
                  _hover={{ color: "purple.200" }}
                  onClick={handleOpenGatekeeper}
                >
                  [Click to view WhatsApp]
                </Text>
              )}
            </HStack>

            <HStack spacing={3}>
              <Box color="purple.400">
                <FaMapMarkerAlt size="16px" />
              </Box>
              <Text
                fontFamily='"Fira Code", monospace'
                fontSize="sm"
                color="gray.300"
              >
                India
              </Text>
            </HStack>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Contacts;
