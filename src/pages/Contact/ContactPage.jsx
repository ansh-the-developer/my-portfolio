import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Flex,
  Input,
  Textarea,
  Button,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";

const CustomField = ({ label, children, error }) => (
  <VStack align="stretch" spacing={1} w="full">
    <Text fontFamily='"Fira Code", monospace' fontSize="sm" color="gray.300">
      {label}
    </Text>
    {children}
    {error && (
      <Text fontFamily='"Fira Code", monospace' fontSize="xs" color="red.400">
        {error}
      </Text>
    )}
  </VStack>
);

const CustomSelect = ({ value, onChange, options, name, placeholder }) => (
  <Box
    as="select"
    name={name}
    value={value}
    onChange={onChange}
    w="full"
    h="40px"
    px={3}
    bg="gray.900"
    border="1px solid"
    borderColor="gray.600"
    color="white"
    fontFamily='"Fira Code", monospace'
    fontSize="sm"
    borderRadius="0"
    outline="none"
    style={{ colorScheme: "dark" }}
  >
    <option value="" style={{ background: "#282c33" }}>{placeholder}</option>
    {options.map((opt) => (
      <option key={opt.value} value={opt.value} style={{ background: "#282c33" }}>
        {opt.label}
      </option>
    ))}
  </Box>
);

const ContactPage = () => {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const checkUnlocked = () => {
      setUnlocked(localStorage.getItem("contact_details_unlocked") === "true");
    };
    checkUnlocked();
    window.addEventListener("contact-details-unlocked", checkUnlocked);
    return () => {
      window.removeEventListener("contact-details-unlocked", checkUnlocked);
    };
  }, []);

  const handleOpenGatekeeper = () => {
    window.dispatchEvent(new Event("open-contact-gatekeeper"));
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    budget: "",
    project_type: "",
    timeline: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' or 'error'
  const [statusMessage, setStatusMessage] = useState("");

  const budgetOptions = [
    { value: "< $1,000", label: "Less than $1,000" },
    { value: "$1,000 - $5,000", label: "$1,000 - $5,000" },
    { value: "$5,000 - $10,000", label: "$5,000 - $10,000" },
    { value: "> $10,000", label: "More than $10,000" },
  ];

  const projectTypeOptions = [
    { value: "Web Development", label: "Web Development" },
    { value: "Mobile Application", label: "Mobile Application" },
    { value: "E-Commerce System", label: "E-Commerce System" },
    { value: "UI/UX Design", label: "UI/UX Design" },
    { value: "Consultancy & Code Audit", label: "Consultancy & Code Audit" },
    { value: "Other", label: "Other Project Scope" },
  ];

  const timelineOptions = [
    { value: "< 1 month", label: "Fast (Less than 1 month)" },
    { value: "1 - 3 months", label: "Standard (1 - 3 months)" },
    { value: "3 - 6 months", label: "Moderate (3 - 6 months)" },
    { value: "> 6 months", label: "Long Term (6+ months)" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s-]{8,20}$/.test(form.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!form.budget) newErrors.budget = "Please select a budget range";
    if (!form.project_type) newErrors.project_type = "Please select a project type";
    if (!form.timeline) newErrors.timeline = "Please select a project timeline";
    if (!form.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setStatusMessage("");

    if (!validate()) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from("enquiries")
        .insert([
          {
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            company: form.company.trim() || null,
            budget: form.budget,
            project_type: form.project_type,
            timeline: form.timeline,
            message: form.message.trim(),
          },
        ]);

      if (error) throw error;

      setStatus("success");
      setStatusMessage("Thank you! Your quote request has been successfully submitted and stored.");
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        budget: "",
        project_type: "",
        timeline: "",
        message: "",
      });
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
      setStatusMessage("Failed to submit request: " + (err.message || "Network error. Please try again."));
    } finally {
      setLoading(false);
    }
  };

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
              get-a-quote
            </Heading>
          </HStack>
          <Text
            color="gray.400"
            fontSize="sm"
            fontFamily='"Fira Code", monospace'
          >
            Submit your project details to get an estimate
          </Text>
        </Box>

        {/* Form Container */}
        <Flex direction={{ base: "column", lg: "row" }} gap={12} align="flex-start">
          {/* Info Column */}
          <VStack align="stretch" spacing={6} maxW="400px" flex="1">
            <Heading
              as="h2"
              fontSize="xl"
              color="white"
              fontFamily='"Fira Code", monospace'
              fontWeight="600"
            >
              Let&apos;s build something great
            </Heading>
            <Text color="gray.300" fontSize="sm" fontFamily='"Fira Code", monospace' lineHeight="1.6">
              I am open to website development, enterprise SaaS architecture, custom HRMS dashboards, and e-commerce project integrations.
            </Text>
            <Text color="gray.300" fontSize="sm" fontFamily='"Fira Code", monospace' lineHeight="1.6">
              Fill out this form with your timeline and budget parameters. I will review the specification and get back to you within 24 hours.
            </Text>

            <Box borderLeft="2px solid" borderColor="purple.400" pl={4} py={1}>
              <Text color="white" fontWeight="600" fontSize="xs" fontFamily='"Fira Code", monospace' mb={1}>
                Direct Contact
              </Text>
              {unlocked ? (
                <>
                  <Text color="gray.400" fontSize="sm" fontFamily='"Fira Code", monospace' userSelect="all">
                    Email: amanjoshi16011997@gmail.com
                  </Text>
                  <Text color="gray.400" fontSize="sm" fontFamily='"Fira Code", monospace' userSelect="all">
                    Phone: +91 8449503656
                  </Text>
                </>
              ) : (
                <Text
                  color="purple.300"
                  fontSize="sm"
                  fontFamily='"Fira Code", monospace'
                  cursor="pointer"
                  textDecoration="underline"
                  _hover={{ color: "purple.200" }}
                  onClick={handleOpenGatekeeper}
                >
                  [Verify credentials to view contact details]
                </Text>
              )}
            </Box>
          </VStack>

          {/* Form Box */}
          <Box
            flex="1.5"
            w="full"
            border="1px solid"
            borderColor="gray.600"
            p={{ base: 6, md: 8 }}
            bg="gray.900"
          >
            <form onSubmit={handleSubmit}>
              <VStack spacing={5} align="stretch">
                {status === "success" && (
                  <Box p={3} bg="green.900" border="1px solid" borderColor="green.500" color="green.100">
                    <Text fontSize="sm" fontFamily='"Fira Code", monospace'>{statusMessage}</Text>
                  </Box>
                )}
                {status === "error" && (
                  <Box p={3} bg="red.900" border="1px solid" borderColor="red.500" color="red.100">
                    <Text fontSize="sm" fontFamily='"Fira Code", monospace'>{statusMessage}</Text>
                  </Box>
                )}

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                  <CustomField label="Name *" error={errors.name}>
                    <Input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      bg="gray.900"
                      border="1px solid"
                      borderColor="gray.600"
                      color="white"
                      fontFamily='"Fira Code", monospace'
                      fontSize="sm"
                      borderRadius="0"
                      outline="none"
                      h="40px"
                      px={3}
                      _focus={{ borderColor: "purple.400" }}
                    />
                  </CustomField>

                  <CustomField label="Email *" error={errors.email}>
                    <Input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      bg="gray.900"
                      border="1px solid"
                      borderColor="gray.600"
                      color="white"
                      fontFamily='"Fira Code", monospace'
                      fontSize="sm"
                      borderRadius="0"
                      outline="none"
                      h="40px"
                      px={3}
                      _focus={{ borderColor: "purple.400" }}
                    />
                  </CustomField>
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                  <CustomField label="Phone *" error={errors.phone}>
                    <Input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Your contact number"
                      bg="gray.900"
                      border="1px solid"
                      borderColor="gray.600"
                      color="white"
                      fontFamily='"Fira Code", monospace'
                      fontSize="sm"
                      borderRadius="0"
                      outline="none"
                      h="40px"
                      px={3}
                      _focus={{ borderColor: "purple.400" }}
                    />
                  </CustomField>

                  <CustomField label="Company (Optional)">
                    <Input
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      placeholder="Company name"
                      bg="gray.900"
                      border="1px solid"
                      borderColor="gray.600"
                      color="white"
                      fontFamily='"Fira Code", monospace'
                      fontSize="sm"
                      borderRadius="0"
                      outline="none"
                      h="40px"
                      px={3}
                      _focus={{ borderColor: "purple.400" }}
                    />
                  </CustomField>
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
                  <CustomField label="Project Type *" error={errors.project_type}>
                    <CustomSelect
                      name="project_type"
                      value={form.project_type}
                      onChange={handleChange}
                      options={projectTypeOptions}
                      placeholder="Select type"
                    />
                  </CustomField>

                  <CustomField label="Budget Range *" error={errors.budget}>
                    <CustomSelect
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      options={budgetOptions}
                      placeholder="Select budget"
                    />
                  </CustomField>

                  <CustomField label="Timeline *" error={errors.timeline}>
                    <CustomSelect
                      name="timeline"
                      value={form.timeline}
                      onChange={handleChange}
                      options={timelineOptions}
                      placeholder="Select timeline"
                    />
                  </CustomField>
                </SimpleGrid>

                <CustomField label="Project Requirements *" error={errors.message}>
                  <Textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe your project, goals, and core features..."
                    bg="gray.900"
                    border="1px solid"
                    borderColor="gray.600"
                    color="white"
                    fontFamily='"Fira Code", monospace'
                    fontSize="sm"
                    borderRadius="0"
                    outline="none"
                    minH="120px"
                    p={3}
                    _focus={{ borderColor: "purple.400" }}
                  />
                </CustomField>

                <Button
                  type="submit"
                  disabled={loading}
                  mt={4}
                  h="44px"
                  bg="transparent"
                  border="1px solid"
                  borderColor="purple.400"
                  color="white"
                  fontFamily='"Fira Code", monospace'
                  fontSize="sm"
                  borderRadius="0"
                  cursor="pointer"
                  _hover={{ bg: "purple.900" }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  gap={2}
                >
                  {loading ? (
                    <>
                      <Spinner size="xs" /> Submitting...
                    </>
                  ) : (
                    "Submit Request ⟶"
                  )}
                </Button>
              </VStack>
            </form>
          </Box>
        </Flex>
      </VStack>
    </Box>
  );
};

export default ContactPage;
