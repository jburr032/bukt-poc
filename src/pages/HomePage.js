import { useState, useEffect } from 'react';
import ChainService from '../services/ChainServices';
import {
  Grid,
  GridItem,
  Image,
  Text,
  Center,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
} from '@chakra-ui/react';
import TransactionBox from '../components/TransactionBox';
import { selectPublicKey } from '../redux/userDataSlice';
import { useSelector } from 'react-redux';
import { BiCalendar } from 'react-icons/bi';
import Follower from '../components/Follower';

const StatusesTab = () => {
  const [tx, setTx] = useState([]);
  const [walletAddr, setWalletAddr] = useState('');
  const accountAddress = 'C1jyTNPEonQsuXu5yB5ZSCgbwUVe6FoRtatR67qWiCwc';
  const [userData] = useState({
    username: '',
  });
  const userPublicKey = useSelector(selectPublicKey);

  const getTx = async walletAddr => {
    if (walletAddr) {
      setWalletAddr(walletAddr);
      const { data } = await ChainService.getSolTransfers(accountAddress);

      setTx(data.data.map(tx => ({ ...tx, comment: '' })));
    }
  };

  useEffect(() => {
    const publicKeyStorage = sessionStorage.getItem('publicKey');
    if (publicKeyStorage) getTx(publicKeyStorage?.publicKey);
  }, []);

  useEffect(() => {
    if (userPublicKey && !tx.length) getTx(userPublicKey);
    else if (!userPublicKey) {
      setWalletAddr('');
      setTx([]);
    }
  }, [userPublicKey]);

  return (
    <>
      {walletAddr ? (
        <div
          style={{
            overflow: 'scroll',
            height: '100vh',
          }}
        >
          {tx.map((t, i) => (
            <TransactionBox
              key={i}
              t={t}
              setTx={setTx}
              username={userData.username}
            />
          ))}
        </div>
      ) : (
        <Center paddingTop="25px">
          <Text>Connect your wallet to see your transactions.</Text>
        </Center>
      )}
    </>
  );
};

const ProfileTabs = () => {
  return (
    <Tabs>
      <TabList>
        <Tab
          _focus={{
            border: null,
          }}
        >
          Statuses
        </Tab>
        <Tab
          _focus={{
            border: null,
          }}
        >
          Followers
        </Tab>
        <Tab
          _focus={{
            border: null,
          }}
        >
          Following
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel padding={0} h="100vh">
          <StatusesTab />
        </TabPanel>
        <TabPanel h="100vh">
          <Follower followBtn={false} />
        </TabPanel>
        <TabPanel h="100vh">
          <Follower />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
export default function HomePage() {
  const [userData, setUserData] = useState({
    username: '',
  });

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');

    if (Object.keys(userData).length > 0) {
      setUserData(userData);
    }
  }, []);
  return (
    <>
      <Grid templateColumns="repeat(4, 1fr)" gap={1} padding="0px 50px">
        <GridItem colSpan={1} />
        <GridItem
          colSpan={2}
          borderLeft="0.5px solid #E2E8F0"
          borderRight="0.5px solid #E2E8F0"
        >
          <div
            style={{ height: '155px', backgroundColor: 'rgb(207, 217, 222)' }}
          />
          <div style={{ height: '75px', backgroundColor: 'white' }} />

          <Image
            position="absolute"
            borderRadius="full"
            top="175px"
            border="5px solid white"
            h="130px"
            name="Kent Dodds"
            src="https://bit.ly/kent-c-dodds"
            marginBottom="13px"
          />
          <Text fontWeight="bold" margin="10px" color="rgb(83, 100, 113)">
            @{userData.username}
          </Text>
          <Flex color="rgb(83, 100, 113)" paddingLeft="10px">
            <BiCalendar />
            <Text fontSize="12px" marginLeft="5px" marginBottom="10px">
              Joined January 2023
            </Text>
          </Flex>
          <ProfileTabs />
        </GridItem>
        <GridItem colSpan={1} />
      </Grid>
    </>
  );
}
