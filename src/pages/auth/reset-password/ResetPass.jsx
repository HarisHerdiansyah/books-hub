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
              <FormControl my={10} isRequired>
                <FormLabel fontSize='xl' htmlFor='email'>
                  Email
                </FormLabel>
                <Input type='email' id='email' />
              </FormControl>
              <Flex align='center' justify='flex-end'>
                <Button colorScheme='red'>Kirim Email</Button>
              </Flex>
            </form>
          </Box>
        </CardBody>
        <VStack my={10}>
          <Flex align='center' justify='center' gap={1} my={1}>
            <Text>Belum punya akun?</Text>
            <Button variant='link' colorScheme='purple' onClick={toRegister}>
              Daftar di sini!
            </Button>
          </Flex>
          <Flex align='center' justify='center' gap={1} my={1}>
            <Text>Sudah mendaftar?</Text>
            <Button variant='link' colorScheme='blue' onClick={toLogin}>
              Masuk di sini!
            </Button>
          </Flex>
        </VStack>
      </Card>
    </Container>
  );
}
