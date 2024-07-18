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
import { functions } from '../../constants';
import { Context, PATH } from '../../constants';
import { GlobalComponent } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

export default function Welcome() {
  const toast = useToast();
  const navigate = useNavigate();
  const { state, action } = useContext(Context);
  const { user } = state;
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    bio: '',
    about: '',
    profilePhotoURL: ''
  });
  const [uploadState, setUploadState] = useState({
    loading: false,
    success: false,
    error: false,
    errorMsg: null,
    fileInput: null,
    fileURL: '',
    localURL: '',
    showUploadBtn: false
  });

  const handleInput = (e) => {
    setUserData((data) => ({ ...data, [e.target.id]: e.target.value }));
  };

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    const localURL = URL.createObjectURL(selectedFile);
    setUploadState((upState) => ({
      ...upState,
      success: false,
      error: false,
      fileInput: e.target.files[0],
      showUploadBtn: true,
      localURL
    }));
  };

  const handleUploadPhoto = () => {
    const upload = functions.uploadFile(
      uploadState.fileInput,
      `users/${user.userData.uid}/profile`
    );
    upload.on(
      'state_changed',
      () => {
        setUploadState((upState) => ({
          ...upState,
          loading: true,
          showUploadBtn: false
        }));
      },
      () => {
        setUploadState((upState) => ({
          ...upState,
          fileInput: null,
          loading: false,
          error: true,
          errorMsg: 'Terjadi kesalahan saat upload. Coba lagi.'
        }));
      },
      () => {
        functions
          .getFileURL(upload.snapshot.ref)
          .then((url) => {
            setUploadState((upState) => ({
              ...upState,
              fileInput: null,
              loading: false,
              success: true,
              fileURL: url
            }));
          })
          .catch(() => {
            setUploadState((upState) => ({
              ...upState,
              fileInput: null,
              loading: false,
              error: true,
              errorMsg: 'Terjadi kesalahan saat mengambil data. Coba lagi.'
            }));
          });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...userData,
      profilePhotoURL: uploadState.fileURL,
      firstLogin: false
    };
    action.updateUserDataDispatcher(user.userData.uid, payload, (isSuccess) => {
      if (isSuccess) {
        toast({ title: 'Berhasil!', status: 'success' });
        navigate(PATH.profile.overview);
        return;
      }
      toast({ title: 'Terjadi kesalahan. Coba lagi!', status: 'error' });
      return;
    });
  };

  return (
    <Container maxW={800} my={6}>
      <Text fontSize='4xl'>Selamat datang!</Text>
      <Text fontSize='xl'>Isi data diri kamu dulu yuk!</Text>
      <form onSubmit={handleSubmit}>
        <Flex my={8} align='center' justify='center' gap={6}>
          <Avatar size='2xl' src={uploadState.localURL} />
          <Box>
            <FormControl maxW={300}>
              <FormLabel
                htmlFor='profileImage'
                fontSize='lg'
                textDecoration='underline'
                cursor='pointer'
              >
                <FontAwesomeIcon icon={faCamera} style={{ marginRight: 8 }} />
                {uploadState.fileInput
                  ? uploadState.fileInput.name
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
            {uploadState.loading && (
              <Text fontSize='lg'>Sedang mengunggah</Text>
            )}
            {uploadState.error && (
              <Text fontSize='lg'>{uploadState.errorMsg}</Text>
            )}
            {uploadState.success && (
              <ChakraLink
                textDecoration='underline'
                color='blue'
                fontSize='lg'
                display='block'
                href={uploadState.fileURL}
                isExternal
              >
                Berhasil mengunggah.
              </ChakraLink>
            )}
            {uploadState.showUploadBtn && (
              <Button
                colorScheme='purple'
                variant='link'
                fontSize='xl'
                onClick={handleUploadPhoto}
              >
                Unggah
              </Button>
            )}
          </Box>
        </Flex>
        <Grid templateColumns='repeat(2, 1fr)' gap={6}>
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
        />
        <Flex justify='flex-end' my={16}>
          <Button colorScheme='blue' type='submit'>
            Simpan dan Lanjut
          </Button>
        </Flex>
      </form>
    </Container>
  );
}
