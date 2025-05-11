import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  globalCss: {
    "html, body": {
      margin: 0,
      padding: 0,
      bg: "gray.50",
    },
  },
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#f0e7ff' },
          100: { value: '#d1c2ff' },
          200: { value: '#b39dff' },
          300: { value: '#9579ff' },
          400: { value: '#7654ff' },
          500: { value: '#5a3be6' },
          600: { value: '#4931b3' },
          700: { value: '#382580' },
          800: { value: '#27194d' },
          900: { value: '#160c1a' },
        },
        accent: {
          50: { value: '#e0f7ff' },
          100: { value: '#b8e8ff' },
          200: { value: '#8fd9ff' },
          300: { value: '#66cbff' },
          400: { value: '#3dbcfe' },
          500: { value: '#24a3e5' },
          600: { value: '#1a7fb2' },
          700: { value: '#115b80' },
          800: { value: '#08384d' },
          900: { value: '#00151b' },
        },
      },
      fonts: {
        heading: { value: 'system-ui, sans-serif' },
        body: { value: 'system-ui, sans-serif' },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
