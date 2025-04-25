import { Box, Button, Container, Heading, Text, VStack, Input, InputGroup, IconButton, Fieldset, Field} from "@chakra-ui/react";
import { Link, Eye, EyeOff  } from 'lucide-react';
import { useColorModeValue } from "./components/ui/color-mode";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

type typeLoginSchema = z.infer<typeof loginSchema>;

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(30),
})

function App() {

  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

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

                <Field.Root invalid={!!errors.password}>
                  <Field.Label>Password</Field.Label>
                  <InputGroup bgSize={"lg"}
                    endElement={
                      <IconButton
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        h="1.75rem"
                        size="sm"
                        variant="ghost"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </IconButton>
                    }
                  >
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      borderRadius="md"
                      {...register("password", { required: true })}
                    />
                  </InputGroup>
                  <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
                </Field.Root>

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
      </VStack>
    </Container>
  )
}

export default App
