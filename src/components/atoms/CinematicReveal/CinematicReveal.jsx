import { Box } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";

const CinematicReveal = ({ children, delay = 0.1 }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <Box
        as={motion.div}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, delay }}
      >
        {children}
      </Box>
    );
  }

  // Cinematic parameters: wireframe borders drawing, scanline flash, blurred transition to solid.
  return (
    <Box position="relative" overflow="hidden" w="full" py={2}>
      {/* 1. Wireframe Border Draw Animation */}
      <Box
        as={motion.div}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
        position="absolute"
        top="0"
        left="0"
        w="full"
        h="1px"
        bg="rgba(199, 120, 221, 0.3)"
        transformOrigin="left"
      />
      <Box
        as={motion.div}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, delay: delay + 0.2, ease: "easeOut" }}
        position="absolute"
        top="0"
        right="0"
        w="1px"
        h="full"
        bg="rgba(199, 120, 221, 0.15)"
        transformOrigin="top"
      />

      {/* 2. Neon Scanline sweep */}
      <Box
        as={motion.div}
        initial={{ y: "-100%" }}
        whileInView={{ y: "200%" }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.1, delay: delay + 0.1, ease: "easeInOut" }}
        position="absolute"
        top="0"
        left="0"
        w="full"
        h="4px"
        bg="linear-gradient(90deg, transparent, rgba(199, 120, 221, 0.6), transparent)"
        boxShadow="0 0 12px rgba(199, 120, 221, 0.8)"
        zIndex="10"
        pointerEvents="none"
      />

      {/* 3. Subtle Holographic Scan Grid overlay */}
      <Box
        as={motion.div}
        initial={{ opacity: 0.15 }}
        whileInView={{ opacity: [0.15, 0.05, 0] }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, delay: delay + 0.3 }}
        position="absolute"
        top="0"
        left="0"
        w="full"
        h="full"
        bg="linear-gradient(rgba(199, 120, 221, 0.04) 50%, transparent 50%)"
        bgSize="100% 6px"
        zIndex="5"
        pointerEvents="none"
      />

      {/* 4. Core Content fading, resolving from blur, and sliding up slightly */}
      <Box
        as={motion.div}
        initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, delay: delay + 0.2, ease: "easeOut" }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default CinematicReveal;
