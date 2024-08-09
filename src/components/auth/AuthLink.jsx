import PropTypes from 'prop-types';
import { Button, Flex, Text } from '@chakra-ui/react';

export default function AuthLink({
  textContent,
  color,
  handleClick,
  linkContent,
  ...props
}) {
  return (
    <Flex align='center' justify='center' gap={1} my={1} {...props}>
      <Text>{textContent}</Text>
      <Button variant='link' colorScheme={color} onClick={handleClick}>
        {linkContent}
      </Button>
    </Flex>
  );
}

AuthLink.propTypes = {
  textContent: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  linkContent: PropTypes.string.isRequired
};
