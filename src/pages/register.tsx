import { Box, Container, Heading, Text, VStack, Input, Fieldset, Field} from "@chakra-ui/react";
import { Link as L } from "@chakra-ui/react"
import { Link } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from "@/schema/schemas";
import { typeRegisterSchema } from "@/type";
import { useColorModeValue } from "@/components/ui/color-mode";
import { createUser } from "@/services/firebase";
import { toaster, Toaster } from "@/components/ui/toaster";
import { InputPassword } from "@/components/inputPassword";
import { useState } from "react";
import ButtonLR from "@/components/buttonLoginRegister";
import { INPUT_EMAIL } from "@/utils/const";

function Register() {

  const { register, handleSubmit, reset, formState: { errors }, } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  
  const onSubmit = async (data:typeRegisterSchema) => {
    setIsLoading(true);
    const user = await createUser(data.email, data.password);
    setIsLoading(false);
    if(user.code === "Create"){
      reset();
    }
    toaster.create({
      title: user.code,
      description: user.message,
      duration: 5000,
      type: user.code === "Error" ? "error" : "success",
    });

  }

  const bgColor = useColorModeValue('white', 'gray.800');
  const boxShadow = useColorModeValue('lg', 'dark-lg');

  return (
    <Container maxW="100vw" h="100vh" p={0} bg="gray.50"  centerContent>
      <VStack
        gap={8}
        w={{ base: "90%", md: "450px" }}
        justify="center"
        h="100%"
      >
        <VStack gap={2} mb={4} alignItems="center" >
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
                <Field.Root invalid={!!errors.email} required>
                  <Field.Label>Email <Field.RequiredIndicator /></Field.Label>
                  <Input
                    {...INPUT_EMAIL}
                    disabled={isLoading}
                    {...register("email", { required: true })}
                  />
                  <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                </Field.Root>
                <InputPassword placeholder="Enter your password" name="password" label="Password" disabled={isLoading} error={errors.password} register={register} />
                <InputPassword placeholder="Confirm your password" name="confirm" label="Confirm" disabled={isLoading} error={errors.confirm} register={register} />
              </Fieldset.Content>
              <ButtonLR label="Create" bg="green.500" isLoading={isLoading} />
            </Fieldset.Root>
          </VStack>
        </Box>
        <L href="/" color="gray.500" fontSize="sm" mt={4}>
          Login
        </L>
      </VStack>
      <Toaster />
    </Container>
  )
}

export default Register
