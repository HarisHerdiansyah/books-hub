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
  CardBody,
  VStack
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

export default function ResetPass() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('wkwk');
  };

  const toLogin = () => navigate(PATH.auth.login);

  const toRegister = () => navigate(PATH.auth.register);

  return (
    <Container maxW={600} my={6}>
      <Card variant='outline'>
        <CardHeader>
          <Flex align='center' justify='center' gap={3}>
            <FontAwesomeIcon icon={faBook} size='xl' />
            <Text fontSize='3xl'>Reset Password</Text>
          </Flex>
        </CardHeader>
        <CardBody>
          <Box px={4}>
            <form onSubmit={handleSubmit}>
              <GlobalComponent.Form
                type='email'
                id='email'
                label='Email'
                my={10}
                isRequired
              />
              <Flex align='center' justify='flex-end'>
                <Button colorScheme='red' type='submit'>
                  Kirim Email
                </Button>
              </Flex>
            </form>
          </Box>
        </CardBody>
        <VStack my={10}>
          <AuthComponent.AuthLink
            textContent='Belum punya akun?'
            linkContent='Daftar di sini!'
            color='purple'
            handleClick={toRegister}
          />
          <AuthComponent.AuthLink
            textContent='Sudah mendaftar?'
            linkContent='Masuk di sini!'
            color='blue'
            handleClick={toLogin}
          />
        </VStack>
      </Card>
    </Container>
  );
}
