import { Box, Table, Badge, Menu, Text, Flex, Input, InputGroup, HStack, Button, Portal, Link, Clipboard } from '@chakra-ui/react';
import { MoreVertical, Copy, Trash2, Search, ExternalLink } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { toaster } from "@/components/ui/toaster";
import { useColorModeValue } from './ui/color-mode';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { searchSchema } from '@/schema/schemas';
import { LinkItem } from '@/type';
import { useAuthStore } from '@/store/auth';
import { useShallow } from 'zustand/shallow';
import { deleteLink, getLinks } from '@/services/firebase';
import { useLinksStore } from '@/store/links';
import { statusToaster } from '@/utils/functions';

const domain = window.location.hostname;

const LinksList = () => {

  const {user} = useAuthStore(
    useShallow( (state => ({
      user: state.user,
    })))
  );
  const {links, setLinks, removeLink} = useLinksStore(
    useShallow( (state => ({
      links: state.links,
      setLinks: state.setLinks,
      removeLink: state.removeLink,
    })))
  );

  const { watch, register } = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: '',
    },
  });

  const watchSearch = watch('search')?.toLowerCase() ?? '';

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    if(user?.email){
      getLinks(user?.email).then((res:{code:string, message:string, links:LinkItem[]})=>{
        setLinks(res.links);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopyLink = (copied:boolean, shortUrl: string) => {
    if(copied){
      toaster.create({
        title:"Link copied!",
        description: `${domain}/${shortUrl} has been copied to clipboard.`,
        type: "success",
        duration: 2000,
      })
    }
  };

  const handlerDeleteLink = (id:string) => {
    if(user?.email){
      deleteLink(user?.email, id).then((res:{code:string, message:string})=>{
        toaster.create({
          title: res.code,
          description: res.message,
          type: statusToaster(res.code),
          duration: 2000
        });
        removeLink(id);
      });
    }
  }

  const filteredLinks = useMemo(
    () =>
      links.filter(item =>
        item.originalUrl.toLowerCase().includes(watchSearch) ||
        item.shortUrl.toLowerCase().includes(watchSearch)
      ),
    [links, watchSearch]
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