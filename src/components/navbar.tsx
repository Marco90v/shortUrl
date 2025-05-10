import { Box, Flex, Text, IconButton, Button, Stack, useDisclosure, Collapsible, Link as L} from '@chakra-ui/react';
import { Menu, X, Link, Settings, House } from 'lucide-react';
import { useColorModeValue } from './ui/color-mode'
import { sign_Out } from '@/services/firebase';
import { useAuthStore } from '@/store/auth';
import { useShallow } from 'zustand/shallow';
import { useLinksStore } from '@/store/links';

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <House size={16} />
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: <Settings size={16} />
  }
];

const ButtonSignOut = () => {
  const {setUser} = useAuthStore(
    useShallow( (state => ({
      setUser: state.setUser,
    })))
  );
  const signOut = () => {
    sign_Out();
    setUser(null);
    useLinksStore.persist.clearStorage();
    useAuthStore.persist.clearStorage();
  }
  return(
    <Button
      // as={RouterLink}
      // to="/"
      display={{ base: 'none', md: 'inline-flex' }} 
      fontSize={'sm'}
      fontWeight={600}
      color={'white'}
      bg={'red.400'}
      _hover={{
        bg: 'red.500',
      }}
      onClick={signOut}
    >
      Sign Out
    </Button>
  )
}

const Navbar = () => {

  const { open, onToggle } = useDisclosure();
  
  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        boxShadow="sm"
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </IconButton>
        </Flex>
        
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Flex 
            // as={RouterLink} 
            // to="/dashboard"
            alignItems="center"
            _hover={{ textDecoration: 'none' }}
          >
            <Box 
              as="span" 
              display="inline-flex" 
              alignItems="center" 
              justifyContent="center" 
              bg="brand.500" 
              p={1.5} 
              borderRadius="full"
              color="white"
              mr={2}
            >
              <Link size={20} />
            </Box>
            <Text
              textAlign={{ base: 'center', md: 'left' }}
              fontFamily={'heading'}
              color={useColorModeValue('gray.800', 'white')}
              fontWeight="bold"
            >
              URL Shortener
            </Text>
          </Flex>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          gap={6}
        >          
          <ButtonSignOut />
        </Stack>
      </Flex>
      <Collapsible.Root open={open}>
        <Collapsible.Content>
          <MobileNav />
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
};

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  
  return (
    <Stack direction={'row'} gap={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Box
            p={2}
            fontSize={'sm'}
            fontWeight={500}
            color={linkColor}
          >
            <L
              alignContent={'center'}
              alignItems={'center'}
              _hover={{
                textDecoration: 'none',
                color: linkHoverColor,
              }}
              href={navItem.href ?? '#'}
            >
              {navItem.icon}
              {navItem.label}
            </L>
          </Box>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      <Button
        // as={RouterLink}
        // to="/"
        // display={{ base: 'none', md: 'inline-flex' }} 
        fontSize={'sm'}
        fontWeight={600}
        color={'white'}
        bg={'red.400'}
        _hover={{
          bg: 'red.500',
        }}
      >
        Sign Out
      </Button>
    </Stack>
  );
};

const MobileNavItem = ({ label,icon, href }: { label: string; icon:React.JSX.Element; href: string }) => {
  // console.log(href)
  return (
    <Stack gap={4}>
      <Box
        py={2}
        // as={RouterLink}
        // to={href ?? '#'}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: 'none',
        }}
      >
        <L  
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
          alignContent={'center'}
          alignItems={'center'}
          flexDirection={'row'}
          display={'flex'}
          gap={2}
          href={href ?? '#'}
        >
          {icon}
          {label}
        </L>
      </Box>
    </Stack>
  );
};

export default Navbar;