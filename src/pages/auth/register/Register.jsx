import { useNavigate } from 'react-router-dom';
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
              <FormControl my={10} isRequired>
                <FormLabel fontSize='xl' htmlFor='username'>
                  Username
                </FormLabel>
                <Input type='text' id='username' />
              </FormControl>
              <FormControl my={10} isRequired>
                <FormLabel fontSize='xl' htmlFor='email'>
                  Email
                </FormLabel>
                <Input type='email' id='email' />
              </FormControl>
              <FormControl my={10} isRequired>
                <FormLabel fontSize='xl' htmlFor='password'>
                  Password
                </FormLabel>
                <Input type='password' id='password' />
              </FormControl>
              <Flex align='center' justify='flex-end'>
                <Button colorScheme='purple'>Daftar</Button>
              </Flex>
            </form>
          </Box>
        </CardBody>
        <Flex align='center' justify='center' gap={1} my={10}>
          <Text>Sudah mendaftar?</Text>
          <Button variant='link' colorScheme='blue' onClick={toLogin}>
            Masuk di sini!
          </Button>
        </Flex>
      </Card>
    </Container>
  );
}
