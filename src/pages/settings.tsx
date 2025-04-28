import {
  Box,
  Container,
  Heading,
  VStack,
  // FormControl,
  // FormLabel,
  Input,
  Button,
  // useColorModeValue,
  InputGroup,
  // InputRightElement,
  IconButton,
  // Divider,
  Text,
  // useToast,
  HStack,
  Fieldset,
  Field,
  Separator,
  // Toaster
} from '@chakra-ui/react';
import { useState } from 'react';
import Navbar from '@/components/navbar';
import { Eye, EyeOff, Save } from 'lucide-react';
import { Toaster, toaster } from "@/components/ui/toaster";
import { useColorModeValue } from '@/components/ui/color-mode';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordSchema } from '@/schema/schemas';
import { typeChangePasswordSchema } from '@/type';

const SettingsPage = () => {

  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // const toast = useToast();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  const onSubmit = (data:typeChangePasswordSchema) => {

    console.log(data);    

    toaster.create({
      title: "Password updated successfully",
      type: "success",
      duration: 3000,
    });
  };
  
  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      
      <Container maxW="container.md" py={8}>
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

              <Fieldset.Content >

                <Field.Root invalid={!!errors.currentPassword} required>
                  <Field.Label>
                    Current Password
                    <Field.RequiredIndicator />
                  </Field.Label>
                  <InputGroup
                    endElement={
                      <IconButton
                        aria-label={showCurrentPassword ? "Hide password" : "Show password"}
                        variant="ghost"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        size="sm"
                      >
                        {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </IconButton>
                    }
                  >
                    <Input
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="Enter your current password"
                      {...register("currentPassword", { required: true })}
                    />
                  </InputGroup>
                  <Field.ErrorText>{errors.currentPassword?.message}</Field.ErrorText>
                </Field.Root>
              </Fieldset.Content>
              
              <Fieldset.Content >
                <Field.Root invalid={!!errors.newPassword} required>
                  <Field.Label>
                    New Password
                    <Field.RequiredIndicator />
                  </Field.Label>
                  <InputGroup
                    endElement={
                      <IconButton
                        aria-label={showNewPassword ? "Hide password" : "Show password"}
                        variant="ghost"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        size="sm"
                      >
                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </IconButton>
                    }
                  >
                    <Input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter your new password"
                      {...register("newPassword", { required: true })}
                    />
                  </InputGroup>
                  <Field.ErrorText>{errors.newPassword?.message}</Field.ErrorText>
                </Field.Root>
              </Fieldset.Content>
              
              <Fieldset.Content >
                <Field.Root invalid={!!errors.confirmPassword} required>
                  <Field.Label>
                    Confirm New Password
                    <Field.RequiredIndicator />
                  </Field.Label>
                  <InputGroup
                    endElement={
                      <IconButton
                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        variant="ghost"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        size="sm"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </IconButton>
                    }
                  >
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your new password"
                      {...register("confirmPassword", { required: true })}
                    />
                  </InputGroup>
                  <Field.ErrorText>{errors.confirmPassword?.message}</Field.ErrorText>
                </Field.Root>
              </Fieldset.Content>
              
              <HStack justifyContent="flex-end">
                <Button
                  type="submit"
                  colorScheme="brand.500"
                  bg="brand.500"
                  disabled={isLoading}
                  loadingText="Updating..."
                >
                  <Save size={18} />
                  Update Password
                </Button>
              </HStack>

            </Fieldset.Root>

          </VStack>
        </Box>
      </Container>
      <Toaster />
    </Box>
  );
};

export default SettingsPage;