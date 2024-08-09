import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate, createSearchParams } from 'react-router-dom';
import { Context, PATH } from '../../constants';
import {
  Box,
  Button,
  Flex,
  Text,
  useToast,
  useDisclosure,
  ModalBody,
  Input
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { GlobalComponent } from '../../components';

export default function UILayout() {
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname } = useLocation();
  const { state, action } = useContext(Context);
  const { user } = state;
  const [inputSearch, setInputSearch] = useState('');
  const isLoggedIn = user.authState !== null && !pathname.includes('auth');

  const handleLogout = () => action.logoutDispatcher((data) => toast(data));

  const handleInput = (e) => setInputSearch(e.target.value);

  const handleClose = () => {
    setInputSearch('');
    onClose();
  };

  const handleBackToHome = () => navigate(PATH.profile.overview);

  const handleSearchAction = (e) => {
    e.preventDefault();
    handleClose();
    navigate({
      pathname: PATH.search,
      search: createSearchParams({
        q: inputSearch
      }).toString()
    });
  };

  return (
    <>
      <Box bg='#392467' py={4} px={20}>
        <Flex align='center' justify='space-between'>
          <Flex align='center' gap={6}>
            <FontAwesomeIcon
              icon={faBook}
              color='white'
              size='2xl'
              cursor='pointer'
              onClick={handleBackToHome}
            />
            {isLoggedIn ? (
              <Flex
                onClick={onOpen}
                align='center'
                gap={2}
                bgColor='white'
                py={1}
                px={4}
                borderRadius='5px'
                w={250}
                cursor='pointer'
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
                <Text fontSize='lg'>Cari</Text>
              </Flex>
            ) : (
              <Text color='white' fontWeight='semibold' fontSize='3xl'>
                Books Hub
              </Text>
            )}
          </Flex>
          {isLoggedIn && (
            <Button colorScheme='gray' onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Flex>
      </Box>
      <GlobalComponent.Modal
        title='Cari data buku'
        size='xl'
        isOpen={isOpen}
        onClose={handleClose}
        closeBtn
      >
        <ModalBody>
          <form onSubmit={handleSearchAction}>
            <Input
              my={8}
              type='text'
              id='search'
              value={inputSearch}
              onChange={handleInput}
              variant='flushed'
              autoComplete='off'
              borderBottomColor='gray'
              borderBottomWidth={2}
            />
            <Flex justify='flex-end' mb={10}>
              <Button
                colorScheme='blue'
                type='submit'
                isDisabled={!inputSearch}
              >
                Cari
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </GlobalComponent.Modal>
    </>
  );
}

UILayout.propTypes = {
  children: PropTypes.any
};
