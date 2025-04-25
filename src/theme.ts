import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
         brand: {
          50: '#f0e7ff',
          100: '#d1c2ff',
          200: '#b39dff',
          300: '#9579ff',
          400: '#7654ff',
          500: '#5a3be6', // primary
          600: '#4931b3',
          700: '#382580',
          800: '#27194d',
          900: '#160c1a',
        },
        accent: {
          50: '#e0f7ff',
          100: '#b8e8ff',
          200: '#8fd9ff',
          300: '#66cbff',
          400: '#3dbcfe',
          500: '#24a3e5', // accent
          600: '#1a7fb2',
          700: '#115b80',
          800: '#08384d',
          900: '#00151b',
        },
      },
      fonts:{
        heading: 'system-ui, sans-serif',
        body: 'system-ui, sans-serif',
      },
      styles: {
        global: {
          body: {
            bg: 'gray.50',
          },
        },
      },
      components:{
        Button: {
          baseStyle: {
            fontWeight: 'medium',
            borderRadius: 'md',
          },
          variants: {
            solid: {
              bg: 'brand.500',
              color: 'white',
              _hover: {
                bg: 'brand.600',
                transform: 'translateY(-2px)',
                boxShadow: 'md',
              },
              _active: {
                bg: 'brand.700',
                transform: 'translateY(0)',
              },
              transition: 'all 0.2s',
            },
          },
        },
        Card: {
          baseStyle: {
            container: {
              borderRadius: 'lg',
              boxShadow: 'md',
              transition: 'transform 0.2s, box-shadow 0.2s',
              _hover: {
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              },
            },
          },
        },
      }
    },
  },
})

export const system = createSystem(defaultConfig, config)