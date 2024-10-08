import { useContext, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Text,
  useToast
} from '@chakra-ui/react';
import { GlobalComponent } from '../../../components';
import { Context } from '../../../constants';

export default function Settings() {
  const toast = useToast();
  const { action } = useContext(Context);
  const [currentUserData, setCurrentUserData] = useState(
    JSON.parse(window.sessionStorage.getItem('userData'))
  );

  const handleChange = (e) =>
    setCurrentUserData((data) => ({ ...data, [e.target.id]: e.target.value }));

  const handleClick = (data) => {
    const { email, password, newPassword } = currentUserData;

    if (data === 'email') {
      action.updateEmailDispatcher(email, (dataToast) => toast(dataToast));
      return;
    }

    if (data === 'password') {
      action.updatePasswordDispatcher(
        { email, password, newPassword },
        (dataToast) => toast(dataToast)
      );
      return;
    }

    action.updateUserDataDispatcher(
      { [data]: currentUserData[data] },
      (dataToast) => toast(dataToast)
    );
    return;
  };

  return (
    <Box w='100%'>
      <Text fontSize='3xl' mb={6}>
        Pengaturan Akun
      </Text>
      <Box mb={10}>
        <Grid templateColumns='repeat(2, 1fr)' gap={20} px={8}>
          <GridItem>
            <GlobalComponent.Form
              id='username'
              label='Username'
              type='text'
              value={currentUserData.username}
              onChange={handleChange}
              my={6}
            />
            <Flex justify='flex-end'>
              <Button
                colorScheme='blue'
                onClick={() => handleClick('username')}
              >
                Ganti username
              </Button>
            </Flex>
          </GridItem>
          <GridItem>
            <GlobalComponent.Form
              id='bio'
              label='Bio'
              type='text'
              value={currentUserData.bio}
              onChange={handleChange}
              my={6}
            />
            <Flex justify='flex-end'>
              <Button colorScheme='blue' onClick={() => handleClick('bio')}>
                Ganti bio
              </Button>
            </Flex>
          </GridItem>
        </Grid>
      </Box>
      <Box mb={10}>
        <Box px={8}>
          <GlobalComponent.Form
            id='about'
            label='Tentang'
            type='textarea'
            limitChar={300}
            currentCountChar={currentUserData.about.length}
            value={currentUserData.about}
            onChange={handleChange}
            my={6}
          />
          <Flex justify='flex-end'>
            <Button colorScheme='blue' onClick={() => handleClick('about')}>
              Ganti deskripsi
            </Button>
          </Flex>
        </Box>
      </Box>
      <Box mb={10}>
        <Grid templateColumns='repeat(2, 1fr)' px={8}>
          <GridItem>
            <GlobalComponent.Form
              id='email'
              label='Email'
              type='email'
              value={currentUserData.email}
              onChange={handleChange}
              my={6}
            />
            <Flex justify='flex-end'>
              <Button colorScheme='blue' onClick={() => handleClick('email')}>
                Ganti email
              </Button>
            </Flex>
          </GridItem>
        </Grid>
      </Box>
      <Box mb={10}>
        <Grid templateColumns='repeat(2, 1fr)' gap={20} px={8}>
          <GlobalComponent.GridForm
            id='password'
            label='Password Lama'
            type='password'
            value={currentUserData?.password}
            onChange={handleChange}
            my={6}
          />
          <GlobalComponent.GridForm
            id='newPassword'
            label='Password Baru'
            type='password'
            value={currentUserData?.newPassword}
            onChange={handleChange}
            my={6}
          />
        </Grid>
        <Flex justify='flex-end'>
          <Button colorScheme='blue' onClick={() => handleClick('password')}>
            Ganti password
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
