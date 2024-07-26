import { useContext, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ProfileComponent } from '../../../components';
import {
  Box,
  Flex,
  Text,
  Card,
  CardBody,
  CardHeader,
  Image
} from '@chakra-ui/react';
import { Context, utils } from '../../../constants';

export default function ProfileLayout() {
  const { state, action } = useContext(Context);
  const { user } = state;
  const { pathname } = useLocation();
  const isShowcase = pathname.includes('showcase');
  const navlink = isShowcase ? utils.showcaseNavLink : utils.profileNavLink;
  const userData = JSON.parse(window.sessionStorage.getItem('userData'));

  useEffect(() => {
    const unsubscribe = action.setBooksDispatcher(user.authState?.uid);
    return () => unsubscribe();
  }, [action, user.authState?.uid]);

  return (
    <Box py={4} px={20}>
      <Flex justify='flex-end' gap={6}>
        {navlink.map((nav, i) => (
          <ProfileComponent.Navigation
            key={i}
            text={nav.text}
            path={nav.path}
            className='navigation'
          />
        ))}
      </Flex>
      <Flex my={8} gap={8}>
        <Box w={350}>
          <Card pt={10} pb={8} w={350} h={700} color='white' bg='#392467'>
            <Box m='auto'>
              <Image
                name={`${userData.firstName} ${userData.lastName}`}
                src={userData.profilePhotoURL}
                boxSize='220px'
                objectFit='cover'
                borderRadius='full'
              />
            </Box>
            <CardHeader>
              <Text fontSize='2xl' fontWeight='semibold'>
                {userData.firstName}
              </Text>
              <Text fontSize='lg'>@{userData.username}</Text>
              <Text fontSize='md'>{userData.bio}</Text>
            </CardHeader>
            <CardBody>
              <Text fontSize='lg' fontWeight='semibold' mb={3}>
                About Me:
              </Text>
              <Text align='justify'>{userData.about}</Text>
            </CardBody>
          </Card>
        </Box>
        <Outlet />
      </Flex>
    </Box>
  );
}
