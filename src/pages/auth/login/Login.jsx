import { useNavigate } from 'react-router-dom';
import { mockAuth } from '../../../helper/mockAsync';
import { Container, Button } from '@chakra-ui/react';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async () => {
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

  return (
    <Container maxW={900} my={6}>
      <Button colorScheme='teal' onClick={handleLogin}>
        Login
      </Button>
    </Container>
  );
}
