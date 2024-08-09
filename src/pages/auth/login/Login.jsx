import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../../constants';
import { PATH } from '../../../constants';
import { GlobalComponent, AuthComponent } from '../../../components';
import {
  Container,
  Card,
  CardHeader,
  Text,
  Flex,
  Box,
  Button,
  CardBody,
  useToast
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const toast = useToast();
  const { action } = useContext(Context);

  const handleInput = (e) => {
    setCredentials((cred) => ({ ...cred, [e.target.id]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    action.loginDispatcher(credentials, (firstLogin, data) => {
      toast(data);
      if (firstLogin) {
        navigate(PATH.welcome);
        return;
      }
      navigate(PATH.profile.overview);
      return;
    });
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
              <GlobalComponent.Form
                onChange={handleInput}
                value={credentials.email}
                type='email'
                id='email'
                label='Email'
                my={10}
                isRequired
              />
              <GlobalComponent.Form
                onChange={handleInput}
                value={credentials.password}
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
        <AuthComponent.AuthLink
          textContent='Belum punya akun?'
          linkContent='Daftar di sini!'
          color='purple'
          handleClick={toRegister}
          my={10}
        />
      </Card>
    </Container>
  );
}
