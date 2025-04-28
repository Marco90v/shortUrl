import LinkForm from "@/components/linkForm";
import LinksList from "@/components/linksList";
import Navbar from "@/components/navbar";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Toaster } from "@/components/ui/toaster";
import { Box, Container, Flex, FormatNumber, Heading, SimpleGrid, Stat, StatHelpText } from "@chakra-ui/react";
import { Link, BarChart, TrendingUp } from 'lucide-react';

const statBoxes = [
  { 
    label: 'Total Links', 
    value: '32', 
    helpText: '+3 this week', 
    icon: <Link size={20} />,
    iconBg: 'brand.500' 
  },
  { 
    label: 'Total Clicks', 
    value: '4.521', 
    helpText: '+12% from last month', 
    icon: <TrendingUp size={20} />,
    iconBg: 'green.500'
  },
  { 
    label: 'Most Popular', 
    value: 'shrt.ly/tech1', 
    helpText: '1,245 clicks', 
    icon: <BarChart size={20} />,
    iconBg: 'blue.500'
  }
];


function Dashboard(){

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');


  return(
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      <Container maxW="container.xl" py={8}>
        <Box >
          <Heading size="lg" mb={6}>Dashboard</Heading>
          
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
            {statBoxes.map((stat, index) => (
              <Flex
                key={index}
                p={5}
                bg={bgColor}
                borderWidth="1px"
                borderColor={borderColor}
                borderRadius="lg"
                boxShadow="sm"
                alignItems="center"
                transition="all 0.2s"
                _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
              >
                <Flex
                  bg={stat.iconBg}
                  p={3}
                  borderRadius="md"
                  color="white"
                  mr={4}
                  alignItems="center"
                  justifyContent="center"
                >
                  {stat.icon}
                </Flex>
                <Stat.Root>
                  <Stat.Label>{stat.label}</Stat.Label>
                  <Stat.Label fontSize={22} fontWeight={600} color={"black"}>{stat.value}</Stat.Label>
                  {/* <Stat.Number>{stat.value}</Stat.Number> */}
                  {/* <FormatNumber value={stat.value} /> */}
                  {/* <StatHelpText>{stat.helpText}</StatHelpText> */}
                </Stat.Root>
              </Flex>
            ))}
          </SimpleGrid>
        
          <LinkForm />
          <LinksList />
        </Box>
      </Container>
      <Toaster />
    </Box>
  )
}

export default Dashboard;