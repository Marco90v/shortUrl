import { useState } from 'react';
import { Box, Heading, VStack, Button, Text, HStack, Fieldset, Separator } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toaster } from "@/components/ui/toaster";
import { changePasswordSchema } from '@/schema/schemas';
import { typeChangePasswordSchema } from '@/type';
import { Save } from 'lucide-react';
import { changePassword } from '@/services/firebase';
import { statusToaster } from '@/utils/functions';
import { InputPassword } from '@/components/inputPassword';

const SettingsPage = () => {

  const { register, handleSubmit, reset, formState: { errors }, } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  
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
        bg="white"
        borderWidth="1px"
        borderColor="gray.200"
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
            <InputPassword label='Current Password' placeholder='Enter your current password' name='currentPassword' error={errors.currentPassword} register={register} disabled={isLoading} />
            <InputPassword label='New Password' placeholder='Enter your new password' name='newPassword' error={errors.newPassword} register={register} disabled={isLoading} />
            <InputPassword label='Confirm New Password' placeholder='Confirm your new password' name='confirmPassword' error={errors.confirmPassword} register={register} disabled={isLoading} />
            
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

export default SettingsPage;