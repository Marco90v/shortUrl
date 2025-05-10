import { Flex, SimpleGrid, Stat } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { BarChart, Link, TrendingUp } from "lucide-react";
import { useLinksStore } from "@/store/links";
import { useShallow } from "zustand/shallow";

const domain = window.location.hostname;

function StatBox(){
  const { links } = useLinksStore(
      useShallow( (state => ({
        links: state.links,
      })))
    );
  
    const statBoxes = [
      { label: 'Total Links', value: links.length, icon: <Link size={20} />, iconBg: 'brand.500' },
      { label: 'Total Clicks', value: links.reduce((a, b) => a + b.clicks, 0), icon: <TrendingUp size={20} />, iconBg: 'green.500' },
      { label: 'Most Popular', value: domain + "/" + links.reduce((a, b) => a.clicks > b.clicks ? a : b).shortUrl, icon: <BarChart size={20} />, iconBg: 'blue.500' }
    ]
  
    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');

  return(
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
            <Stat.Label fontSize={16} fontWeight={600} color={"black"}>{stat.value}</Stat.Label>
          </Stat.Root>
        </Flex>
      ))}
    </SimpleGrid>
  )
}

export default StatBox;