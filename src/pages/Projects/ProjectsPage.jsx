import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Button,
  Image,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { clientProjects, majorProjects, demoProjects } from "../../data/projectsData";

const ProjectCard = ({ title, tech, desc, liveUrl, githubUrl, requiresAuth, image, onOpenScreenshots }) => (
  <Box
    border="1px solid"
    borderColor="gray.600"
    bg="gray.900"
    display="flex"
    flexDirection="column"
    minH="100%"
  >
    <Box
      h="140px"
      bg="gray.800"
      borderBottom="1px solid"
      borderColor="gray.600"
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="gray.500"
      fontFamily='"Fira Code", monospace'
      fontSize="sm"
      position="relative"
    >
      {image ? (
        <Image src={image} alt={title} w="100%" h="100%" objectFit="cover" />
      ) : (
        <Text>Preview</Text>
      )}
    </Box>

    <Box
      px={3}
      py={2}
      borderBottom="1px solid"
      borderColor="gray.600"
    >
      <Text
        fontFamily='"Fira Code", monospace'
        fontSize="xs"
        color="gray.400"
      >
        {tech}
      </Text>
    </Box>

    <VStack align="stretch" spacing={3} px={3} py={3} flex="1">
      <Heading
        as="h3"
        fontSize="lg"
        color="white"
        fontFamily='"Fira Code", monospace'
        fontWeight="600"
      >
        {title}
      </Heading>

      <Text
        fontSize="sm"
        color="gray.400"
        fontFamily='"Fira Code", monospace'
      >
        {desc}
      </Text>

      <HStack spacing={3} pt={1} mt="auto">
        <Button
          as="a"
          href={liveUrl}
          target="_blank"
          rel="noreferrer"
          size="sm"
          variant="outline"
          borderColor="purple.400"
          color="white"
          fontFamily='"Fira Code", monospace'
          borderRadius="0"
          _hover={{ bg: "purple.900" }}
        >
          Live ⟶
        </Button>

        {githubUrl && (
          <Button
            as="a"
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            size="sm"
            variant="outline"
            borderColor="gray.500"
            color="gray.300"
            fontFamily='"Fira Code", monospace'
            borderRadius="0"
            _hover={{ bg: "gray.800" }}
          >
            GitHub
          </Button>
        )}

        {requiresAuth && (
          <Button
            size="sm"
            variant="outline"
            borderColor="gray.500"
            color="gray.200"
            fontFamily='"Fira Code", monospace'
            borderRadius="0"
            _hover={{ bg: "gray.850" }}
            onClick={() => onOpenScreenshots({ title, desc })}
          >
            Screenshots
          </Button>
        )}
      </HStack>
    </VStack>
  </Box>
);

const SectionTitle = ({ children }) => (
  <Heading
    as="h2"
    fontSize={{ base: "xl", md: "2xl" }}
    color="white"
    fontFamily='"Fira Code", monospace'
    fontWeight="500"
    mb={6}
    mt={8}
  >
    <Box as="span" color="purple.400">
      #
    </Box>
    {children}
  </Heading>
);

const ProjectsPage = () => {
  const [activeProject, setActiveProject] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenScreenshots = (project) => {
    setActiveProject(project);
    setIsOpen(true);
  };

  const handleClose = () => {
    setActiveProject(null);
    setIsOpen(false);
  };

  return (
    <Box as="section" pt={8} pb={16}>
      <VStack align="stretch" spacing={10}>
        <Box>
          <HStack align="center" spacing={3} mb={2}>
            <Heading
              as="h1"
              fontSize={{ base: "2xl", md: "3xl" }}
              color="white"
              fontFamily='"Fira Code", monospace'
              fontWeight="600"
            >
              <Box as="span" color="purple.400">
                /
              </Box>
              projects
            </Heading>
          </HStack>

          <Text
            color="gray.400"
            fontSize="sm"
            fontFamily='"Fira Code", monospace'
          >
            List of my personal and client projects
          </Text>
        </Box>

        {/* Client Projects */}
        <Box>
          <SectionTitle>client-projects</SectionTitle>
          <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
            {clientProjects.map((project, idx) => (
              <ProjectCard
                key={idx}
                {...project}
                onOpenScreenshots={handleOpenScreenshots}
              />
            ))}
          </SimpleGrid>
        </Box>

        {/* Major Projects */}
        <Box>
          <SectionTitle>major-projects</SectionTitle>
          <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
            {majorProjects.map((project, idx) => (
              <ProjectCard
                key={idx}
                {...project}
                onOpenScreenshots={handleOpenScreenshots}
              />
            ))}
          </SimpleGrid>
        </Box>

        {/* Demo Projects */}
        <Box>
          <SectionTitle>demo-projects</SectionTitle>
          <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
            {demoProjects.map((project, idx) => (
              <ProjectCard
                key={idx}
                {...project}
                onOpenScreenshots={handleOpenScreenshots}
              />
            ))}
          </SimpleGrid>
        </Box>
      </VStack>

      {/* Screenshots Modal */}
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
            <VStack spacing={4} align="stretch" mb={4}>
              <Box
                h="200px"
                bg="gray.800"
                border="1px dashed"
                borderColor="gray.500"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="gray.400"
                fontFamily='"Fira Code", monospace'
                fontSize="sm"
                textAlign="center"
                p={4}
              >
                [Screenshot Placeholder: Dashboard Overview]<br />
                (Real screenshot will be loaded here once uploaded to Supabase Storage)
              </Box>
              <Text color="gray.300" fontFamily='"Fira Code", monospace' fontSize="sm">
                This application requires authentication or backend configurations to run live. A gallery of actual client interface snapshots will display here shortly.
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
    </Box>
  );
};

export default ProjectsPage;