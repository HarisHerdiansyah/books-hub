import PropTypes from 'prop-types';
import { Flex, Spinner, Text } from '@chakra-ui/react';

export default function LoadingOverlay({ text }) {
  return (
    <Flex
      align='center'
      justify='center'
      position='fixed'
      inset={0}
      zIndex={999}
      backgroundColor='rgba(0, 0, 0, 0.5)'
      gap={4}
    >
      {text && (
        <Text fontSize='4xl' color='white'>
          {text}
        </Text>
      )}
      <Spinner
        thickness='5px'
        speed='0.65s'
        emptyColor='white'
        color='#392467'
        size='xl'
      />
    </Flex>
  );
}

LoadingOverlay.propTypes = {
  text: PropTypes.string
};
