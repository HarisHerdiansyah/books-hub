import { useNavigate } from 'react-router-dom';
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

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('wkwk');
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
                type='text'
                id='username'
                label='Username'
                my={10}
                isRequired
              />
              <GlobalComponent.Form
                type='email'
                id='email'
                label='Email'
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
        />
      </Card>
    </Container>
  );
}
