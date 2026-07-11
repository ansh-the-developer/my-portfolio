import {
  Box,
  Heading,
  Text,
  VStack,
  Input,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && user.email === "amanjoshi16011997@gmail.com") {
        navigate("/admin");
      }
    };
    checkUser();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Basic client-side check
      if (email.trim() !== "amanjoshi16011997@gmail.com") {
        throw new Error("Access Denied: Only authorized administrators can authenticate.");
      }

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (authError) throw authError;

      if (data?.user?.email !== "amanjoshi16011997@gmail.com") {
        await supabase.auth.signOut();
        throw new Error("Access Denied: Only authorized administrators can authenticate.");
      }

      navigate("/admin");
    } catch (err) {
      console.error("Login failure:", err);
      setError(err.message || "Failed to authenticate. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="70vh"
      pt={8}
      pb={16}
    >
      <Box
        w="full"
        maxW="400px"
        border="1px solid"
        borderColor="gray.600"
        bg="gray.900"
        p={8}
      >
        <form onSubmit={handleLogin}>
          <VStack spacing={6} align="stretch">
            <Box textAlign="center">
              <Heading
                as="h1"
                fontSize="xl"
                color="white"
                fontFamily='"Fira Code", monospace'
                fontWeight="600"
                mb={2}
              >
                <Box as="span" color="purple.400">
                  #
                </Box>
                admin-login
              </Heading>
              <Text color="gray.400" fontSize="xs" fontFamily='"Fira Code", monospace'>
                Access restricted to portfolio moderator
              </Text>
            </Box>

            {error && (
              <Box p={3} bg="red.900" border="1px solid" borderColor="red.500" color="red.100">
                <Text fontSize="xs" fontFamily='"Fira Code", monospace'>
                  {error}
                </Text>
              </Box>
            )}

            <VStack align="stretch" spacing={4}>
              <VStack align="stretch" spacing={1}>
                <Text fontFamily='"Fira Code", monospace' fontSize="xs" color="gray.300">
                  Email
                </Text>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  bg="gray.900"
                  border="1px solid"
                  borderColor="gray.600"
                  color="white"
                  fontFamily='"Fira Code", monospace'
                  fontSize="sm"
                  borderRadius="0"
                  h="40px"
                  px={3}
                  outline="none"
                  _focus={{ borderColor: "purple.400" }}
                  required
                />
              </VStack>

              <VStack align="stretch" spacing={1}>
                <Text fontFamily='"Fira Code", monospace' fontSize="xs" color="gray.300">
                  Password
                </Text>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  bg="gray.900"
                  border="1px solid"
                  borderColor="gray.600"
                  color="white"
                  fontFamily='"Fira Code", monospace'
                  fontSize="sm"
                  borderRadius="0"
                  h="40px"
                  px={3}
                  outline="none"
                  _focus={{ borderColor: "purple.400" }}
                  required
                />
              </VStack>
            </VStack>

            <Button
              type="submit"
              disabled={loading}
              h="40px"
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
                  <Spinner size="xs" /> Authenticating...
                </>
              ) : (
                "Login ⟶"
              )}
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
