import { useContext, useEffect } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
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
  const { showcaseUserId } = useParams();
  const { pathname } = useLocation();
  const isShowcase = pathname.includes('showcase');
  const navlink = isShowcase ? utils.showcaseNavLink : utils.profileNavLink;
  const userData = JSON.parse(window.sessionStorage.getItem('userData'));
  const profileData = isShowcase ? user.ownerData : userData;

  useEffect(() => {
    const targetUser = isShowcase ? showcaseUserId : user.authState?.uid;
    const unsubscribe = action.setBooksDispatcher(targetUser, isShowcase);
    return () => unsubscribe();
  }, [action, user.authState?.uid, isShowcase, showcaseUserId]);

  useEffect(() => {
    if (isShowcase) {
      action.setOwnerDataDispatcher(showcaseUserId);
    }
  }, [isShowcase, action, showcaseUserId]);

  return (
    <Box py={4} px={20}>
      <Flex justify='flex-end' gap={6}>
        {navlink.map((nav, i) => (
          <ProfileComponent.Navigation
            key={i}
            text={nav.text}
            path={nav.path}
            className='navigation'
            params={showcaseUserId || ''}
          />
        ))}
      </Flex>
      <Flex my={8} gap={8}>
        <Box w={350}>
          <Card pt={10} pb={8} w={350} h={700} color='white' bg='#392467'>
            <Box m='auto'>
              <Image
                name={`${profileData.firstName} ${profileData.lastName}`}
                src={profileData.profilePhotoURL}
                boxSize='220px'
                objectFit='cover'
                borderRadius='full'
              />
            </Box>
            <CardHeader>
              <Text fontSize='2xl' fontWeight='semibold'>
                {profileData.firstName}
              </Text>
              <Text fontSize='lg'>@{profileData.username}</Text>
              <Text fontSize='md'>{profileData.bio}</Text>
            </CardHeader>
            <CardBody>
              <Text fontSize='lg' fontWeight='semibold' mb={3}>
                About Me:
              </Text>
              <Text align='justify'>{profileData.about}</Text>
            </CardBody>
          </Card>
        </Box>
        <Outlet />
      </Flex>
    </Box>
  );
}
