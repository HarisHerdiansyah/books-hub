import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { Context, PATH, utils } from '../../constants';
import {
  Box,
  Button,
  Flex,
  Text,
  useToast,
  useDisclosure,
  Menu,
  MenuButton,
  ModalBody,
  MenuList,
  MenuItem
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faChevronDown,
  faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons';
import { GlobalComponent } from '../../components';

export default function UILayout() {
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname } = useLocation();
  const { state, action } = useContext(Context);
  const { user } = state;
  const [currentSearchMethod, setCurrentSearchMethod] = useState('');
  const [inputSearch, setInputSearch] = useState('');

  const handleLogout = () => action.logoutDispatcher((data) => toast(data));

  const handleSearchMethod = (e) => setCurrentSearchMethod(e.target.value);

  const handleInput = (e) => setInputSearch(e.target.value);

  const handleClose = () => {
    setCurrentSearchMethod('');
    setInputSearch('');
    onClose();
  };

  const handleSearchAction = (e) => {
    e.preventDefault();
    handleClose();
    navigate({
      pathname: PATH.search,
      search: createSearchParams({
        [currentSearchMethod]: inputSearch
      }).toString()
    });
  };

  return (
    <Box bg='#392467' py={4} px={20}>
      <Flex align='center' justify='space-between'>
        <Flex align='center' gap={6}>
          <FontAwesomeIcon icon={faBook} color='white' size='2xl' />
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
        </Flex>
        {user.authState !== null && !pathname.includes('auth') ? (
          <Button colorScheme='gray' onClick={handleLogout}>
            Logout
          </Button>
        ) : null}
      </Flex>
      <GlobalComponent.Modal
        title='Cari data buku'
        size='xl'
        isOpen={isOpen}
        onClose={handleClose}
        closeBtn
      >
        <ModalBody>
          <Flex align='center' gap={6}>
            <Text fontSize='lg' fontWeight='semibold'>
              Metode Pencarian:{' '}
            </Text>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<FontAwesomeIcon icon={faChevronDown} />}
                colorScheme='blue'
              >
                {currentSearchMethod
                  ? utils.searchMethod[currentSearchMethod]
                  : 'Pilih'}
              </MenuButton>
              <MenuList>
                {Object.entries(utils.searchMethod).map((m) => (
                  <MenuItem
                    value={m[0]}
                    key={m[0]}
                    onClick={handleSearchMethod}
                  >
                    {m[1]}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Flex>
          <form onSubmit={handleSearchAction}>
            <GlobalComponent.Form
              id='search'
              type='text'
              value={inputSearch}
              onChange={handleInput}
              my={6}
            />
            <Flex justify='flex-end' mb={10}>
              <Button colorScheme='blue' type='submit'>
                Cari
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </GlobalComponent.Modal>
    </Box>
  );
}

UILayout.propTypes = {
  children: PropTypes.any
};
