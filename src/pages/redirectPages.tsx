import Loading from "@/components/loading";
import { getOriginalLink } from "@/services/firebase";
import { Container, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function RedirectPages(){
  const { shortId } = useParams();
  const [link, setlink] = useState(true);
  
  const getLink = async (shortId:string | undefined) => {
    if(shortId === undefined) return;
    getOriginalLink(shortId).then((res:{linkOriginal:string|null})=>{
      if(res.linkOriginal){
        window.location.href = res.linkOriginal;
      }else{
        setlink(false);
      }
    });
  }

  useEffect(() => {
    getLink(shortId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if(link) return <Loading />
  return (
    <Container maxW="100vw" h="100vh" p={0} bg="gray.50" centerContent>
      <VStack
        gap={8}
        w={{ base: "90%", md: "450px" }}
        justify="center"
        h="100%"
      >
        <VStack gap={2} mb={4} alignItems="center" >
          <Text color="gray.500" textAlign="center" fontSize="xl">
            Link not found
          </Text>          
        </VStack>
      </VStack>
    </Container>
  )
}
export default RedirectPages;