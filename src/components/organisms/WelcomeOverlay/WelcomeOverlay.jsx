import { Box, Heading, Text, VStack, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WelcomeOverlay = ({ onStart }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "INITIALIZING PORTFOLIO PROTOCOL...\nSYS.LOC: DELHI_NCR / INDIA\nSERVICE: SAAS / ITSM / ERP / ECOM\nSTATUS: ONLINE & SECURE.";

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("welcome_overlay_shown") === "true";
    if (!hasSeen) {
      setIsVisible(true);
    } else {
      // If already seen, trigger onStart immediately to allow background playback if preferred
      if (onStart) onStart(true);
    }
  }, [onStart]);

  useEffect(() => {
    if (!isVisible) return;

    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isVisible]);

  const handleStart = () => {
    setIsVisible(false);
    sessionStorage.setItem("welcome_overlay_shown", "true");
    if (onStart) {
      onStart(false); // Enable synth audio
    }
    // Broadcast experience start event
    setTimeout(() => {
      window.dispatchEvent(new Event("start-portfolio-experience"));
    }, 500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <Box
          as={motion.div}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.6, ease: "easeInOut" } }}
          position="fixed"
          top="0"
          left="0"
          w="100vw"
          h="100vh"
          bg="#0b0f19"
          zIndex="20000"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={4}
          overflow="hidden"
        >
          {/* Futuristic scanlines effect */}
          <Box
            position="absolute"
            top="0"
            left="0"
            w="full"
            h="full"
            pointerEvents="none"
            bg="linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%)"
            bgSize="100% 4px"
            opacity="0.3"
          />

          <VStack
            spacing={6}
            maxW="500px"
            w="full"
            p={8}
            border="1px solid"
            borderColor="purple.500"
            bg="rgba(11, 15, 25, 0.9)"
            boxShadow="0 0 30px rgba(199, 120, 221, 0.15)"
            align="stretch"
          >
            <Heading
              as="h2"
              fontSize="sm"
              color="purple.400"
              fontFamily='"Fira Code", monospace'
              letterSpacing="2px"
              borderBottom="1px solid"
              borderColor="gray.700"
              pb={3}
              textAlign="left"
            >
              &gt;_ ANOMALY_TERMINAL_v1.0.4
            </Heading>

            <Box minH="90px">
              <Text
                fontFamily='"Fira Code", monospace'
                fontSize="xs"
                color="gray.350"
                lineHeight="1.8"
                whiteSpace="pre-wrap"
                textAlign="left"
              >
                {typedText}
                <Box
                  as={motion.span}
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  display="inline-block"
                  w="8px"
                  h="14px"
                  bg="purple.400"
                  ml={1}
                />
              </Text>
            </Box>

            <Button
              as={motion.button}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              bg="purple.500"
              color="white"
              h="42px"
              borderRadius="0"
              fontFamily='"Fira Code", monospace'
              fontSize="xs"
              letterSpacing="1px"
              onClick={handleStart}
              _hover={{ bg: "purple.600" }}
            >
              [ START EXPERIENCE ]
            </Button>
          </VStack>
        </Box>
      )}
    </AnimatePresence>
  );
};

export default WelcomeOverlay;
