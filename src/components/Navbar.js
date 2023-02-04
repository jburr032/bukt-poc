import { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
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
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { useDispatch } from 'react-redux';
import { userDataActions } from '../redux/userDataSlice';
import { Link as RouteLink } from 'react-router-dom';
import { MdRssFeed } from 'react-icons/md';
import { AiFillHome } from 'react-icons/ai';

const Links = ['home', 'feed'];

const navLinkIcons = {
  home: <AiFillHome />,
  feed: <MdRssFeed />,
};

const NavLink = ({ link }) => {
  const navigate = useNavigate();

  return (
    <Button
      w="141px"
      marginBottom="15px"
      textTransform="capitalize"
      fontSize="18px"
      variant="ghost"
      _hover={{
        textDecoration: 'none',
        color: 'black',
      }}
      color="brand.text"
      onClick={() => navigate(`/${link}`)}
    >
      {navLinkIcons[link]}
      <Text marginLeft="10px">{link}</Text>
    </Button>
  );
};

export default function Navbar() {
  const { isOpen } = useDisclosure();
  let { publicKey, disconnect } = useWallet();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    username: '',
  });

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');

    if (Object.keys(userData).length > 0) {
      setUserData(userData);
    }
  }, []);

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
      <Box bg="white">
        <div style={{ padding: '10px', height: '50px' }}>
          <Text fontWeight="bold" fontSize="20px">
            BUKT
          </Text>
        </div>
        {Links.map(link => (
          <Stack>
            <NavLink key={link} link={link}>
              {link}
            </NavLink>
          </Stack>
        ))}
        <div style={{ margin: '10px 0px' }}>
          {!publicKey ? (
            <WalletMultiButton />
          ) : (
            <WalletDisconnectButton onClick={() => handleLogout(false)} />
          )}
        </div>

        <Flex>
          <Menu>
            <MenuButton
              as={Button}
              position="absolute"
              bottom="0px"
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}
              width="285px"
            >
              <Flex>
                <Avatar size={'md'} src="https://bit.ly/kent-c-dodds" />
                <Text lineHeight="50px" marginLeft="5px">
                  {userData.username}
                </Text>
              </Flex>
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
