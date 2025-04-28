import {
  Box,
  Button,
  // FormControl,
  // FormLabel,
  Input,
  VStack,
  // useColorModeValue,
  Heading,
  // InputGroup,
  // InputRightElement,
  // useToast,
  Flex,
  // Text,
  // useToastStyles,
  Fieldset,
  Field,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link as LinkIcon, ArrowRight, Check } from 'lucide-react';
import { useColorModeValue } from './ui/color-mode';
import { toaster } from "@/components/ui/toaster"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { typeLinkSchema } from '@/type';
import { linkSchema } from '@/schema/schemas';

const LinkForm = () => {

  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: zodResolver(linkSchema),
  });
  
  // const onSubmit = (data:typeLinkSchema) => {
  //   console.log(data);
  // }

  // const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // const toast = useToastStyles();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  // const location = useLocation();


  const onSubmit = (data:typeLinkSchema) => {    
    console.log(data);
    // console.log(window.location.hostname);
    const domain = window.location.hostname;

    toaster.create({
      title:"Link shortened successfully!",
      description: `Your new short URL: ${domain}/${'auto-gen'}`,
      type: "success",
      duration: 2000
    })
    
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={bgColor}
      borderColor={borderColor}
      boxShadow="md"
      p={6}
      mb={8}
      width="100%"
      position="relative"
      transition="all 0.2s"
      _hover={{ boxShadow: "lg", transform: "translateY(-2px)" }}
    >
      <VStack gap={5} >
        <Flex alignItems="center" width="100%">
          <Box
            bg="brand.500"
            p={2}
            borderRadius="md"
            color="white"
            mr={3}
          >
            <LinkIcon size={20} />
          </Box>
          <Heading size="md">Shorten a URL</Heading>
        </Flex>
        
        <Fieldset.Root> 

          <Fieldset.Content>
            <Field.Root size="lg" maxW="100%" required>
              <Field.Label>
                Long URL <Field.RequiredIndicator />
              </Field.Label>
              <Input
                type="url"
                placeholder="Paste your long URL here"
                size="lg"
                borderRadius="md"
                // isDisabled={isLoading || isSuccess}
                {...register("url", { required: true })}
              />
            </Field.Root>
          </Fieldset.Content>

          <Fieldset.Content>
            <Field.Root size="lg" maxW="100%">
              <Field.Label>Custom Alias (optional)</Field.Label>
              <Input
                type="text"
                placeholder="Choose a custom name"
                size="lg"
                borderRadius="md"
                // isDisabled={isLoading || isSuccess}
                {...register("alias")}
              />
            </Field.Root>
          </Fieldset.Content>

          <Button
            type="submit"
            // onClick={(e) => console.log(e) }
            colorScheme="brand.500"
            bg="brand.500"
            size="lg"
            width="100%"
            borderRadius="md"
            // isLoading={isLoading}
            // leftIcon={isSuccess ? <Check size={20} /> : <ArrowRight size={20} />}
            loadingText="Shortening..."
            variant={isSuccess ? "outline" : "solid"}
            _hover={isSuccess ? { bg: "green.50" } : undefined}
            color={isSuccess ? "green.500" : undefined}
            borderColor={isSuccess ? "green.500" : undefined}
          >
            {isSuccess ? "Link Shortened!" : "Shorten URL"}
          </Button>
        </Fieldset.Root>
        
      </VStack>
    </Box>
  );
};

export default LinkForm;