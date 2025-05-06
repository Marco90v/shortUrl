import { Box, Button, Container, Heading, Text, VStack, Input, Fieldset, Field} from "@chakra-ui/react";
import { Link as L } from "@chakra-ui/react"
import { Link } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from "@/schema/schemas";
import { typeLoginSchema } from "@/type";
import { useColorModeValue } from "@/components/ui/color-mode";
import Password from "@/components/password";
import { Toaster } from "@/components/ui/toaster";

function Login() {

  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data:typeLoginSchema) => {
    console.log(data);
  }

  const bgColor = useColorModeValue('white', 'gray.800');
  const boxShadow = useColorModeValue('lg', 'dark-lg');

  return (
    <Container maxW="100vw" h="100vh" p={0} centerContent>
      <VStack
        wordSpacing={8}
        w={{ base: "90%", md: "450px" }}
        justify="center"
        h="100%"
      >
        <VStack wordSpacing={2} mb={4} alignItems="center" >
          <Box
           as="span" 
           display="inline-flex" 
           alignItems="center" 
           justifyContent="center" 
           bg="brand.500" 
           p={3} 
           borderRadius="full"
           color="white"
           mb={4}
           boxShadow="md"
          >
            <Link size={32} />
          </Box>
          <Heading size="3xl" textAlign="center" color="gray.800">
            URL Shortener
          </Heading>
          <Text color="gray.500" textAlign="center" fontSize="small">
            Sign in to manage your shortened links
          </Text>          
        </VStack>
        <Box
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          bg={bgColor}
          p={8}
          borderRadius="xl"
          boxShadow={boxShadow}
          w="100%"
          transition="transform 0.3s"
          _hover={{ transform: 'translateY(-4px)', boxShadow: 'xl' }}
        >
          <VStack wordSpacing={4} align="flex-start" w="100%">
            <Fieldset.Root size="lg" maxW="100%">
              <Fieldset.Content>
                <Field.Root invalid={!!errors.email}>
                  <Field.Label>Email</Field.Label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    size="lg"
                    borderRadius="md"
                    {...register("email", { required: true })}
                  />
                  <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                </Field.Root>

                <Password register={register} name="password" label="Password" error={errors.password} />

              </Fieldset.Content>

              <Button type="submit"
                bg="brand.500"
                w="100%" 
                size="lg"
                mt={4}
              >
                Sign In
              </Button>
            </Fieldset.Root>
          </VStack>
        </Box>
        <L href="/register" color="gray.500" fontSize="sm" mt={4}>
          Register
        </L>
      </VStack>
      <Toaster />
    </Container>
  )
}

export default Login
