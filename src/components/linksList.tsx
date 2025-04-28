import {
  Box,
  Table,
  // Thead,
  // Tbody,
  // Tr,
  // Th,
  // Td,
  Badge,
  IconButton,
  Menu,
  // MenuButton,
  // MenuList,
  MenuItem,
  // useColorModeValue,
  Text,
  Flex,
  Input,
  InputGroup,
  // InputLeftElement,
  HStack,
  Button,
  Portal,
  // useToast
} from '@chakra-ui/react';
import { MoreVertical, Copy, Pencil, Trash2, Search, ExternalLink } from 'lucide-react';
import { useState } from 'react';
// import { LinkItem } from '../types';
import { toaster } from "@/components/ui/toaster"
import { useColorModeValue } from './ui/color-mode';

interface LinkItem {
  id: string,
  originalUrl: string,
  shortUrl: string,
  createdAt: string,
  clicks: number
}

// Sample data for the design
const SAMPLE_LINKS: LinkItem[] = [
  {
    id: '1',
    originalUrl: 'https://www.verylongwebsitename.com/some/extremely/long/path/to/article/about/technology',
    shortUrl: 'shrt.ly/tech1',
    createdAt: '2023-05-15',
    clicks: 1245
  },
  {
    id: '2',
    originalUrl: 'https://www.example.com/blog/how-to-create-short-urls',
    shortUrl: 'shrt.ly/blog',
    createdAt: '2023-06-22',
    clicks: 873
  },
  {
    id: '3',
    originalUrl: 'https://www.longwebsiteaddress.com/products/special-offer',
    shortUrl: 'shrt.ly/offer',
    createdAt: '2023-07-10',
    clicks: 2184
  },
  {
    id: '4',
    originalUrl: 'https://www.example.org/documentation/advanced-features',
    shortUrl: 'shrt.ly/docs',
    createdAt: '2023-08-05',
    clicks: 642
  },
  {
    id: '5',
    originalUrl: 'https://www.examplecompany.co/contact/customer-support',
    shortUrl: 'shrt.ly/help',
    createdAt: '2023-09-18',
    clicks: 397
  }
];

const LinksList = () => {
  const [links] = useState<LinkItem[]>(SAMPLE_LINKS);
  const [searchQuery, setSearchQuery] = useState('');
  // const toast = useToast();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleCopyLink = (shortUrl: string) => {
    // This would normally copy to clipboard
    // toast({
    //   title: "Link copied!",
    //   description: `${shortUrl} has been copied to clipboard.`,
    //   status: "success",
    //   duration: 2000,
    //   isClosable: true,
    //   position: "top",
    // });
    toaster.create({
      title:"Link copied!",
      description: `${shortUrl} has been copied to clipboard.`,
      type: "success",
      duration: 2000,
      position: "top",
      isClosable: true,
    })
  };

  const filteredLinks = links.filter(link => 
    link.originalUrl.toLowerCase().includes(searchQuery.toLowerCase()) ||
    link.shortUrl.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={bgColor}
      borderColor={borderColor}
      boxShadow="sm"
      w="100%"
    >
      <Flex 
        p={4} 
        borderBottomWidth="1px" 
        borderColor={borderColor}
        justify="space-between"
        align="center"
        wrap="wrap"
        gap={3}
      >
        <Text fontSize="lg" fontWeight="bold">Your Shortened Links</Text>
        
        <InputGroup maxW="300px" startElement={<Search size={18} color="gray" />}>
          {/* <InputLeftElement pointerEvents="none">
            <Search size={18} color="gray.300" />
          </InputLeftElement> */}
          <Input 
            placeholder="Search links..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="md"
          />
        </InputGroup>
      </Flex>
      
      <Box overflowX="auto">
        <Table.Root variant="line">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader fontWeight={'semibold'} color={'gray.500'}>Original URL</Table.ColumnHeader>
              <Table.ColumnHeader fontWeight={'semibold'} color={'gray.500'}>Short URL</Table.ColumnHeader>
              <Table.ColumnHeader fontWeight={'semibold'} color={'gray.500'}>Created</Table.ColumnHeader>
              <Table.ColumnHeader fontWeight={'semibold'} color={'gray.500'}>Clicks</Table.ColumnHeader>
              <Table.ColumnHeader fontWeight={'semibold'} color={'gray.500'} width="80px">Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {filteredLinks.map((link) => (
              <Table.Row key={link.id} _hover={{ bg: "gray.50" }}>
                <Table.Cell maxW="300px" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                  <HStack gap={2}>
                    <Text maxW="90%" overflow="hidden">{link.originalUrl}</Text>
                    <IconButton
                      aria-label="Open original link"
                      // icon={<ExternalLink size={14} />}
                      size="xs"
                      variant="ghost"
                    >
                      <ExternalLink size={14} />
                    </IconButton>
                  </HStack>
                </Table.Cell>
                <Table.Cell fontWeight="medium" color="brand.500">
                  {link.shortUrl}
                </Table.Cell>
                <Table.Cell>{link.createdAt}</Table.Cell>
                <Table.Cell >
                  <Badge bg={link.clicks > 1000 ? "green.200" : "blue.200"} borderRadius="full" px={2}>
                    {link.clicks.toLocaleString()}
                  </Badge>
                </Table.Cell>
                <Table.Cell>

                  <Menu.Root>
                    
                    <Menu.Trigger asChild>
                      <Button variant="ghost" size="xs">
                        <MoreVertical size={16} />
                      </Button>
                    </Menu.Trigger>

                    <Portal>
                      <Menu.Positioner>
                        <Menu.Content padding="0">
                          <Menu.Item value="copy" cursor="pointer">
                              <Copy size={16} />
                              Copy Link
                          </Menu.Item>
                          <Menu.Item value="edit" cursor="pointer">
                              <Pencil size={16} />
                              Edit
                          </Menu.Item>
                          <Menu.Item value="delete" color="red.500" _hover={{ bg: "red.50" }} cursor="pointer">
                              <Trash2 size={16} />
                              Delete
                          </Menu.Item>
                        </Menu.Content>
                      </Menu.Positioner>
                    </Portal>

                  </Menu.Root>



                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
};

export default LinksList;