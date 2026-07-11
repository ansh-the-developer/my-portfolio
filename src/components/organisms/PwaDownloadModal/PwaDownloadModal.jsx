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
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
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
  };

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`Install choice: ${outcome}`);
      setDeferredPrompt(null);
      setIsOpen(false);
    } else {
      alert(
        "For manual installation:\n- Desktop Chrome/Edge: Click the install icon in the URL search bar.\n- Safari iOS: Tap Share -> 'Add to Home Screen'.\n- Mobile Chrome: Tap menu (3 dots) -> 'Install App'."
      );
      setIsOpen(false);
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
        </VStack>
      </Box>
    </Box>
  );
};

export default PwaDownloadModal;
