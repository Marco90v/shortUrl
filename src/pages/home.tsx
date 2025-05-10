import LinkForm from "@/components/linkForm";
import LinksList from "@/components/linksList";
import StatBox from "@/components/stat";
import { Box, Heading} from "@chakra-ui/react";

function Home(){
  return(
    <Box >
      <Heading size="lg" mb={6}>Dashboard</Heading>
      <StatBox />    
      <LinkForm />
      <LinksList />
    </Box>
  )
}

export default Home;