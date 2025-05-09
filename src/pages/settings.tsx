import { useState } from 'react';
import { Box, Heading, VStack, Input, Button, InputGroup, IconButton, Text, HStack, Fieldset, Field, Separator } from '@chakra-ui/react';
import { FieldErrors, useForm, UseFormRegister } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toaster } from "@/components/ui/toaster";
import { useColorModeValue } from '@/components/ui/color-mode';
import { changePasswordSchema } from '@/schema/schemas';
import { typeChangePasswordSchema } from '@/type';
import { Eye, EyeOff, Save } from 'lucide-react';
import { changePassword } from '@/services/firebase';
import { statusToaster } from '@/utils/functions';

interface InputChangePasswordProps{
  label:string;
  placeholder:string;
  register:UseFormRegister<typeChangePasswordSchema>;
  name:'currentPassword' | 'newPassword' | 'confirmPassword';
  errors:FieldErrors<{
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>;
  disabled:boolean;
}

interface ButtonShowProps {
  show:boolean;
  setShow:React.Dispatch<React.SetStateAction<boolean>>
}

const SettingsPage = () => {

  const { register, handleSubmit, reset, formState: { errors }, } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
    
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  const onSubmit = (data:typeChangePasswordSchema) => {
    setIsLoading(true);

    changePassword(data.newPassword).then((res:{code:string, message:string})=>{
      toaster.create({
        title: res.code,
        description: res.message,
        type: statusToaster(res.code),
        duration: 2000
      });
      setIsLoading(false);
      if(res.code !== "Error") reset();
    });
  };
  
  return (
    <>
      <Heading size="lg" mb={6}>Settings</Heading>
      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        bg={bgColor}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="lg"
        boxShadow="md"
        p={6}
      >
        <VStack gap={6} align="stretch">
          <Heading size="md">Change Password</Heading>
          <Text color="gray.600" fontSize="sm">
            Update your password to keep your account secure. We recommend using a strong, unique password.
          </Text>
          
          <Separator variant="solid" />

          <Fieldset.Root>
            <InputChangePassword label='Current Password' placeholder='Enter your current password' register={register} name='currentPassword' errors={errors} disabled={isLoading} />
            <InputChangePassword label='New Password' placeholder='Enter your new password' register={register} name='newPassword' errors={errors} disabled={isLoading} />
            <InputChangePassword label='Confirm New Password' placeholder='Confirm your new password' register={register} name='confirmPassword' errors={errors} disabled={isLoading} />
            
            <HStack justifyContent="flex-end">
              <Button
                type="submit"
                colorScheme="brand.500"
                bg="brand.500"
                loading={isLoading}
                loadingText="Updating..."
              >
                <Save size={18} />
                Update Password
              </Button>
            </HStack>
          </Fieldset.Root>

        </VStack>
      </Box>
    </>
  );
};

function InputChangePassword({label, placeholder, register, name, disabled, errors}:InputChangePasswordProps){
  const [show, setShow] = useState(false);
  return(
    <Fieldset.Content >
      <Field.Root invalid={!!errors[name]} required>
        <Field.Label>{label}<Field.RequiredIndicator /></Field.Label>
        <InputGroup endElement={<ButtonShow show={show} setShow={setShow} />} >
          <Input
            type={show ? "text" : "password"}
            placeholder={placeholder}
            disabled={disabled}
            {...register(name, { required: true })}
          />
        </InputGroup>
        <Field.ErrorText>{errors[name]?.message}</Field.ErrorText>
      </Field.Root>
    </Fieldset.Content>
  )
}

function ButtonShow({show, setShow}:ButtonShowProps){
  return(
    <IconButton
      aria-label={show ? "Hide password" : "Show password"}
      variant="ghost"
      onClick={() => setShow(!show)}
      size="sm"
    >
      {show ? <EyeOff size={18} /> : <Eye size={18} />}
    </IconButton>
  )
}

export default SettingsPage;