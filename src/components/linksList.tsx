import { Box, Table, Badge, Menu, Text, Flex, Input, InputGroup, HStack, Button, Portal, Link, Clipboard } from '@chakra-ui/react';
import { MoreVertical, Copy, Pencil, Trash2, Search, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';
import { toaster } from "@/components/ui/toaster";
import { useColorModeValue } from './ui/color-mode';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { searchSchema } from '@/schema/schemas';
import { LinkItem } from '@/type';
import { useAuthStore } from '@/store/auth';
import { useShallow } from 'zustand/shallow';
import { getData } from '@/services/firebase';
import { useLinksStore } from '@/store/links';

// interface LinkItem {
//   id: string,
//   originalUrl: string,
//   shortUrl: string,
//   createdAt: string,
//   clicks: number,
//   alias?: string,
// }

// Sample data for the design
// const SAMPLE_LINKS: LinkItem[] = [
//   {
//     id: '1',
//     originalUrl: 'https://www.verylongwebsitename.com/some/extremely/long/path/to/article/about/technology',
//     shortUrl: 'shrt.ly/tech1',
//     createdAt: '2023-05-15',
//     clicks: 1245
//   },
//   {
//     id: '2',
//     originalUrl: 'https://www.example.com/blog/how-to-create-short-urls',
//     shortUrl: 'shrt.ly/blog',
//     createdAt: '2023-06-22',
//     clicks: 873
//   },
//   {
//     id: '3',
//     originalUrl: 'https://www.longwebsiteaddress.com/products/special-offer',
//     shortUrl: 'shrt.ly/offer',
//     createdAt: '2023-07-10',
//     clicks: 2184
//   },
//   {
//     id: '4',
//     originalUrl: 'https://www.example.org/documentation/advanced-features',
//     shortUrl: 'shrt.ly/docs',
//     createdAt: '2023-08-05',
//     clicks: 642
//   },
//   {
//     id: '5',
//     originalUrl: 'https://www.examplecompany.co/contact/customer-support',
//     shortUrl: 'shrt.ly/help',
//     createdAt: '2023-09-18',
//     clicks: 397
//   }
// ];

const domain = window.location.hostname;

const LinksList = () => {

  const {user} = useAuthStore(
    useShallow( (state => ({
      user: state.user,
    })))
  );
  const {links, setLinks} = useLinksStore(
    useShallow( (state => ({
      links: state.links,
      setLinks: state.setLinks,
    })))
  );

  const { watch, register } = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: '',
    },
  });

  const watchSearch = watch("search");
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    if(user?.email){
      getData(user?.email).then((res:{code:string, message:string, links:LinkItem[]})=>{
        setLinks(res.links);
      });
    }
  }, [links.length, setLinks, user?.email]);

  const handleCopyLink = (copied:boolean, shortUrl: string) => {
    if(copied){
      toaster.create({
        title:"Link copied!",
        description: `${domain}/${shortUrl} has been copied to clipboard.`,
        type: "success",
        duration: 2000,
        position: "top",
        isClosable: true,
      })
    }
  };

  const handlerEditLink = (id:string) => {
    console.log(id);
  }

  const handlerDeleteLink = (id:string) => {
    console.log(id);
  }

  const filteredLinks = links.filter(link => {
    return link.originalUrl.toLowerCase().includes(watchSearch.toLowerCase()) ||
    link.shortUrl.toLowerCase().includes(watchSearch.toLowerCase())
    }
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
        
        <InputGroup maxW="300px" startElement={<Search size={18} color="gray" />} >
          <Input 
            placeholder="Search links..."
            size="md"
            {...register('search')}
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
                    <Link
                      aria-label="Open original link"
                      href={link.originalUrl}
                      target="_blank"
                    >
                      <ExternalLink size={14} />
                    </Link>
                  </HStack>
                </Table.Cell>
                <Table.Cell fontWeight="medium" color="brand.500">
                  {domain}/{link.shortUrl}
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
                          <Clipboard.Root
                            value={`${domain}/${link.shortUrl}`}
                            onStatusChange={ ({copied}:{copied:boolean}) => handleCopyLink(copied, link.shortUrl) }
                          >
                            <Clipboard.Trigger asChild> 
                              <Menu.Item value="copy" cursor="pointer">
                                  <Copy size={16} />
                                  Copy Link
                              </Menu.Item>
                            </Clipboard.Trigger>
                          </Clipboard.Root>
                          <Menu.Item value="edit" cursor="pointer" onClick={() => handlerEditLink(link.id)}>
                              <Pencil size={16} />
                              Edit
                          </Menu.Item>
                          <Menu.Item value="delete" color="red.500" _hover={{ bg: "red.50" }} cursor="pointer" onClick={() => handlerDeleteLink(link.id)}>
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