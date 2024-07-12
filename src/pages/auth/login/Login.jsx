import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Context } from '../../../constants';
import { Auth } from '../../../service';
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
  CardBody
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
  const navigate = useNavigate();
  const { state } = useContext(Context);
  const { auth } = state;

  if (auth.user !== null) {
    return <Navigate to={PATH.profile.overview} />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await Auth.login();
      navigate(PATH.profile.overview);
    } catch (error) {
      return;
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
              <GlobalComponent.Form
                type='text'
                id='username'
                label='Username'
                my={10}
                isRequired
              />
              <GlobalComponent.Form
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
