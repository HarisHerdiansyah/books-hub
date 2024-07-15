import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH, Context } from '../../../constants';
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

export default function Register() {
  const navigate = useNavigate();
  const { action } = useContext(Context);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleInput = (e) => {
    setCredentials((cred) => ({ ...cred, [e.target.id]: e.target.value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setCredentials({ email: '', password: '' });
    action.registerDispatcher(credentials, (isSuccess) =>
      alert(`${isSuccess ? 'Berhasil' : 'Gagal'} Registrasi`)
    );
  };

  const toLogin = () => navigate(PATH.auth.login);

  return (
    <Container maxW={600} my={6}>
      <Card variant='outline'>
        <CardHeader>
          <Flex align='center' justify='center' gap={3}>
            <FontAwesomeIcon icon={faBook} size='xl' />
            <Text fontSize='3xl'>Register</Text>
          </Flex>
        </CardHeader>
        <CardBody>
          <Box px={4}>
            <form onSubmit={handleRegister}>
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
              <Flex align='center' justify='flex-end'>
                <Button colorScheme='purple' type='submit'>
                  Daftar
                </Button>
              </Flex>
            </form>
          </Box>
        </CardBody>
        <AuthComponent.AuthLink
          textContent='Sudah mendaftar?'
          linkContent='Masuk di sini!'
          color='blue'
          handleClick={toLogin}
          my={10}
        />
      </Card>
    </Container>
  );
}
