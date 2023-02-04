import { Button, Container, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();
  return (
    <Container paddingTop="15px">
      <Text>Welcome to Bukt!</Text>
      <Text marginBottom="10px">Add statuses to your Solana transactions</Text>
      <Button onClick={() => navigate('/sign-up')} marginRight="15px">
        Sign-up
      </Button>
      <Button onClick={() => navigate('/login')}>Login</Button>
    </Container>
  );
}
