import { Container, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import mockAuth from '../../../function/mockAsync';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    mockAuth('ok')
      .then(() => {
        console.log('Berhasil login');
        localStorage.setItem('auth', 'ok');
        navigate('/profile/overview');
      })
      .catch(() => {
        console.log('Gagal login');
      });
  };

  return (
    <Container maxW={900} my={6}>
      <Button colorScheme='teal' onClick={handleLogin}>
        Login
      </Button>
    </Container>
  );
}
