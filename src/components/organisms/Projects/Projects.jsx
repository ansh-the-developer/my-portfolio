// src/components/organisms/Projects/Projects.jsx
import { Box, Flex, Heading, Text, SimpleGrid, Button, HStack, Image } from "@chakra-ui/react"
import lineImg from '../../../assets/icons/Line.png'

const projects = [
  {
    id: 1,
    title: "ChertNodes",
    stackTop: "HTML SCSS Python Flask",
    stackBottom: "Minecraft servers hosting",
    primaryAction: "Live",
    secondaryAction: "Cached",
  },
  {
    id: 2,
    title: "ProtectX",
    stackTop: "React Express Discord.js Node.js",
    stackBottom: "HTML SCSS Python Flask",
    primaryAction: "Live",
    secondaryAction: "Repo",
  },
  {
    id: 3,
    title: "Kahoot Answers Viewer",
    stackTop: "CSS Express Node.js",
    stackBottom: "Get answers to your kahoot quiz",
    primaryAction: "Live",
    secondaryAction: "Repo",
  },
];

const Projects = () => {
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
          variant="ghost"
          size="sm"
          alignSelf={{ base: "flex-start", md: "auto" }}
          fontFamily='"Fira Code", monospace'
          color="gray.300"
        >
          View all ⟶⟶
        </Button>
      </Flex>

      {/* Cards grid */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {projects.map((project) => (
          <Box
            key={project.id}
            borderWidth="1px"
            borderColor="gray.600"
            bg="gray.900"
            display="flex"
            flexDirection="column"
          >
            {/* Top placeholder for preview image */}
            <Box h="160px" bg="gray.800" />

            {/* Tech stack bar */}
            <Box
              borderTopWidth="1px"
              borderColor="gray.600"
              px={4}
              py={2}
              fontFamily='"Fira Code", monospace'
              fontSize="xs"
              color="gray.300"
            >
              {project.stackTop}
            </Box>

            {/* Content */}
            <Box
              borderTopWidth="1px"
              borderColor="gray.600"
              px={4}
              py={4}
              flex="1"
            >
              <Heading
                as="h3"
                fontFamily='"Fira Code", monospace'
                fontSize="lg"
                color="white"
                mb={2}
              >
                {project.title}
              </Heading>

              <Text fontSize="sm" color="gray.300" mb={4}>
                {project.stackBottom}
              </Text>

              <HStack spacing={3}>
                <Button
                  size="sm"
                  variant="outline"
                  borderColor="purple.400"
                  color="white"
                  fontFamily='"Fira Code", monospace'
                >
                  {project.primaryAction}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  borderColor="gray.500"
                  color="gray.200"
                  fontFamily='"Fira Code", monospace'
                >
                  {project.secondaryAction}
                </Button>
              </HStack>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Projects;
