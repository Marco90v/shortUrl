import { InputProps } from "@chakra-ui/react";

export const PUBLIC = 'public';
export const PRIVATE = 'private';

export const RUTES = {
  LOGIN: '/',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  SETTINGS: 'settings',
  REDIRECT: '/:shortId',
}

export const INPUT_EMAIL:InputProps = {
  type:"email",
  placeholder:"your@email.com",
  borderRadius:"md",
  size:"lg",
}