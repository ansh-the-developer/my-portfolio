import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Flex,
  Image,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import ajLogo from "../../../../public/favicon.png";

const PwaDownloadModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    const hasSeen = sessionStorage.getItem("pwa_modal_shown") === "true";
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("pwa_modal_shown", "true");
      }, 1500);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      };
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setShowInstructions(false);
  };

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`Install choice: ${outcome}`);
      setDeferredPrompt(null);
      setIsOpen(false);
    } else {
      setShowInstructions(true);
    }
  };

  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      w="100vw"
      h="100vh"
      bg="rgba(0, 0, 0, 0.85)"
      zIndex="10000"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
      onClick={handleClose}
    >
      <Box
        bg="gray.900"
        border="1px solid"
        borderColor="gray.600"
        w="full"
        maxW="400px"
        p={6}
        onClick={(e) => e.stopPropagation()}
        textAlign="center"
      >
        <Flex justify="flex-end" mb={2}>
          <Button
            size="xs"
            variant="ghost"
            color="white"
            onClick={handleClose}
            _hover={{ bg: "gray.850" }}
          >
            ✕
          </Button>
        </Flex>

        <VStack spacing={4} align="stretch" pb={2}>
          <Flex justify="center" mb={2}>
            <Image
              src={ajLogo}
              alt="AJ Logo"
              boxSize="70px"
              borderRadius="full"
              border="2px solid"
              borderColor="purple.400"
              p={1}
            />
          </Flex>

          {showInstructions ? (
            <>
              <Heading
                as="h3"
                fontSize="md"
                color="white"
                fontFamily='"Fira Code", monospace'
                textAlign="left"
                mb={2}
              >
                Installation Steps:
              </Heading>
              <VStack align="stretch" spacing={3} textAlign="left" py={2}>
                {isIOS ? (
                  <>
                    <Text fontFamily='"Fira Code", monospace' fontSize="xs" color="gray.300">
                      1. Tap the <Box as="span" color="purple.400" fontWeight="bold">Share</Box> button in Safari.
                    </Text>
                    <Text fontFamily='"Fira Code", monospace' fontSize="xs" color="gray.300">
                      2. Scroll down and select <Box as="span" color="purple.400" fontWeight="bold">"Add to Home Screen"</Box>.
                    </Text>
                    <Text fontFamily='"Fira Code", monospace' fontSize="xs" color="gray.300">
                      3. Tap <Box as="span" color="purple.400" fontWeight="bold">Add</Box> in the top right to complete installation.
                    </Text>
                  </>
                ) : (
                  <>
                    <Text fontFamily='"Fira Code", monospace' fontSize="xs" color="gray.300">
                      1. Tap your browser's menu button (<Box as="span" color="purple.400" fontWeight="bold">3 dots</Box>).
                    </Text>
                    <Text fontFamily='"Fira Code", monospace' fontSize="xs" color="gray.300">
                      2. Select <Box as="span" color="purple.400" fontWeight="bold">"Install App"</Box> or <Box as="span" color="purple.400" fontWeight="bold">"Add to Home Screen"</Box>.
                    </Text>
                    <Text fontFamily='"Fira Code", monospace' fontSize="xs" color="gray.300">
                      3. Confirm the prompt to install the app on your device.
                    </Text>
                  </>
                )}
              </VStack>
              <Button
                h="36px"
                bg="purple.500"
                color="white"
                fontFamily='"Fira Code", monospace'
                fontSize="xs"
                borderRadius="0"
                onClick={handleClose}
                _hover={{ bg: "purple.600" }}
                mt={4}
              >
                Got It
              </Button>
            </>
          ) : (
            <>
              <Heading
                as="h3"
                fontSize="lg"
                color="white"
                fontFamily='"Fira Code", monospace'
              >
                Get the App
              </Heading>

              <Text
                fontFamily='"Fira Code", monospace'
                fontSize="xs"
                color="gray.400"
                lineHeight="1.6"
              >
                Add this portfolio to your home screen for quick offline access, full-screen view, and app-like performance!
              </Text>

              <Flex gap={3} mt={4}>
                <Button
                  flex="1"
                  h="36px"
                  bg="purple.500"
                  color="white"
                  fontFamily='"Fira Code", monospace'
                  fontSize="xs"
                  borderRadius="0"
                  onClick={handleInstall}
                  _hover={{ bg: "purple.600" }}
                >
                  Download App
                </Button>
                <Button
                  flex="1"
                  h="36px"
                  bg="transparent"
                  border="1px solid"
                  borderColor="gray.600"
                  color="white"
                  fontFamily='"Fira Code", monospace'
                  fontSize="xs"
                  borderRadius="0"
                  onClick={handleClose}
                  _hover={{ bg: "gray.800" }}
                >
                  Not Now
                </Button>
              </Flex>
            </>
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export default PwaDownloadModal;
