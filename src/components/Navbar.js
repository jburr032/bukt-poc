import { useEffect } from 'react';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Stack,
  Text,
} from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { useDispatch } from 'react-redux';
import { userDataActions } from '../redux/userDataSlice';
import { Link as RouteLink } from 'react-router-dom';

const Links = ['home', 'feed'];

const NavLink = ({ link }) => (
  <Text textTransform="capitalize">
    <Link
      as={RouteLink}
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        color: 'black',
      }}
      color="brand.text"
      to={`/${link}`}
    >
      {link}
    </Link>
  </Text>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let { publicKey, disconnect } = useWallet();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async (logout = true) => {
    try {
      if (logout) {
        sessionStorage.clear();
        navigate('/');
      } else sessionStorage.setItem('publicKey', '');

      dispatch(userDataActions.publicKeyState(''));

      await disconnect();
    } catch (err) {}
  };

  useEffect(() => {
    if (publicKey) {
      dispatch(userDataActions.publicKeyState(publicKey.toBase58()));
      sessionStorage.setItem('publicKey', publicKey.toBase58());
    }
  }, [publicKey]);

  return (
    <>
      <Box
        bg="white"
        px={4}
        position="sticky"
        top={0}
        zIndex={20}
        boxShadow="0px 8px 11px -11px rgb(0 0 0 / 49%)"
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>BUKT</Box>
            {!publicKey ? (
              <WalletMultiButton />
            ) : (
              <WalletDisconnectButton onClick={() => handleLogout(false)} />
            )}
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              {Links.map(link => (
                <NavLink key={link} link={link}>
                  {link}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar size={'sm'} src="https://bit.ly/kent-c-dodds" />
              </MenuButton>
              <MenuList>
                <MenuItem>Account</MenuItem>
                <MenuDivider />
                <MenuItem onClick={handleLogout}>
                  Logout & Disconnect Wallet
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map(link => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
