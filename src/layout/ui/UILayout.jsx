import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../../constants';
import { Auth } from '../../service';
import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';

export default function UILayout() {
  const { state } = useContext(Context);
  const { auth } = state;

  const handleLogout = async () => await Auth.logout();

  return (
    <Box bg='#392467' py={4} px={20}>
      <Flex align='center' justify='space-between'>
        <Flex align='center' gap={3}>
          <FontAwesomeIcon icon={faBook} color='white' size='xl' />
          <Text color='white' fontSize='2xl'>
            Books Hub
          </Text>
        </Flex>
        {auth.user !== null && (
          <Button colorScheme='gray' onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Flex>
    </Box>
  );
}

UILayout.propTypes = {
  children: PropTypes.any
};
