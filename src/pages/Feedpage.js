import {
  Grid,
  GridItem,
  Input,
  Text,
  InputGroup,
  InputLeftAddon,
  Avatar,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import TransactionBox from '../components/TransactionBox';
import ChainService from '../services/ChainServices';
var randomWords = require('random-words');

export default function FeedPage() {
  const [tx, setTx] = useState([]);
  const accountAddress = 'C1jyTNPEonQsuXu5yB5ZSCgbwUVe6FoRtatR67qWiCwc';

  const getTx = async walletAddr => {
    const { data } = await ChainService.getSolTransfers(accountAddress);
    setTx(
      data.data.map(tx => ({
        ...tx,
        comment: randomWords({ exactly: 5, join: ' ' }),
      }))
    );
  };

  useEffect(() => {
    getTx();
  }, []);

  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={1} padding="0px 50px">
      <GridItem colSpan={1} />
      <GridItem
        colSpan={2}
        borderLeft="0.5px solid #E2E8F0"
        borderRight="0.5px solid #E2E8F0"
      >
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
            height: '100vh',
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
      </GridItem>
    </Grid>
  );
}
