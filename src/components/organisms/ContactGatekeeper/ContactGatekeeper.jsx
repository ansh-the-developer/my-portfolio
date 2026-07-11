import {
  Box,
  Heading,
  Text,
  VStack,
  Input,
  Button,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { supabase } from "../../../utils/supabaseClient";

const CustomField = ({ label, children, error }) => (
  <VStack align="stretch" spacing={1} w="full">
    <Text fontFamily='"Fira Code", monospace' fontSize="xs" color="gray.300">
      {label}
    </Text>
    {children}
    {error && (
      <Text fontFamily='"Fira Code", monospace' fontSize="10px" color="red.400">
        {error}
      </Text>
    )}
  </VStack>
);

const ContactGatekeeper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setSuccess(false);
      setErrors({});
      setForm({ name: "", email: "", phone: "" });
    };

    window.addEventListener("open-contact-gatekeeper", handleOpen);
    return () => {
      window.removeEventListener("open-contact-gatekeeper", handleOpen);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name] || errors.contact) {
      setErrors((prev) => ({ ...prev, [name]: "", contact: "" }));
    }
  };

  const handleClose = () => {
    if (loading) return;
    setIsOpen(false);
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // 1. Insert details in Supabase leads table
      const { error: dbError } = await supabase
        .from("resume_downloads")
        .insert([
          {
            name: form.name.trim(),
            email: form.email.trim() || null,
            phone: form.phone.trim() || null,
          },
        ]);

      if (dbError) throw dbError;

      // 2. Unlock details in local storage and trigger global state refresh
      localStorage.setItem("contact_details_unlocked", "true");
      window.dispatchEvent(new Event("contact-details-unlocked"));
      setSuccess(true);
    } catch (err) {
      console.error("Contact details gatekeeper error:", err);
      setErrors({ api: err.message || "Network error. Please try again." });
    } finally {
      setLoading(false);
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
      zIndex="9999"
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
      >
        <Flex justify="space-between" align="center" mb={4}>
          <Heading
            as="h3"
            fontSize="md"
            color="white"
            fontFamily='"Fira Code", monospace'
          >
            <Box as="span" color="purple.400">
              #
            </Box>
            contact-details
          </Heading>
          <Button
            size="xs"
            variant="ghost"
            color="white"
            onClick={handleClose}
            disabled={loading}
            _hover={{ bg: "gray.850" }}
          >
            ✕
          </Button>
        </Flex>

        {success ? (
          <Box py={4} textAlign="left">
            <Text
              fontFamily='"Fira Code", monospace'
              fontSize="sm"
              color="green.300"
              mb={4}
              textAlign="center"
              fontWeight="600"
            >
              ✓ Access Granted!
            </Text>
            
            <VStack align="stretch" spacing={3} mb={6} p={4} bg="gray.850" borderLeft="2px solid" borderColor="green.400">
              <Box>
                <Text fontFamily='"Fira Code", monospace' fontSize="10px" color="gray.400">EMAIL</Text>
                <Text fontFamily='"Fira Code", monospace' fontSize="sm" color="white" userSelect="all">
                  amanjoshi16011997@gmail.com
                </Text>
              </Box>
              <Box>
                <Text fontFamily='"Fira Code", monospace' fontSize="10px" color="gray.400">WHATSAPP / PHONE</Text>
                <Text fontFamily='"Fira Code", monospace' fontSize="sm" color="white" userSelect="all">
                  +91 8449503656
                </Text>
              </Box>
            </VStack>

            <Button
              w="full"
              h="36px"
              bg="transparent"
              border="1px solid"
              borderColor="purple.400"
              color="white"
              fontFamily='"Fira Code", monospace'
              fontSize="xs"
              borderRadius="0"
              onClick={handleClose}
              _hover={{ bg: "purple.900" }}
            >
              Close
            </Button>
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="stretch">
              <Text
                fontFamily='"Fira Code", monospace'
                fontSize="xs"
                color="gray.400"
                lineHeight="1.5"
                mb={2}
              >
                Please verify your details to view direct contact channels.
              </Text>

              {errors.api && (
                <Box
                  p={2}
                  bg="red.900"
                  border="1px solid"
                  borderColor="red.500"
                  color="red.100"
                >
                  <Text fontSize="xs" fontFamily='"Fira Code", monospace'>
                    {errors.api}
                  </Text>
                </Box>
              )}

              <CustomField label="Full Name *" error={errors.name}>
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Aman Joshi"
                  bg="gray.900"
                  border="1px solid"
                  borderColor="gray.600"
                  color="white"
                  fontFamily='"Fira Code", monospace'
                  fontSize="xs"
                  borderRadius="0"
                  h="36px"
                  px={3}
                  outline="none"
                  _focus={{ borderColor: "purple.400" }}
                  required
                />
              </CustomField>

              <CustomField label="Email Address *" error={errors.email}>
                <Input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="aman@example.com"
                  bg="gray.900"
                  border="1px solid"
                  borderColor="gray.600"
                  color="white"
                  fontFamily='"Fira Code", monospace'
                  fontSize="xs"
                  borderRadius="0"
                  h="36px"
                  px={3}
                  outline="none"
                  _focus={{ borderColor: "purple.400" }}
                  required
                />
              </CustomField>

              <CustomField label="WhatsApp / Phone *" error={errors.phone}>
                <Input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 8449503656"
                  bg="gray.900"
                  border="1px solid"
                  borderColor="gray.600"
                  color="white"
                  fontFamily='"Fira Code", monospace'
                  fontSize="xs"
                  borderRadius="0"
                  h="36px"
                  px={3}
                  outline="none"
                  _focus={{ borderColor: "purple.400" }}
                  required
                />
              </CustomField>

              <Button
                type="submit"
                disabled={loading}
                mt={2}
                h="36px"
                bg="transparent"
                border="1px solid"
                borderColor="purple.400"
                color="white"
                fontFamily='"Fira Code", monospace'
                fontSize="xs"
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
                    <Spinner size="xs" /> Processing...
                  </>
                ) : (
                  "Verify & Show Details ⟶"
                )}
              </Button>
            </VStack>
          </form>
        )}
      </Box>
    </Box>
  );
};

export default ContactGatekeeper;
