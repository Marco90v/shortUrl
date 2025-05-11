import { Flex, SimpleGrid, Stat } from "@chakra-ui/react";
import { BarChart, Link, TrendingUp } from "lucide-react";
import { useLinksStore } from "@/store/links";
import { useShallow } from "zustand/shallow";
import { LinkItem } from "@/type";

const domain = window.location.hostname;

const mostPopular = (links:LinkItem[]) => {
  if(links.length === 0) return 0;
  return domain + "/" + links.reduce((a, b) => a.clicks > b.clicks ? a : b).shortUrl;
}
const totalClicks = (links:LinkItem[]) => links.reduce((a, b) => a + b.clicks, 0);
const totalLinks = (links:LinkItem[]) => links.length;

const statBoxes = [
  { label: 'Total Links', value: totalLinks, icon: <Link size={20} />, iconBg: 'brand.500' },
  { label: 'Total Clicks', value: totalClicks, icon: <TrendingUp size={20} />, iconBg: 'green.500' },
  { label: 'Most Popular', value: mostPopular, icon: <BarChart size={20} />, iconBg: 'blue.500' }
]

function StatBox(){
  const { links } = useLinksStore(
    useShallow( (state => ({
      links: state.links,
    })))
  );

  return(
    <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} mb={8}>
      {statBoxes.map((stat, index) => (
        <Flex
          key={index}
          p={5}
          bg="white"
          borderWidth="1px"
          borderColor="gray.200"
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
            <Stat.Label fontSize={16} fontWeight={600} color={"black"}>{stat.value(links)}</Stat.Label>
          </Stat.Root>
        </Flex>
      ))}
    </SimpleGrid>
  )
}

export default StatBox;