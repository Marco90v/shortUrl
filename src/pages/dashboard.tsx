import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router";

function Dashboard () {
  
  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      <Container py={8}>
        <Outlet />
      </Container>
      <Toaster />
    </Box>
  );
};

export default Dashboard;