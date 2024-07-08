import { useNavigate } from 'react-router-dom';
import { mockAuth } from '../../../helper/mockAsync';
import { PATH } from '../../../constants/routes';
import {
  Container,
  Card,
  CardHeader,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  CardBody
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const path = await mockAuth.login({
        username: 'Admin#1234',
        password: 'Admin#1234'
      });
      navigate(path);
      window.location.reload();
    } catch (error) {
      console.error('GAGAL LOGIN', error);
    }
  };

  const toRegister = () => navigate(PATH.auth.register);

  const toResetPass = () => navigate(PATH.auth.resetPass);

  return (
    <Container maxW={600} my={6}>
      <Card variant='outline'>
        <CardHeader>
          <Flex align='center' justify='center' gap={3}>
            <FontAwesomeIcon icon={faBook} size='xl' />
            <Text fontSize='3xl'>Login</Text>
          </Flex>
        </CardHeader>
        <CardBody>
          <Box px={4}>
            <form onSubmit={handleLogin}>
              <FormControl my={10} isRequired>
                <FormLabel fontSize='xl' htmlFor='username'>
                  Username
                </FormLabel>
                <Input type='text' id='username' />
              </FormControl>
              <FormControl my={10} isRequired>
                <FormLabel fontSize='xl' htmlFor='password'>
                  Password
                </FormLabel>
                <Input type='password' id='password' />
              </FormControl>
              <Flex align='center' justify='space-between'>
                <Button colorScheme='red' variant='link' onClick={toResetPass}>
                  Lupa password
                </Button>
                <Button colorScheme='blue'>Masuk</Button>
              </Flex>
            </form>
          </Box>
        </CardBody>
        <Flex align='center' justify='center' gap={1} my={10}>
          <Text>Belum punya akun?</Text>
          <Button variant='link' colorScheme='purple' onClick={toRegister}>
            Daftar di sini!
          </Button>
        </Flex>
      </Card>
    </Container>
  );
}
