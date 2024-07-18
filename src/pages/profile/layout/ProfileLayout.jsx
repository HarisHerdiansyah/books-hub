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

  // console.log(userData);

  useEffect(() => {
    action.getBooksDispatcher(user.userData?.uid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.userData?.uid]);

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
                name={`${user.userData?.firstName} ${user.userData?.lastName}`}
                src={user.userData?.profilePhotoURL}
                boxSize='220px'
                objectFit='cover'
                borderRadius='full'
              />
            </Box>
            <CardHeader>
              <Text fontSize='3xl' fontWeight='semibold'>
                {user.userData?.firstName}
              </Text>
              <Text fontSize='xl'>@{user.userData?.username}</Text>
              <Text fontSize='lg'>{user.userData?.bio}</Text>
            </CardHeader>
            <CardBody>
              <Text fontSize='xl'>About Me:</Text>
              <Text>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Commodi temporibus ipsam iure eos cupiditate quo nostrum ratione
                vel laudantium aspernatur nulla, reiciendis sunt officia
                assumenda quam hic corporis corrupti culpa quod adipisci
                tenetur? Minus et iure quis! Expedita possimus sit provident
                velit reprehenderit, quasi illum!
              </Text>
            </CardBody>
          </Card>
        </Box>
        <Outlet />
      </Flex>
    </Box>
  );
}
