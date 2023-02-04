import {
  InputLeftElement,
  Input,
  Text,
  InputGroup,
  InputLeftAddon,
  Avatar,
  Button,
  Container,
  Box,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import GridLayout from '../components/GridLayout';
import TransactionBox from '../components/TransactionBox';
import ChainService from '../services/ChainServices';
import { AiOutlineSearch } from 'react-icons/ai';
import Follower from '../components/Follower';
var randomWords = require('random-words');

export default function FeedPage() {
  const [tx, setTx] = useState([]);
  const accountAddress = 'C1jyTNPEonQsuXu5yB5ZSCgbwUVe6FoRtatR67qWiCwc';

  const getTx = async walletAddr => {
    const { data } = await ChainService.getSolTransfers(accountAddress);
    setTx(
      data.data.map(tx => ({
        ...tx,
        comment: `${randomWords({ exactly: 5, join: ' ' })} #${randomWords({
          exactly: 1,
        })}`,
      }))
    );
  };

  useEffect(() => {
    getTx();
  }, []);

  return (
    <GridLayout
      center={
        <>
          <div style={{ padding: '10px', height: '50px' }}>
            <Text fontWeight="bold" fontSize="20px">
              Feed
            </Text>
          </div>
          <div
            style={{
              height: '135px',
              borderRight: '0.5px solid #E2E8F0',
              borderLeft: '0.5px solid #E2E8F0',
              borderBottom: '0.5px solid #E2E8F0',
            }}
          >
            <form>
              <InputGroup marginBottom="15px">
                <InputLeftAddon
                  h="65px"
                  bg="white"
                  borderRadius="0px"
                  borderLeft="0px solid transparent"
                  children={
                    <Avatar src="https://bit.ly/kent-c-dodds" size="md" />
                  }
                />
                <Input
                  h="65px"
                  _focus={{
                    border: '0px solid inherit',
                  }}
                  borderRight="0px solid transparent"
                  borderLeft="0px solid transparent"
                  borderRadius="0px"
                  type="text"
                  placeholder="What's happening?"
                />
              </InputGroup>
              <Button
                float="right"
                right="5px"
                colorScheme="blue"
                _focus={{
                  border: '0px solid inherit',
                }}
              >
                Bukt
              </Button>
            </form>
          </div>
          <div
            style={{
              overflow: 'scroll',
              height: '69vh',
            }}
          >
            {tx.map((t, i) => (
              <TransactionBox
                key={i}
                t={t}
                setTx={setTx}
                username="@josh"
                isFeed={true}
              />
            ))}
          </div>
        </>
      }
      rightSide={
        <Container paddingTop="10px">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<AiOutlineSearch color="gray.300" />}
            />
            <Input type="text" placeholder="Search BUKT" />
          </InputGroup>
          <Box
            bg="rgb(247, 249, 249)"
            marginTop="10px"
            paddingLeft="10px"
            borderRadius="10px"
          >
            <Text fontWeight="bold" fontSize="20px">
              What's happening
            </Text>
            <Box h="60px" marginTop="10px">
              <Text fontSize="10px">trending</Text>
              <Text fontWeight="bold">#gameTokens</Text>
              <Text fontSize="10px">100 transactions</Text>
            </Box>
            <Box h="60px" marginTop="10px">
              <Text fontSize="10px">trending</Text>
              <Text fontWeight="bold">#sol</Text>
              <Text fontSize="10px">100 transactions</Text>
            </Box>
            <Box h="60px" marginTop="10px">
              <Text fontSize="10px">trending</Text>
              <Text fontWeight="bold">#Bork</Text>
              <Text fontSize="10px">100 transactions</Text>
            </Box>
          </Box>
          <Box
            bg="rgb(247, 249, 249)"
            marginTop="10px"
            paddingLeft="10px"
            borderRadius="10px"
          >
            <Text fontWeight="bold" fontSize="20px">
              Who to follow
            </Text>
            <Grid templateColumns="repeat(12, 1fr)" w="200px" marginTop="10px">
              <GridItem colSpan={1}>
                <Avatar />
              </GridItem>
              <GridItem colSpan={9}>
                <div style={{ paddingLeft: '10px' }}>
                  <Text fontWeight="bold">J Burrill</Text>
                  <Text fontSize="12px" color="rgb(83, 100, 113)">
                    @jburr
                  </Text>
                </div>
              </GridItem>
              <GridItem colSpan={2}>
                <Button
                  variant="ghost"
                  borderRadius="25px"
                  border="1px solid"
                  borderColor="#80808033"
                >
                  Follow
                </Button>
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(12, 1fr)" w="200px" marginTop="10px">
              <GridItem colSpan={1}>
                <Avatar />
              </GridItem>
              <GridItem colSpan={9}>
                <div style={{ paddingLeft: '10px' }}>
                  <Text fontWeight="bold">Some Guy</Text>
                  <Text fontSize="12px" color="rgb(83, 100, 113)">
                    @someGuy
                  </Text>
                </div>
              </GridItem>
              <GridItem colSpan={2}>
                <Button
                  variant="ghost"
                  borderRadius="25px"
                  border="1px solid"
                  borderColor="#80808033"
                >
                  Follow
                </Button>
              </GridItem>
            </Grid>
          </Box>
        </Container>
      }
    />
  );
}
