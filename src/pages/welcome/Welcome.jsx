import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Container,
  Flex,
  Grid,
  Text,
  Input,
  FormControl,
  FormLabel,
  Button,
  Box,
  Link as ChakraLink,
  useToast
} from '@chakra-ui/react';
import { Context, PATH } from '../../constants';
import { GlobalComponent } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faUpload } from '@fortawesome/free-solid-svg-icons';

export default function Welcome() {
  const LIMIT_ABOUT = 300;
  const toast = useToast();
  const navigate = useNavigate();
  const { state, action } = useContext(Context);
  const { user, upload } = state;
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    bio: '',
    about: '',
    profilePhotoURL: ''
  });

  const handleInput = (e) => {
    setUserData((data) => ({ ...data, [e.target.id]: e.target.value }));
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    const localURL = URL.createObjectURL(file);
    action.setFileDispatcher({ file, localURL });
  };

  const handleUploadPhoto = () => {
    action.uploadFileDispatcher(
      upload.userFileInput,
      `/users/${user.userData.uid}/profile`
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...userData,
      profilePhotoURL: upload.fileDownloadURL,
      firstLogin: true
    };
    action.updateUserDataDispatcher(
      user.userData.uid,
      payload,
      (isSuccess, data) => {
        toast(data);
        if (isSuccess) {
          navigate(PATH.profile.overview);
          return;
        }
      }
    );
  };

  return (
    <Container maxW={800} my={6}>
      <Text fontSize='4xl'>Halo! Selamat bergabung!</Text>
      <Text fontSize='2xl' mt={8}>
        Pilih foto untuk dijadikan profil!
      </Text>
      <form onSubmit={handleSubmit}>
        <Flex my={8} align='center' justify='center' gap={6}>
          <Avatar size='2xl' src={upload.localGeneratedURL} />
          <Box>
            <FormControl maxW={300} mb={4}>
              <FormLabel
                htmlFor='profileImage'
                fontSize='lg'
                textDecoration='underline'
                cursor='pointer'
              >
                <FontAwesomeIcon icon={faCamera} style={{ marginRight: 8 }} />
                {upload.userFileInput
                  ? 'Ganti foto profil'
                  : 'Pilih foto profil'}
              </FormLabel>
              <Input
                type='file'
                accept='.jpg, .jpeg, .png'
                id='profileImage'
                hidden
                onChange={handleFileInput}
              />
            </FormControl>
            {upload.loading && (
              <GlobalComponent.LoadingOverlay text='Mengunggah foto . . .' />
            )}
            {upload.error && (
              <Text fontSize='lg' color='red.500'>
                {upload.errorMsg}
              </Text>
            )}
            {upload.success && (
              <ChakraLink
                textDecoration='underline'
                color='blue.500'
                fontSize='lg'
                display='block'
                fontWeight='semibold'
                href={upload.fileDownloadURL}
                isExternal
              >
                Berhasil mengunggah. Lihat foto.
              </ChakraLink>
            )}
            {upload.showUploadButton && !upload.error && (
              <Button
                colorScheme='purple'
                variant='link'
                fontSize='lg'
                onClick={handleUploadPhoto}
                leftIcon={<FontAwesomeIcon icon={faUpload} />}
              >
                Unggah
              </Button>
            )}
          </Box>
        </Flex>
        {upload.success && (
          <>
            <Text fontSize='2xl' mt={16}>
              Isi informasi tentang kamu!
            </Text>
            <Grid templateColumns='repeat(2, 1fr)' gap={6} my={8}>
              <GlobalComponent.GridForm
                onChange={handleInput}
                value={userData.username}
                type='text'
                label='Username'
                id='username'
                isRequired
              />
              <GlobalComponent.GridForm
                onChange={handleInput}
                value={userData.bio}
                type='text'
                label='Bio'
                id='bio'
                isRequired
              />
              <GlobalComponent.GridForm
                onChange={handleInput}
                value={userData.firstName}
                type='text'
                label='Nama depan'
                id='firstName'
                isRequired
              />
              <GlobalComponent.GridForm
                onChange={handleInput}
                value={userData.lastName}
                type='text'
                label='Nama belakang'
                id='lastName'
                isRequired
              />
            </Grid>
            <GlobalComponent.Form
              onChange={handleInput}
              value={userData.about}
              my={6}
              type='textarea'
              label='Tentang'
              id='about'
              currentCountChar={userData.about.length}
              limitChar={LIMIT_ABOUT}
            />
            <Flex justify='flex-end' my={16}>
              <Button colorScheme='blue' type='submit'>
                Simpan dan Lanjut
              </Button>
            </Flex>
          </>
        )}
      </form>
    </Container>
  );
}
