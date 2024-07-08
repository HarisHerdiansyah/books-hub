import PropTypes from 'prop-types';
import { mockAuth } from '../helper/mockAsync';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

export default function RootLayout({ children }) {
  const isLogin = window.localStorage.getItem('auth');

  return (
    <>
      <Box bg='#392467' py={4} px={20}>
        <Flex align='center' justify='space-between'>
          <Flex align='center' gap={3}>
            <FontAwesomeIcon icon={faBook} color='white' size='xl' />
            <Text color='white' fontSize='2xl'>
              Book Hub / {'<Display Name>'}
            </Text>
          </Flex>
          {isLogin !== null && (
            <Button colorScheme='gray' onClick={mockAuth.logout}>
              Logout
            </Button>
          )}
        </Flex>
      </Box>
      {children}
    </>
  );
}

RootLayout.propTypes = {
  children: PropTypes.any.isRequired
};
