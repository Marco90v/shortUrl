import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import { Provider } from './components/ui/provider.tsx'
import { ChakraProvider } from '@chakra-ui/react'
import { system } from './theme.ts'
// import { Provider } from "@/components/ui/provider.tsx"


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={system} >
      <App />
    </ChakraProvider>
  </StrictMode>,
)
