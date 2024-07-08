import { Outlet } from 'react-router-dom';
import { Navigation } from '../../../components/profile';
import { Box, Flex, Text, Card, CardBody, CardHeader } from '@chakra-ui/react';
import { profileNavLink } from '../../../constants';

export default function ProfileLayout() {
  return (
    <Box py={4} px={20}>
      <Flex justify='flex-end' gap={6}>
        {profileNavLink.map((nav, i) => (
          <Navigation
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
                Maya Astuti
              </Text>
              <Text fontSize='2xl'>@mayaa</Text>
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
