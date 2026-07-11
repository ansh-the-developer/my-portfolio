import {
  Box,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Image,
} from "@chakra-ui/react";
import lineImg from "../../../assets/icons/Line.png";
import dotsImg from "../../../assets/icons/Dots.png";     // optional
import squareImg from "../../../assets/icons/Rect26.png"; // optional

const skillsData = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript", "HTML5", "CSS3"],
  },
  {
    title: "Frameworks & Libs",
    items: ["React.js", "Next.js", "React Query", "Redux Toolkit"],
  },
  {
    title: "Styling & Design",
    items: ["Chakra UI", "Tailwind CSS", "Material UI", "Atomic Design"],
  },
  {
    title: "Tools & DevOps",
    items: ["Git", "GitHub", "Jira", "Jenkins", "Agile"],
  },
  {
    title: "SaaS & Architecture",
    items: ["Supabase", "REST APIs", "Nx", "Turborepo", "Cursor", "OpenAI", "Ollama"],
  },
];

const Skills = () => {
  return (
    <Box as="section" id="skills" mt={20}>
      {/* Header row: #skills + line */}
      <Flex
        justify="space-between"
        align="center"
        mb={10}
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
            skills
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

      {/* Layout: left decorative area + right skills grid */}
      <Flex
        gap={10}
        direction={{ base: "column", lg: "row" }}
        align="flex-start"
      >
        {/* LEFT decorative area (placeholder, can tweak later) */}
        <Box
          flex="1"
          minH="180px"
          position="relative"
          display={{ base: "none", md: "block" }}
        >
          {/* Example: dots + squares – you can replace with exact assets */}
          <Image
            src={dotsImg}
            alt=""
            position="absolute"
            top="10%"
            left="10%"
            boxSize="48px"
          />
          <Image
            src={squareImg}
            alt=""
            position="absolute"
            top="20%"
            right="10%"
            boxSize="80px"
          />
          <Image
            src={squareImg}
            alt=""
            position="absolute"
            bottom="5%"
            left="20%"
            boxSize="64px"
          />
        </Box>

        {/* RIGHT skills grid */}
        <SimpleGrid
          flex="1"
          columns={{ base: 1, md: 2 }}
          spacing={4}
          minW={{ base: "full", lg: "420px" }}
        >
          {skillsData.map((group) => (
            <Box
              key={group.title}
              borderWidth="1px"
              borderColor="gray.600"
              bg="gray.900"
            >
              {/* header */}
              <Box
                borderBottomWidth="1px"
                borderColor="gray.600"
                px={4}
                py={2}
              >
                <Text
                  fontFamily='"Fira Code", monospace'
                  fontSize="sm"
                  fontWeight="600"
                  color="white"
                >
                  {group.title}
                </Text>
              </Box>

              {/* items */}
              <VStack align="flex-start" spacing={1} px={4} py={3}>
                {group.items.map((item) => (
                  <Text
                    key={item}
                    fontFamily='"Fira Code", monospace'
                    fontSize="sm"
                    color="gray.300"
                  >
                    {item}
                  </Text>
                ))}
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Flex>
    </Box>
  );
};

export default Skills;
