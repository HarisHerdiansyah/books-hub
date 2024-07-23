import { useContext, useState } from 'react';
import { Box, Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import { GlobalComponent } from '../../../components';
import { Context } from '../../../constants';

export default function Settings() {
  const { state } = useContext(Context);
  const { user } = state;
  const [accountData, setAccountData] = useState(user.userData);

  const handleChange = (e) =>
    setAccountData((data) => ({ ...data, [e.target.id]: e.target.value }));

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
              value={accountData.username}
              onChange={handleChange}
              my={6}
            />
            <Flex justify='flex-end'>
              <Button colorScheme='blue'>Ganti username</Button>
            </Flex>
          </GridItem>
          <GridItem>
            <GlobalComponent.Form
              id='bio'
              label='Bio'
              type='text'
              value={accountData.bio}
              onChange={handleChange}
              my={6}
            />
            <Flex justify='flex-end'>
              <Button colorScheme='blue'>Ganti bio</Button>
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
            currentCountChar={accountData.about.length}
            value={accountData.about}
            onChange={handleChange}
            my={6}
          />
          <Flex justify='flex-end'>
            <Button colorScheme='blue'>Ganti deskripsi</Button>
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
              value={accountData.email}
              onChange={handleChange}
              my={6}
            />
            <Flex justify='flex-end'>
              <Button colorScheme='blue'>Ganti email</Button>
            </Flex>
          </GridItem>
        </Grid>
      </Box>
      <Box mb={10}>
        <Grid templateColumns='repeat(2, 1fr)' gap={20} px={8}>
          <GlobalComponent.GridForm
            id='password'
            label='Password'
            type='password'
            my={6}
          />
          <GlobalComponent.GridForm
            id='confirm_password'
            label='Konfimarsi Password'
            type='password'
            my={6}
          />
        </Grid>
        <Flex justify='flex-end'>
          <Button colorScheme='blue'>Ganti password</Button>
        </Flex>
      </Box>
    </Box>
  );
}
