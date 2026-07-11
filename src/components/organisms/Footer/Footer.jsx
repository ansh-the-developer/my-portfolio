import {
  Box,
  Flex,
  Text,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa"; // or any icons you prefer

const Footer = () => {
  return (
    <Box as="footer" mt={16} borderTop="1px solid" borderColor="gray.700" py={6}>
      <Flex
        className="content-rail"
        justify="space-between"
        align={{ base: "flex-start", md: "center" }}
        direction={{ base: "column", md: "row" }}
        gap={{ base: 6, md: 0 }}
      >
        {/* LEFT: name, email, role */}
        <Box>
          <HStack spacing={2} mb={1}>
            <Text
              fontFamily='"Fira Code", monospace'
              fontWeight="600"
              color="white"
            >
              Aman
            </Text>
            <Text
              fontFamily='"Fira Code", monospace'
              fontSize="sm"
              color="gray.400"
            >
              aman@example.com
            </Text>
          </HStack>

          <Text
            fontFamily='"Fira Code", monospace'
            fontSize="sm"
            color="gray.300"
          >
            Web designer and full-stack developer
          </Text>
        </Box>

        {/* RIGHT: Media + icons */}
        <Box textAlign={{ base: "left", md: "right" }}>
          <Text
            fontFamily='"Fira Code", monospace'
            fontSize="sm"
            color="white"
            mb={2}
          >
            Media
          </Text>
          <HStack spacing={4} justify={{ base: "flex-start", md: "flex-end" }}>
            <IconButton
              as="a"
              href="https://github.com/ansh-the-developer"
              target="_blank"
              aria-label="GitHub"
              icon={<FaGithub />}
              variant="ghost"
              size="sm"
              color="gray.300"
            />
            <IconButton
              as="a"
              href="https://www.linkedin.com/in/aman-joshi-engineer"
              target="_blank"
              aria-label="LinkedIn"
              icon={<FaLinkedin />}
              variant="ghost"
              size="sm"
              color="gray.300"
            />
            <IconButton
              as="a"
              href="https://discord.com"
              target="_blank"
              aria-label="Discord"
              icon={<FaDiscord />}
              variant="ghost"
              size="sm"
              color="gray.300"
            />
          </HStack>
        </Box>
      </Flex>

      {/* COPYRIGHT – centered below */}
      <Box mt={6} textAlign="center">
        <Text
          fontFamily='"Fira Code", monospace'
          fontSize="xs"
          color="gray.500"
        >
          © {new Date().getFullYear()} Made by Aman. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
