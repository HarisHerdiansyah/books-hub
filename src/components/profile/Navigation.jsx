import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Text } from '@chakra-ui/react';

export default function Navigation({ text, path, className, params }) {
  const { pathname } = useLocation();
  const isActive = pathname.includes(path);
  const href = params ? `${path}/${params}` : path;

  return (
    <Text
      className={className}
      fontSize='xl'
      pb={1}
      fontWeight={isActive ? 'semibold' : 'normal'}
      borderBottom={isActive ? '2px solid black' : 'none'}
    >
      <Link to={href}>{text}</Link>
    </Text>
  );
}

Navigation.propTypes = {
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  params: PropTypes.string
};
