import { Button, Container, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();
  return (
    <Container>
      <Text>Welcome to Bukt!</Text>
      <Text>Add statuses to your Solana transactions</Text>
      <Button onClick={() => navigate('/sign-up')}>Sign-up</Button>
      <Button onClick={() => navigate('/login')}>Login</Button>
    </Container>
  );
}
