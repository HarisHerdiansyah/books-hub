import { useContext, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { ProfileComponent } from '../../../components';
import { Box, Flex, Text, Card, CardBody, CardHeader } from '@chakra-ui/react';
import { Context, utils } from '../../../constants';

export default function ProfileLayout() {
  const { state, action } = useContext(Context);
  const { auth } = state;
  const { pathname } = useLocation();
  const isShowcase = pathname.includes('showcase');
  const navlink = isShowcase ? utils.showcaseNavLink : utils.profileNavLink;

  useEffect(() => {
    action.getBooksDispatcher(auth.user.uid);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <Card pt={10} pb={8} w={350} color='white' bg='#392467'>
            <Box
              w={225}
              h={225}
              border={'1px solid black'}
              m='auto'
              borderRadius={150}
              bg='white'
            ></Box>
            <CardHeader>
              <Text fontSize='3xl' fontWeight='semibold'>
                {isShowcase ? 'Haris Herdiansyah' : 'Maya Astuti'}
              </Text>
              <Text fontSize='2xl'>
                {isShowcase ? '@harisherdian_' : '@mayaaa'}
              </Text>
            </CardHeader>
            <CardBody>
              <Text>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Repellat fuga, velit atque earum consequatur veritatis! At ullam
                aperiam alias asperiores, nostrum culpa quos. Porro aut,
                voluptates magni at nam minus.
              </Text>
            </CardBody>
          </Card>
        </Box>
        <Outlet />
      </Flex>
    </Box>
  );
}
