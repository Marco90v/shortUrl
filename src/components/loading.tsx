import { Container, Spinner, VStack } from "@chakra-ui/react";

function Loading() {
  return (
    <Container maxW="100vw" h="100vh" p={0} centerContent>
      <VStack 
        wordSpacing={8}
        w={{ base: "90%", md: "450px" }}
        justify="center"
        h="100%"
      >
        <Spinner />
      </VStack>
    </Container>
  )
}

export default Loading;