import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputGroup,
  Text,
  Button,
  Container,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function UsernameForm({ formHelperText, submitBtnText }) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = data => {
    sessionStorage.setItem(
      'userData',
      JSON.stringify({
        username: data.username,
        password: data.password,
      })
    );

    navigate('/home');
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isRequired>
          <FormLabel>Username</FormLabel>
          <InputGroup size="md">
            <Input
              {...register('username')}
              pr="4.5rem"
              type="text"
              placeholder="Enter username"
            />
          </InputGroup>
          <FormHelperText>{formHelperText}</FormHelperText>
        </FormControl>
        <FormControl isRequired marginBottom="10px">
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              {...register('password')}
              pr="4.5rem"
              type="password"
              placeholder="Enter password"
            />
          </InputGroup>
        </FormControl>
        <Button type="submit" h="1.75rem" size="sm" marginRight="10px">
          {submitBtnText}
        </Button>
      </form>
      <Text fontWeight="bold">Do not put in any actual passwords!</Text>
    </Container>
  );
}
