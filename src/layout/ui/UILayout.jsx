import { useContext } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { Context } from '../../constants';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

export default function UILayout() {
  const { pathname } = useLocation();
  const { state, action } = useContext(Context);
  const { user } = state;

  const handleLogout = () => action.logoutDispatcher();

  return (
    <Box bg='#392467' py={4} px={20}>
      <Flex align='center' justify='space-between'>
        <Flex align='center' gap={3}>
          <FontAwesomeIcon icon={faBook} color='white' size='xl' />
          <Text color='white' fontSize='2xl'>
            Books Hub
          </Text>
        </Flex>
        {user.authState !== null && !pathname.includes('auth') ? (
          <Button colorScheme='gray' onClick={handleLogout}>
            Logout
          </Button>
        ) : null}
      </Flex>
    </Box>
  );
}

UILayout.propTypes = {
  children: PropTypes.any
};
