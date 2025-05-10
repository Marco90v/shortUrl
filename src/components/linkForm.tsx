import { useState } from 'react';
import { Box, Button, Input, VStack, Heading, Flex, Fieldset, Field } from '@chakra-ui/react';
import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link as LinkIcon, ArrowRight, Check } from 'lucide-react';
import { useShallow } from 'zustand/shallow';
import { addLinkFirebase } from '@/services/firebase';
import { useColorModeValue } from '@/components/ui/color-mode';
import { toaster } from "@/components/ui/toaster"
import { useAuthStore } from '@/store/auth';
import { useLinksStore } from '@/store/links';
import { shortenUrl } from '@/utils/urlShortener';
import { statusToaster } from '@/utils/functions';
import { linkSchema } from '@/schema/schemas';
import { LinkItem, typeLinkSchema } from '@/type';

interface InputUrlProps{
  label:string;
  required:boolean;
  placeholder:string;
  isLoading:boolean;
  isSuccess:boolean;
  register:UseFormRegister<typeLinkSchema>;
  name:"alias"|"url";
  errors:FieldErrors<{
    url: string;
    alias?: string | undefined;
  }>;
  type:'url'|'text';
}

const LinkForm = () => {

  const {user} = useAuthStore(
    useShallow( (state => ({
      user: state.user,
    })))
  );

  const {addLink} = useLinksStore(
    useShallow( (state => ({
      addLink: state.addLink,
    })))
  );

  const { register, handleSubmit, reset, formState: { errors }, } = useForm({
    resolver: zodResolver(linkSchema),
  });
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const onSubmit = async (data:typeLinkSchema) => {    
    setIsLoading(true);

    const currentDate = new Date().toJSON().slice(0, 10);
    const short = shortenUrl();
    const ID = crypto.randomUUID();

    const newLink:LinkItem = {
      id: ID,
      originalUrl: data.url,
      shortUrl: short,
      createdAt: currentDate,
      clicks: 0,
      alias: data.alias ?? "",
    };

    if(user?.email){
      const rest = await addLinkFirebase(user.email, newLink);
      toaster.create({
        title: rest.code,
        description: rest.message,
        type: statusToaster(rest.code),
        duration: 2000
      });
      setIsLoading(false);
      if(rest.code !== 'Error'){
        addLink(newLink);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 2000);
        reset();
      }
    }
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
            disabled={isLoading || isSuccess}
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
      <Field.Root maxW="100%" required={required}>
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