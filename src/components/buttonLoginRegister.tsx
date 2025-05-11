import { Button } from "@chakra-ui/react";

interface ButtonLR {
  label:string;
  bg:string;
  isLoading:boolean;
}

function ButtonLR({label, bg, isLoading}:ButtonLR){
  return(
    <Button type="submit"
      bg={bg}
      w="100%" 
      size="lg"
      mt={4}
      disabled={isLoading}
    >
      {label}
    </Button>
  )
}

export default ButtonLR;