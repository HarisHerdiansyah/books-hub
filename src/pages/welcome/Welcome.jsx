import {
  Avatar,
  Container,
  Flex,
  Grid,
  Text,
  Input,
  FormControl,
  FormLabel,
  Button
} from '@chakra-ui/react';
import { GlobalComponent } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

export default function Welcome() {
  return (
    <Container maxW={800} my={6}>
      <Text fontSize='4xl'>Selamat datang!</Text>
      <Text fontSize='xl'>Isi data diri kamu dulu yuk!</Text>
      <form>
        <Flex my={8} align='center' justify='center' gap={6}>
          <Avatar size='2xl' />
          <FormControl maxW={300}>
            <FormLabel
              htmlFor='profileImage'
              fontSize='xl'
              textDecoration='underline'
              cursor='pointer'
            >
              <FontAwesomeIcon icon={faCamera} style={{ marginRight: 8 }} />
              Unggah foto profil
            </FormLabel>
            <Input
              type='file'
              accept='.jpg, .jpeg, .png'
              id='profileImage'
              hidden
              onChange={(e) => console.log(e.target.files[0])}
            />
          </FormControl>
        </Flex>
        <Grid templateColumns='repeat(2, 1fr)' gap={6}>
          <GlobalComponent.GridForm
            type='text'
            label='Username'
            id='username'
            isRequired
          />
          <GlobalComponent.GridForm
            type='text'
            label='Bio'
            id='bio'
            isRequired
          />
          <GlobalComponent.GridForm
            type='text'
            label='Nama depan'
            id='firstName'
            isRequired
          />
          <GlobalComponent.GridForm
            type='text'
            label='Nama belakang'
            id='lastName'
            isRequired
          />
        </Grid>
        <GlobalComponent.Form
          my={6}
          type='textarea'
          label='Tentang'
          id='about'
        />
        <Flex justify='flex-end' my={16}>
          <Button colorScheme='blue' type='submit'>
            Lanjut
          </Button>
        </Flex>
      </form>
    </Container>
  );
}
