import { Box, HStack, Text, Button, Flex, IconButton, VStack } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaRobot, FaVolumeUp, FaVolumeMute, FaMinus, FaPowerOff } from "react-icons/fa";

// Contextual introductions mapping per client pathname route
const pathGuides = {
  "/": "Welcome! I'm your AI guide. This portfolio showcases my latest projects, technical expertise, and the solutions I've built for clients. Feel free to explore.",
  "/projects": "Here you'll find enterprise applications, SaaS platforms, and client websites. Each project highlights different technical challenges and solutions.",
  "/about": "Learn more about my background, experience, and the technologies I specialize in.",
  "/contact": "If you'd like to collaborate or discuss a project, simply fill out the contact form and I'll make sure your enquiry reaches me.",
  "/login": "Secure administrator parameters. Input dashboard keys to establish authenticated session controls.",
  "/admin": "Moderation board loaded. View client leads logs, remove entries, and inspect statistics databases."
};

const AiAssistantGreeting = () => {
  const location = useLocation();
  
  // Persistent controls
  const [isDisabled, setIsDisabled] = useState(() => {
    return localStorage.getItem("ai_guide_disabled") === "true";
  });
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem("ai_guide_muted") === "true";
  });
  const [isMinimized, setIsMinimized] = useState(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const savedMinimized = localStorage.getItem("ai_guide_minimized");
    if (savedMinimized !== null) return savedMinimized === "true";
    return isMobile; // Start minimized on mobile by default on first load
  });

  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const currentPath = location.pathname;
  const targetGuideText = pathGuides[currentPath] || "Explore the parameters of my portfolio workspace.";

  const speechUtteranceRef = useRef(null);
  const typeIntervalRef = useRef(null);
  const autoPlayTimeoutRef = useRef(null);

  // Wakes up guide when the welcome overlay is skipped/completed
  useEffect(() => {
    const handleStartExperience = () => {
      const hasSeenOverlay = sessionStorage.getItem("welcome_overlay_shown") === "true";
      if (hasSeenOverlay && !isDisabled) {
        setIsVisible(true);
        triggerNarrator();
      }
    };

    window.addEventListener("start-portfolio-experience", handleStartExperience);

    // Auto-mount if overlay has already been passed in this tab session
    const hasSeenOverlay = sessionStorage.getItem("welcome_overlay_shown") === "true";
    if (hasSeenOverlay && !isDisabled) {
      setIsVisible(true);
      // Wait a brief delay for route/dom rendering to settle before auto-speaking
      autoPlayTimeoutRef.current = setTimeout(triggerNarrator, 1000);
    }

    return () => {
      window.removeEventListener("start-portfolio-experience", handleStartExperience);
      if (autoPlayTimeoutRef.current) clearTimeout(autoPlayTimeoutRef.current);
      stopSpeech();
    };
  }, [currentPath, isDisabled]); // Re-trigger narrator when pathname route changes

  // Typewriter effect handler
  useEffect(() => {
    if (!isVisible || isMinimized || isDisabled) return;

    if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);

    let index = 0;
    setTypedText("");

    typeIntervalRef.current = setInterval(() => {
      setTypedText(targetGuideText.slice(0, index + 1));
      index++;
      if (index >= targetGuideText.length) {
        clearInterval(typeIntervalRef.current);
      }
    }, 25);

    return () => {
      if (typeIntervalRef.current) clearInterval(typeIntervalRef.current);
    };
  }, [isVisible, isMinimized, isDisabled, targetGuideText]);

  const triggerNarrator = () => {
    if (isDisabled) return;
    
    // Type out path greeting
    setTypedText("");
    
    // Trigger vocal narrative if not muted
    if (!isMuted) {
      speakText(targetGuideText);
    } else {
      stopSpeech();
    }
  };

  const speakText = (text) => {
    if (!("speechSynthesis" in window)) return;
    stopSpeech();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.08;

    // Filter to select standard female/neutral English voices
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(
      (v) =>
        v.lang.startsWith("en") &&
        (v.name.includes("Zira") ||
          v.name.includes("Samantha") ||
          v.name.includes("Google US English") ||
          v.name.includes("Microsoft"))
    ) || voices.find(v => v.lang.startsWith("en")) || voices[0];

    if (femaleVoice) utterance.voice = femaleVoice;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechUtteranceRef.current = utterance;
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    localStorage.setItem("ai_guide_muted", nextMute.toString());
    if (nextMute) {
      stopSpeech();
    } else {
      speakText(targetGuideText);
    }
  };

  const handleToggleDisable = () => {
    const nextDisable = !isDisabled;
    setIsDisabled(nextDisable);
    localStorage.setItem("ai_guide_disabled", nextDisable.toString());
    if (nextDisable) {
      stopSpeech();
      setIsVisible(false);
    } else {
      setIsVisible(true);
      setIsMinimized(false);
      localStorage.setItem("ai_guide_minimized", "false");
      // Schedule speech trigger after panel expands
      setTimeout(() => speakText(targetGuideText), 600);
    }
  };

  const handleToggleMinimize = () => {
    const nextMinimize = !isMinimized;
    setIsMinimized(nextMinimize);
    localStorage.setItem("ai_guide_minimized", nextMinimize.toString());
    if (nextMinimize) {
      stopSpeech();
    } else {
      // Speak when restoring panel
      setTimeout(() => speakText(targetGuideText), 600);
    }
  };

  // If guide is fully disabled, render a tiny toggle trigger badge to re-activate it
  if (isDisabled) {
    return (
      <IconButton
        as={motion.button}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        position="fixed"
        bottom="80px"
        right="20px"
        zIndex="15000"
        bg="gray.900"
        border="1px solid"
        borderColor="gray.600"
        color="gray.400"
        _hover={{ color: "purple.400", borderColor: "purple.400", bg: "gray.850" }}
        onClick={handleToggleDisable}
        borderRadius="full"
        boxShadow="0 4px 12px rgba(0,0,0,0.5)"
        aria-label="Re-enable AI Assistant guide"
        title="Enable AI Guide"
      >
        <FaRobot size={16} />
      </IconButton>
    );
  }

  // If minimized, display a pulsing robot avatar badge
  if (isMinimized && isVisible) {
    return (
      <Box
        as={motion.div}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        position="fixed"
        bottom="80px"
        right="20px"
        zIndex="15000"
      >
        {/* Pulsing neon outline effect */}
        <Box
          position="absolute"
          top="0"
          left="0"
          w="full"
          h="full"
          borderRadius="full"
          border="1px solid"
          borderColor="purple.500"
          as={motion.div}
          animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          pointerEvents="none"
        />
        <IconButton
          bg="gray.900"
          border="1px solid"
          borderColor="purple.500"
          color="purple.400"
          _hover={{ color: "white", bg: "purple.600" }}
          onClick={handleToggleMinimize}
          borderRadius="full"
          boxShadow="0 4px 15px rgba(199, 120, 221, 0.3)"
          aria-label="Expand AI guide narrator panel"
          title="Expand AI Guide"
        >
          <FaRobot size={18} />
        </IconButton>
      </Box>
    );
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <Box
          as={motion.div}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 120, damping: 15 }}
          position="fixed"
          bottom="80px"
          right="20px"
          zIndex="15000"
          maxW="320px"
          w="full"
          bg="gray.900"
          border="1px solid"
          borderColor="purple.500"
          boxShadow="0 4px 20px rgba(199, 120, 221, 0.2)"
          p={4}
        >
          <VStack align="stretch" spacing={3}>
            {/* Header control line */}
            <Flex align="center" justify="space-between" borderBottom="1px solid" borderColor="gray.800" pb={2}>
              <HStack spacing={2}>
                <Box color="purple.400">
                  <FaRobot size={16} />
                </Box>
                <Text fontSize="xs" color="white" fontFamily='"Fira Code", monospace' fontWeight="600">
                  AI_NARRATOR
                </Text>
              </HStack>

              <HStack spacing={1}>
                {/* Voice amplitude waves */}
                {isSpeaking && (
                  <HStack spacing="2px" h="10px" align="flex-end" px={1}>
                    {[1, 2, 3, 4].map((bar) => (
                      <Box
                        key={bar}
                        as={motion.div}
                        animate={{ height: ["2px", "10px", "2px"] }}
                        transition={{ repeat: Infinity, duration: 0.4 + bar * 0.1, ease: "easeInOut" }}
                        w="2px"
                        bg="purple.400"
                      />
                    ))}
                  </HStack>
                )}

                <IconButton
                  size="xs"
                  variant="ghost"
                  color="purple.400"
                  _hover={{ color: "white", bg: "purple.800" }}
                  onClick={handleToggleMinimize}
                  aria-label="Minimize AI guide"
                  title="Minimize"
                >
                  <FaMinus />
                </IconButton>
                <IconButton
                  size="xs"
                  variant="ghost"
                  color="purple.400"
                  _hover={{ color: "red.400", bg: "gray.800" }}
                  onClick={handleToggleDisable}
                  aria-label="Disable AI guide"
                  title="Disable Assistant"
                >
                  <FaPowerOff />
                </IconButton>
              </HStack>
            </Flex>

            {/* Captions display */}
            <Box minH="60px">
              <Text
                fontFamily='"Fira Code", monospace'
                fontSize="11px"
                color="gray.300"
                lineHeight="1.5"
                textAlign="left"
              >
                {typedText}
              </Text>
            </Box>

            {/* Voice controls */}
            <Flex gap={2}>
              <Button
                size="xs"
                variant="outline"
                borderColor="purple.500"
                color="purple.300"
                _hover={{ bg: "rgba(199, 120, 221, 0.1)", color: "white" }}
                borderRadius="0"
                fontFamily='"Fira Code", monospace'
                leftIcon={isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                onClick={handleToggleMute}
              >
                {isMuted ? "Unmute guide" : "Mute guide"}
              </Button>
              {!isMuted && (
                <Button
                  size="xs"
                  variant="ghost"
                  color="gray.400"
                  _hover={{ color: "white", bg: "gray.850" }}
                  borderRadius="0"
                  fontFamily='"Fira Code", monospace'
                  onClick={() => speakText(targetGuideText)}
                >
                  Repeat
                </Button>
              )}
            </Flex>
          </VStack>
        </Box>
      )}
    </AnimatePresence>
  );
};

export default AiAssistantGreeting;
