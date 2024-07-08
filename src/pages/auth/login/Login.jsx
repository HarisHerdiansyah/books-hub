import { useNavigate } from 'react-router-dom';
import { mockAuth } from '../../../constants/functions';
import { PATH } from '../../../constants/routes';
import { Form } from '../../../components/global';
import { AuthLink } from '../../../components/auth';
import {
  Container,
  Card,
  CardHeader,
  Text,
  Flex,
  Box,
  Button,
  CardBody
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    console.log('first');
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
              <Form
                type='text'
                id='username'
                label='Username'
                my={10}
                isRequired
              />
              <Form
                type='password'
                id='password'
                label='Password'
                my={10}
                isRequired
              />
              <Flex align='center' justify='space-between'>
                <Button colorScheme='red' variant='link' onClick={toResetPass}>
                  Lupa password
                </Button>
                <Button colorScheme='blue' type='submit'>
                  Masuk
                </Button>
              </Flex>
            </form>
          </Box>
        </CardBody>
        <AuthLink
          textContent='Belum punya akun?'
          linkContent='Daftar di sini!'
          color='purple'
          handleClick={toRegister}
        />
      </Card>
    </Container>
  );
}
