import { Outlet, Link, useLocation } from 'react-router-dom';
import { path as profilePath } from '.';
import { Box, Flex, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import './ProfileLayout.css';

export default function ProfileLayout() {
  const location = useLocation();

  return (
    <>
      <Box bg='#392467' py={4} px={20}>
        <Flex align='center' gap={3}>
          <FontAwesomeIcon icon={faBook} color='white' size='xl' />
          <Text color='white' fontSize='2xl'>
            <Link to={profilePath.overview}>Book Hub / Maya Astuti</Link>
          </Text>
        </Flex>
      </Box>
      <Box py={4} px={20}>
        <Flex justify='flex-end' gap={6}>
          <Text
            className='navigation'
            fontSize='xl'
            pb={1}
            fontWeight={
              location.pathname == profilePath.overview ? 'semibold' : 'normal'
            }
            borderBottom={
              location.pathname == profilePath.overview
                ? '2px solid black'
                : 'none'
            }
          >
            <Link to={profilePath.overview}>Overview</Link>
          </Text>
          <Text
            className='navigation'
            fontSize='xl'
            pb={1}
            fontWeight={
              location.pathname == profilePath.books ? 'semibold' : 'normal'
            }
            borderBottom={
              location.pathname == profilePath.books
                ? '2px solid black'
                : 'none'
            }
          >
            <Link to={profilePath.books}>Books</Link>
          </Text>
          <Text
            className='navigation'
            fontSize='xl'
            pb={1}
            fontWeight={
              location.pathname == profilePath.article ? 'semibold' : 'normal'
            }
            borderBottom={
              location.pathname == profilePath.article
                ? '2px solid black'
                : 'none'
            }
          >
            <Link to={profilePath.article}>Article</Link>
          </Text>
          <Text
            className='navigation'
            fontSize='xl'
            pb={1}
            fontWeight={
              location.pathname == profilePath.settings ? 'semibold' : 'normal'
            }
            borderBottom={
              location.pathname == profilePath.settings
                ? '2px solid black'
                : 'none'
            }
          >
            <Link to={profilePath.settings}>Settings</Link>
          </Text>
        </Flex>
        <Outlet />
      </Box>
    </>
  );
}
