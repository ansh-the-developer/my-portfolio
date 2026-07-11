import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Button,
  Input,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabaseClient";

const StatCard = ({ title, value }) => (
  <Box
    border="1px solid"
    borderColor="gray.600"
    bg="gray.900"
    p={4}
    minH="100px"
    display="flex"
    flexDirection="column"
    justifyContent="center"
  >
    <Text fontFamily='"Fira Code", monospace' fontSize="xs" color="gray.400" mb={1}>
      {title}
    </Text>
    <Heading
      as="h3"
      fontFamily='"Fira Code", monospace'
      fontSize="2xl"
      color="purple.400"
      fontWeight="600"
    >
      {value}
    </Heading>
  </Box>
);

const EnquiryRow = ({ enquiry, onDelete }) => (
  <Box
    border="1px solid"
    borderColor="gray.600"
    bg="gray.900"
    p={5}
    mb={4}
    position="relative"
  >
    <Flex justify="space-between" align="flex-start" gap={4} mb={3} direction={{ base: "column", sm: "row" }}>
      <VStack align="flex-start" spacing={1}>
        <HStack>
          <Text fontFamily='"Fira Code", monospace' fontSize="md" fontWeight="600" color="white">
            {enquiry.name}
          </Text>
          {enquiry.company && (
            <Text fontFamily='"Fira Code", monospace' fontSize="xs" color="purple.300" px={2} py="2px" bg="purple.900">
              {enquiry.company}
            </Text>
          )}
        </HStack>
        <Text fontFamily='"Fira Code", monospace' fontSize="xs" color="gray.400">
          Email: {enquiry.email} | Phone: {enquiry.phone}
        </Text>
      </VStack>

      <Text fontFamily='"Fira Code", monospace' fontSize="xs" color="gray.500">
        {new Date(enquiry.created_at).toLocaleString()}
      </Text>
    </Flex>

    <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={3} mb={4} p={3} bg="gray.850" borderLeft="2px solid" borderColor="purple.400">
      <Box>
        <Text fontFamily='"Fira Code", monospace' fontSize="10px" color="gray.400">PROJECT TYPE</Text>
        <Text fontFamily='"Fira Code", monospace' fontSize="xs" color="white" fontWeight="600">{enquiry.project_type}</Text>
      </Box>
      <Box>
        <Text fontFamily='"Fira Code", monospace' fontSize="10px" color="gray.400">BUDGET RANGE</Text>
        <Text fontFamily='"Fira Code", monospace' fontSize="xs" color="white" fontWeight="600">{enquiry.budget}</Text>
      </Box>
      <Box>
        <Text fontFamily='"Fira Code", monospace' fontSize="10px" color="gray.400">EST. TIMELINE</Text>
        <Text fontFamily='"Fira Code", monospace' fontSize="xs" color="white" fontWeight="600">{enquiry.timeline}</Text>
      </Box>
    </SimpleGrid>

    <Box mb={4}>
      <Text fontFamily='"Fira Code", monospace' fontSize="10px" color="gray.400" mb={1}>REQUIREMENTS</Text>
      <Text fontFamily='"Fira Code", monospace' fontSize="sm" color="gray.200" whiteSpace="pre-wrap" lineHeight="1.5">
        {enquiry.message}
      </Text>
    </Box>

    <Button
      size="xs"
      variant="outline"
      borderColor="red.500"
      color="red.300"
      fontFamily='"Fira Code", monospace'
      borderRadius="0"
      _hover={{ bg: "red.900", color: "white" }}
      onClick={() => onDelete(enquiry.id)}
    >
      Delete Request
    </Button>
  </Box>
);

const DownloadRow = ({ download, onDelete }) => (
  <Box
    border="1px solid"
    borderColor="gray.600"
    bg="gray.900"
    p={4}
    mb={3}
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    flexDirection={{ base: "column", sm: "row" }}
    gap={4}
  >
    <VStack align="flex-start" spacing={1}>
      <Text fontFamily='"Fira Code", monospace' fontSize="sm" fontWeight="600" color="white">
        {download.name}
      </Text>
      <Text fontFamily='"Fira Code", monospace' fontSize="xs" color="gray.400">
        Email: {download.email || "N/A"} | WhatsApp/Phone: {download.phone || "N/A"}
      </Text>
    </VStack>
    <HStack spacing={4} alignSelf={{ base: "flex-end", sm: "center" }}>
      <Text fontFamily='"Fira Code", monospace' fontSize="xs" color="gray.500">
        {new Date(download.created_at).toLocaleString()}
      </Text>
      <Button
        size="xs"
        variant="outline"
        borderColor="red.500"
        color="red.300"
        fontFamily='"Fira Code", monospace'
        borderRadius="0"
        _hover={{ bg: "red.900", color: "white" }}
        onClick={() => onDelete(download.id)}
      >
        Delete
      </Button>
    </HStack>
  </Box>
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("quotes"); // "quotes" or "downloads"
  const [enquiries, setEnquiries] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  
  // Filters
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterBudget, setFilterBudget] = useState("");
  
  const navigate = useNavigate();

  // Validate Authentication and Admin Status
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || user.email !== "amanjoshi16011997@gmail.com") {
        navigate("/login");
      } else {
        setAuthLoading(false);
        fetchData();
      }
    };
    checkAuth();
  }, [navigate, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "quotes") {
        const { data, error } = await supabase
          .from("enquiries")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setEnquiries(data || []);
      } else {
        const { data, error } = await supabase
          .from("resume_downloads")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setDownloads(data || []);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnquiryDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this quote request?")) return;

    try {
      const { error } = await supabase
        .from("enquiries")
        .delete()
        .eq("id", id);
      if (error) throw error;
      setEnquiries((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting entry:", err);
      alert("Failed to delete the enquiry. Please try again.");
    }
  };

  const handleDownloadDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this download entry?")) return;

    try {
      const { error } = await supabase
        .from("resume_downloads")
        .delete()
        .eq("id", id);
      if (error) throw error;
      setDownloads((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting entry:", err);
      alert("Failed to delete the download log. Please try again.");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  // Filter & Search computations
  const filteredEnquiries = enquiries.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()) ||
      item.message.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType ? item.project_type === filterType : true;
    const matchesBudget = filterBudget ? item.budget === filterBudget : true;
    return matchesSearch && matchesType && matchesBudget;
  });

  const filteredDownloads = downloads.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      (item.email && item.email.toLowerCase().includes(search.toLowerCase())) ||
      (item.phone && item.phone.toLowerCase().includes(search.toLowerCase()));
    return matchesSearch;
  });

  // Stats computation
  const totalEnquiries = enquiries.length;
  const totalDownloads = downloads.length;
  const webDevCount = enquiries.filter((e) => e.project_type === "Web Development").length;
  const highBudgetCount = enquiries.filter((e) => e.budget === "> $10,000" || e.budget === "$5,000 - $10,000").length;

  if (authLoading) {
    return (
      <Flex minH="60vh" align="center" justify="center">
        <Spinner size="lg" color="purple.400" />
      </Flex>
    );
  }

  return (
    <Box as="section" pt={8} pb={16}>
      <VStack align="stretch" spacing={8}>
        {/* Title / Header */}
        <Flex justify="space-between" align="center" direction={{ base: "column", sm: "row" }} gap={4}>
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
                admin-dashboard
              </Heading>
            </HStack>
            <Text color="gray.400" fontSize="sm" fontFamily='"Fira Code", monospace'>
              Moderator view: leads, statistics, and queries
            </Text>
          </Box>

          <Button
            size="sm"
            variant="outline"
            borderColor="red.500"
            color="red.300"
            fontFamily='"Fira Code", monospace'
            borderRadius="0"
            _hover={{ bg: "red.900", color: "white" }}
            onClick={handleLogout}
          >
            Logout ✕
          </Button>
        </Flex>

        {/* Tab Selection */}
        <HStack spacing={4} borderBottom="1px solid" borderColor="gray.700" pb={3}>
          <Button
            size="sm"
            variant="ghost"
            color={activeTab === "quotes" ? "purple.400" : "gray.400"}
            fontFamily='"Fira Code", monospace'
            borderRadius="0"
            borderBottom={activeTab === "quotes" ? "2px solid" : "none"}
            borderColor="purple.400"
            px={4}
            py={2}
            onClick={() => {
              setActiveTab("quotes");
              setSearch("");
            }}
            _hover={{ color: "purple.300", bg: "transparent" }}
          >
            Quote Enquiries ({totalEnquiries})
          </Button>
          <Button
            size="sm"
            variant="ghost"
            color={activeTab === "downloads" ? "purple.400" : "gray.400"}
            fontFamily='"Fira Code", monospace'
            borderRadius="0"
            borderBottom={activeTab === "downloads" ? "2px solid" : "none"}
            borderColor="purple.400"
            px={4}
            py={2}
            onClick={() => {
              setActiveTab("downloads");
              setSearch("");
            }}
            _hover={{ color: "purple.300", bg: "transparent" }}
          >
            Resume Downloads ({totalDownloads})
          </Button>
        </HStack>

        {/* Stats Grid */}
        {activeTab === "quotes" ? (
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
            <StatCard title="TOTAL ENQUIRIES" value={totalEnquiries} />
            <StatCard title="WEB DEV SCOPE" value={webDevCount} />
            <StatCard title="HIGH BUDGET (>$5K)" value={highBudgetCount} />
            <StatCard title="LAST SYNCED" value={new Date().toLocaleTimeString()} />
          </SimpleGrid>
        ) : (
          <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
            <StatCard title="TOTAL RESUME DOWNLOADS" value={totalDownloads} />
            <StatCard title="EMAIL ADDRESS LEADS" value={downloads.filter(d => d.email).length} />
            <StatCard title="WHATSAPP / PHONE LEADS" value={downloads.filter(d => d.phone).length} />
          </SimpleGrid>
        )}

        {/* Filters and Searches */}
        <Box border="1px solid" borderColor="gray.600" bg="gray.900" p={5}>
          <Heading as="h2" fontSize="sm" color="white" fontFamily='"Fira Code", monospace' mb={4}>
            Search & Filter Settings
          </Heading>

          {activeTab === "quotes" ? (
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, keyword..."
                bg="gray.850"
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
              />

              <Box
                as="select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                h="36px"
                px={3}
                bg="gray.850"
                border="1px solid"
                borderColor="gray.600"
                color="white"
                fontFamily='"Fira Code", monospace'
                fontSize="xs"
                borderRadius="0"
                outline="none"
              >
                <option value="">All Project Types</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile Application">Mobile Application</option>
                <option value="E-Commerce System">E-Commerce System</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Consultancy & Code Audit">Consultancy & Code Audit</option>
                <option value="Other">Other Project Scope</option>
              </Box>

              <Box
                as="select"
                value={filterBudget}
                onChange={(e) => setFilterBudget(e.target.value)}
                h="36px"
                px={3}
                bg="gray.850"
                border="1px solid"
                borderColor="gray.600"
                color="white"
                fontFamily='"Fira Code", monospace'
                fontSize="xs"
                borderRadius="0"
                outline="none"
              >
                <option value="">All Budgets</option>
                <option value="< $1,000">Less than $1,000</option>
                <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                <option value="> $10,000">More than $10,000</option>
              </Box>
            </SimpleGrid>
          ) : (
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search download leads by name, email or WhatsApp number..."
              bg="gray.850"
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
            />
          )}
        </Box>

        {/* Requests List */}
        <Box>
          <Flex justify="space-between" align="center" mb={4}>
            <Heading as="h2" fontSize="md" color="white" fontFamily='"Fira Code", monospace'>
              {activeTab === "quotes" ? "Quote Enquiries List" : "CV Download Leads List"} ({activeTab === "quotes" ? filteredEnquiries.length : filteredDownloads.length})
            </Heading>
            <Button
              size="xs"
              variant="ghost"
              color="purple.300"
              fontFamily='"Fira Code", monospace'
              onClick={fetchData}
              disabled={loading}
              _hover={{ color: "purple.100", bg: "transparent" }}
            >
              Refresh ⟳
            </Button>
          </Flex>

          {loading ? (
            <Flex justify="center" align="center" py={12}>
              <Spinner color="purple.400" size="md" />
            </Flex>
          ) : activeTab === "quotes" ? (
            filteredEnquiries.length === 0 ? (
              <Box border="1px dashed" borderColor="gray.600" p={8} textAlign="center" color="gray.400">
                <Text fontFamily='"Fira Code", monospace' fontSize="sm">
                  No quote requests found matching current filters.
                </Text>
              </Box>
            ) : (
              filteredEnquiries.map((enquiry) => (
                <EnquiryRow key={enquiry.id} enquiry={enquiry} onDelete={handleEnquiryDelete} />
              ))
            )
          ) : (
            filteredDownloads.length === 0 ? (
              <Box border="1px dashed" borderColor="gray.600" p={8} textAlign="center" color="gray.400">
                <Text fontFamily='"Fira Code", monospace' fontSize="sm">
                  No download leads found matching current search.
                </Text>
              </Box>
            ) : (
              filteredDownloads.map((download) => (
                <DownloadRow key={download.id} download={download} onDelete={handleDownloadDelete} />
              ))
            )
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default Dashboard;
