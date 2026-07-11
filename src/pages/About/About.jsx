import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  SimpleGrid,
  HStack,
  VStack,
  Button,
} from "@chakra-ui/react";
import aboutImg from "../../assets/images/aboutImg.png";
import dotsImg from "../../assets/icons/Dots.png";

const FunFactCard = ({ text }) => (
  <Box
    border="1px solid"
    borderColor="gray.600"
    bg="transparent"
    px={4}
    py={2}
    fontFamily='"Fira Code", monospace'
    fontSize="sm"
    color="gray.300"
  >
    {text}
  </Box>
);

const About = () => {
  const funFacts = [
    "I like playing video games in my free time",
    "I love building tooling and dashboard software",
    "I'm based in New Delhi, India",
    "I am a self-taught developer who loves to learn new things",
    "I enjoy hot cup of ginger tea while coding",
    "I focus on building HRMS and luxury e-commerce platforms",
  ];

  return (
    <Box as="section" pt={8} pb={16}>
      <VStack align="stretch" spacing={10}>
        {/* Title */}
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
              about-me
            </Heading>
          </HStack>
          <Text
            color="gray.400"
            fontSize="sm"
            fontFamily='"Fira Code", monospace'
          >
            Who am I?
          </Text>
        </Box>

        {/* Bio row */}
        <Flex
          direction={{ base: "column", lg: "row" }}
          align={{ base: "flex-start", lg: "center" }}
          gap={{ base: 10, lg: 16 }}
        >
          {/* Bio text */}
          <Box flex="1" maxW="600px">
            <Heading
              as="h2"
              fontSize="xl"
              color="white"
              fontFamily='"Fira Code", monospace'
              fontWeight="600"
              mb={6}
            >
              Who is Aman?
            </Heading>

            <Text
              mb={4}
              fontFamily='"Fira Code", monospace'
              fontSize="sm"
              color="gray.300"
              lineHeight="1.6"
            >
              Hello, I&apos;m Aman Joshi! I&apos;m a Frontend Engineer with 4 years of experience building enterprise SaaS applications, workflow automation platforms, and scalable user interfaces using React.js, Next.js, TypeScript, and modern frontend architecture.
            </Text>

            <Text
              mb={4}
              fontFamily='"Fira Code", monospace'
              fontSize="sm"
              color="gray.300"
              lineHeight="1.6"
            >
              My professional experience spans roles at Cyber Alliance India, REZOLVE.AI, and RAPIDSOFT TECHNOLOGIES. Over the course of my career, I have contributed to approximately 108 production releases across enterprise products serving 100+ business customers.
            </Text>

            <Text
              mb={4}
              fontFamily='"Fira Code", monospace'
              fontSize="sm"
              color="gray.300"
              lineHeight="1.6"
            >
              I focus on modular UI composition using Atomic Design and Chakra UI, authentication integrations (like Auth0 and Supabase Auth), role-based access control, and high-performance client state management.
            </Text>

            <Button
              onClick={() => window.dispatchEvent(new CustomEvent("open-resume-gatekeeper"))}
              mt={6}
              variant="outline"
              borderColor="purple.400"
              color="white"
              fontFamily='"Fira Code", monospace'
              size="sm"
              borderRadius="0"
              _hover={{ bg: "purple.900" }}
            >
              Download CV ⟶
            </Button>
          </Box>

          {/* Bio Image */}
          <Box
            flex="1"
            display="flex"
            justifyContent={{ base: "center", lg: "flex-end" }}
            position="relative"
          >
            <Image
              src={aboutImg}
              alt="Aman Joshi Profile"
              maxW={{ base: "260px", md: "320px", lg: "360px" }}
              objectFit="cover"
              zIndex="1"
            />
            <Image
              src={dotsImg}
              alt=""
              position="absolute"
              bottom="10%"
              left="5%"
              boxSize="60px"
              opacity="0.3"
            />
          </Box>
        </Flex>

        {/* Fun Facts section */}
        <Box pt={6}>
          <Heading
            as="h2"
            fontSize={{ base: "xl", md: "2xl" }}
            color="white"
            fontFamily='"Fira Code", monospace'
            fontWeight="500"
            mb={6}
          >
            <Box as="span" color="purple.400">
              #
            </Box>
            my-fun-facts
          </Heading>

          <Flex wrap="wrap" gap={3} maxW="800px">
            {funFacts.map((fact, idx) => (
              <FunFactCard key={idx} text={fact} />
            ))}
          </Flex>
        </Box>
      </VStack>
    </Box>
  );
};

export default About;
