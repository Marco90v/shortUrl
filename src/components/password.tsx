import { Field, IconButton, Input, InputGroup } from "@chakra-ui/react"
import { Eye, EyeOff } from "lucide-react"
import { useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { typeLoginSchema } from "@/type";

interface PasswordProps {
  register: UseFormRegister<typeLoginSchema>;
  name: "password" | "confirm";
  label: string;
  error?: FieldError | undefined;
}

function Password({register, name, label, error}:PasswordProps){

  const [showPassword, setShowPassword] = useState(false);

  return(
    <Field.Root invalid={!!error}>
      <Field.Label>{label}</Field.Label>
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
          {...register(name, { required: true })}
        />
      </InputGroup>
      <Field.ErrorText>{error?.message}</Field.ErrorText>
    </Field.Root>
  )
}

export default Password