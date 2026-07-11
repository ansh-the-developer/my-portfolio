// src/components/organisms/Projects/Projects.jsx
import {
  Box,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Button,
  HStack,
  Image,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import lineImg from "../../../assets/icons/Line.png";
import { clientProjects, majorProjects } from "../../../data/projectsData";

const Projects = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);

  // Pick 3 representative projects for the Home page
  const featuredProjects = [
    { ...clientProjects[0], category: "Client Project" },
    { ...majorProjects[0], category: "Major Project" },
    { ...clientProjects[1], category: "Client Project" },
  ];

  const handleOpenScreenshots = (project) => {
    setActiveProject(project);
    setIsOpen(true);
  };

  const handleClose = () => {
    setActiveProject(null);
    setIsOpen(false);
    setSelectedScreenshot(null);
  };

  return (
    <Box as="section" id="projects" mt={16}>
      {/* Header row: #projects + View all */}
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
            whiteSpace="nowrap"
          >
            <Box as="span" color="purple.400">
              #
            </Box>
            projects
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

        <Button
          as={RouterLink}
          to="/projects"
          variant="ghost"
          size="sm"
          alignSelf={{ base: "flex-start", md: "auto" }}
          fontFamily='"Fira Code", monospace'
          color="gray.300"
          _hover={{ color: "white", bg: "transparent" }}
          _active={{ bg: "transparent" }}
        >
          View all ⟶⟶
        </Button>
      </Flex>

      {/* Cards grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {featuredProjects.map((project, idx) => (
          <Box
            key={idx}
            borderWidth="1px"
            borderColor="gray.600"
            bg="gray.900"
            display="flex"
            flexDirection="column"
          >
            {/* Top placeholder or preview image */}
            <Box
              h="160px"
              bg="gray.800"
              borderBottomWidth="1px"
              borderColor="gray.600"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="gray.500"
              fontFamily='"Fira Code", monospace'
              fontSize="sm"
              position="relative"
              overflow="hidden"
            >
              {project.image ? (
                <Image src={project.image} alt={project.title} w="100%" h="100%" objectFit="cover" />
              ) : (
                <Text>Preview Image</Text>
              )}
              <Box
                position="absolute"
                top="8px"
                right="8px"
                bg="purple.800"
                color="purple.100"
                fontSize="10px"
                px="6px"
                py="2px"
                fontFamily='"Fira Code", monospace'
              >
                {project.category}
              </Box>
            </Box>

            {/* Tech stack bar */}
            <Box
              px={4}
              py={2}
              borderBottomWidth="1px"
              borderColor="gray.600"
              fontFamily='"Fira Code", monospace'
              fontSize="xs"
              color="gray.300"
            >
              {project.tech}
            </Box>

            {/* Content */}
            <Box px={4} py={4} flex="1" display="flex" flexDirection="column">
              <Heading
                as="h3"
                fontFamily='"Fira Code", monospace'
                fontSize="lg"
                color="white"
                mb={2}
              >
                {project.title}
              </Heading>

              <Text
                fontSize="sm"
                color="gray.400"
                mb={6}
                fontFamily='"Fira Code", monospace'
                flex="1"
              >
                {project.desc}
              </Text>

              <HStack spacing={3} mt="auto">
                <Button
                  as="a"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  size="sm"
                  variant="outline"
                  borderColor="purple.400"
                  color="white"
                  fontFamily='"Fira Code", monospace'
                  _hover={{ bg: "purple.900", borderColor: "purple.300" }}
                  borderRadius="0"
                >
                  Live ⟶
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  borderColor="gray.500"
                  color="gray.200"
                  fontFamily='"Fira Code", monospace'
                  _hover={{ bg: "gray.800" }}
                  onClick={() => handleOpenScreenshots(project)}
                  borderRadius="0"
                >
                  Screenshots
                </Button>
              </HStack>
            </Box>
          </Box>
        ))}
      </SimpleGrid>

      {/* Screenshots / Modal Info */}
      {isOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          w="100vw"
          h="100vh"
          bg="rgba(0, 0, 0, 0.8)"
          zIndex="999"
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
            maxW="500px"
            p={6}
            onClick={(e) => e.stopPropagation()}
          >
            <Flex justify="space-between" align="center" mb={4}>
              <Heading as="h3" fontSize="md" color="white" fontFamily='"Fira Code", monospace'>
                {activeProject?.title} - Demo Screenshots
              </Heading>
              <Button
                size="xs"
                variant="ghost"
                color="white"
                onClick={handleClose}
                _hover={{ bg: "gray.800" }}
              >
                ✕
              </Button>
            </Flex>
            <VStack spacing={4} align="stretch" mb={4} maxH="55vh" overflowY="auto" pr={1}>
              {activeProject?.screenshots && activeProject.screenshots.length > 0 ? (
                activeProject.screenshots.map((img, idx) => (
                  <Box
                    key={idx}
                    border="1px solid"
                    borderColor="gray.700"
                    bg="gray.850"
                    overflow="hidden"
                    cursor="pointer"
                    _hover={{ opacity: 0.8 }}
                    onClick={() => setSelectedScreenshot(img)}
                  >
                    <Image src={img} alt={`${activeProject.title} Screenshot ${idx + 1}`} w="100%" h="auto" objectFit="contain" />
                  </Box>
                ))
              ) : activeProject?.image ? (
                <Box
                  border="1px solid"
                  borderColor="gray.700"
                  bg="gray.850"
                  overflow="hidden"
                  cursor="pointer"
                  _hover={{ opacity: 0.8 }}
                  onClick={() => setSelectedScreenshot(activeProject.image)}
                >
                  <Image src={activeProject.image} alt={activeProject.title} w="100%" h="auto" objectFit="contain" />
                </Box>
              ) : (
                <Box h="180px" bg="gray.800" display="flex" alignItems="center" justifyContent="center" color="gray.500" fontSize="sm">
                  No screenshots available.
                </Box>
              )}
              <Text color="gray.350" fontFamily='"Fira Code", monospace' fontSize="xs" lineHeight="1.5">
                {activeProject?.desc}
              </Text>
            </VStack>
            <Flex justify="flex-end">
              <Button
                size="sm"
                variant="outline"
                borderColor="purple.400"
                color="white"
                fontFamily='"Fira Code", monospace'
                onClick={handleClose}
                borderRadius="0"
                _hover={{ bg: "purple.900" }}
              >
                Close
              </Button>
            </Flex>
          </Box>
        </Box>
      )}

      {/* Lightbox / Zoomed Preview Modal */}
      {selectedScreenshot && (
        <Box
          position="fixed"
          top="0"
          left="0"
          w="100vw"
          h="100vh"
          bg="rgba(0, 0, 0, 0.95)"
          zIndex="10000"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={4}
          onClick={() => setSelectedScreenshot(null)}
        >
          <Box position="relative" maxW="90%" maxH="90%" onClick={(e) => e.stopPropagation()}>
            <Image src={selectedScreenshot} alt="High Resolution Screenshot Preview" maxW="100%" maxH="80vh" objectFit="contain" />
            <Button
              position="absolute"
              top="-40px"
              right="0"
              size="xs"
              variant="outline"
              borderColor="white"
              color="white"
              fontFamily='"Fira Code", monospace'
              onClick={() => setSelectedScreenshot(null)}
              borderRadius="0"
              _hover={{ bg: "white", color: "black" }}
            >
              Close Preview ✕
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Projects;