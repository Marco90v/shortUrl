import { Box, Button, Input, VStack, Heading, Flex, Fieldset, Field } from '@chakra-ui/react';
import { useState } from 'react';
import { Link as LinkIcon, ArrowRight, Check } from 'lucide-react';
import { useColorModeValue } from './ui/color-mode';
import { toaster } from "@/components/ui/toaster"
import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { typeLinkSchema } from '@/type';
import { linkSchema } from '@/schema/schemas';

interface InputUrlProps{
  label:string;
  required:boolean;
  placeholder:string;
  isLoading:boolean;
  isSuccess:boolean;
  register:UseFormRegister<typeLinkSchema>;
  name:string;
  errors:FieldErrors;
  type:'url'|'text';
}

const LinkForm = () => {

  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: zodResolver(linkSchema),
  });
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const onSubmit = (data:typeLinkSchema) => {    
    setIsLoading(true);
    console.log(data);
    const domain = window.location.hostname;

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      toaster.create({
        title:"Link shortened successfully!",
        description: `Your new short URL: ${domain}/${'auto-gen'}`,
        type: "success",
        duration: 2000
      });
      setTimeout(() => {
        setIsSuccess(false);
      }, 1000);

    }, 3000);
    
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
          <InputUlr type='url' label='Long URL' required={true} placeholder='Paste your long URL here' name='url' isLoading={isLoading} isSuccess={isSuccess} register={register} errors={errors} />
          <InputUlr type='text' label='Custom Alias (optional)' required={false} placeholder='Choose a custom name' name='alias' isLoading={isLoading} isSuccess={isSuccess} register={register} errors={errors} />

          <Button
            type="submit"
            colorScheme="brand.500"
            bg="brand.500"
            size="lg"
            width="100%"
            borderRadius="md"
            loading={isLoading}
            loadingText="Shortening..."
            variant={isSuccess ? "outline" : "solid"}
            _hover={isSuccess ? { bg: "green.50" } : undefined}
            color={isSuccess ? "green.500" : undefined}
            borderColor={isSuccess ? "green.500" : undefined}
          >
            {isSuccess ? <Check size={20} /> : <ArrowRight size={20} />}
            {isSuccess ? "Link Shortened!" : "Shorten URL"}
          </Button>
        </Fieldset.Root>
        
      </VStack>
    </Box>
  );
};

function InputUlr({label, required, type, placeholder, isLoading, isSuccess, register, name, errors}:InputUrlProps){
  return(
    <Fieldset.Content>
      <Field.Root size="lg" maxW="100%" required={required}>
        <Field.Label>
          {label} <Field.RequiredIndicator />
        </Field.Label>
        <Input
          type={type}
          placeholder={placeholder}
          size="lg"
          borderRadius="md"
          disabled={isLoading || isSuccess}
          {...register(name, { required: required })}
        />
        <Field.ErrorText>{errors[name]?.message}</Field.ErrorText>
      </Field.Root>
    </Fieldset.Content>
  )
}

export default LinkForm;