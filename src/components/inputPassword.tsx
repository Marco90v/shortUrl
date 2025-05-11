import { typeChangePasswordSchema } from "@/type";
import { Field, Fieldset, IconButton, Input, InputGroup } from "@chakra-ui/react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface InputPasswordProps{
  label:string;
  placeholder:string;
  register:UseFormRegister<typeChangePasswordSchema>;
  disabled:boolean;
  name:string;
  error:FieldError | undefined;
}

interface ButtonShowProps {
  show:boolean;
  setShow:React.Dispatch<React.SetStateAction<boolean>>
}

function InputPassword({label, name, error, placeholder, register, disabled}:InputPasswordProps){
  const [show, setShow] = useState(false);
  return(
    <Fieldset.Content >
      <Field.Root invalid={!!error} required>
        <Field.Label>{label}<Field.RequiredIndicator /></Field.Label>
          <InputGroup endElement={<ButtonShow show={show} setShow={setShow} />} >
            <Input
              size="lg"
              borderRadius="md"
              type={show ? "text" : "password"}
              placeholder={placeholder}
              disabled={disabled}
              {...register(name, { required: true })}
            />
          </InputGroup>
          <Field.ErrorText>{error?.message}</Field.ErrorText>
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

export { InputPassword, ButtonShow }