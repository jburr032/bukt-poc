import React, { useCallback, useEffect, useState } from 'react';
import { Box, Text, VStack, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import * as web3 from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  WalletMultiButton,
  WalletDisconnectButton,
} from '@solana/wallet-adapter-react-ui';
require('@solana/wallet-adapter-react-ui/styles.css');

function WalletNotConnected() {
  return (
    <VStack height="70vh" justify="space-around">
      <VStack>
        <Text fontSize="2xl">
          {' '}
          Looks like your wallet is not connnected. Connect a wallet to get
          started!
        </Text>
        <WalletMultiButton />
      </VStack>
    </VStack>
  );
}

function useSolanaAccount() {
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const init = useCallback(async () => {
    if (publicKey) {
      let acc = await connection.getAccountInfo(publicKey);
      setAccount(acc);
      let transactions = await connection.getConfirmedSignaturesForAddress2(
        publicKey,
        {
          limit: 10,
        }
      );

      setTransactions(transactions);
    }
  }, [publicKey, connection]);

  useEffect(() => {
    if (publicKey) {
      init();
    }
  }, [init, publicKey]);

  return { account, transactions };
}

export default function WalletLogin({ redirectPath = '/sign-up/username' }) {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const { account, transactions } = useSolanaAccount();
  const toast = useToast();
  const [airdropProcessing, setAirdropProcessing] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (publicKey) {
      sessionStorage.setItem('publicKey', JSON.stringify(publicKey));
      navigate(redirectPath);
    }
  }, [publicKey]);

  const getAirdrop = useCallback(async () => {
    setAirdropProcessing(true);
    try {
      var airdropSignature = await connection.requestAirdrop(
        publicKey,
        web3.LAMPORTS_PER_SOL
      );
      await connection.confirmTransaction(airdropSignature);
    } catch (error) {
      console.log(error);
      toast({ title: 'Airdrop failed', description: 'unknown error' });
    }
    setAirdropProcessing(false);
  }, [toast, publicKey, connection]);

  return (
    <Box textAlign="center" fontSize="xl">
      {publicKey && <WalletDisconnectButton bg="green" />}
      {!publicKey && <WalletNotConnected />}
    </Box>
  );
}
