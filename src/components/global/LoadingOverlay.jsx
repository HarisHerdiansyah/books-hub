import { Flex, Spinner } from '@chakra-ui/react';

export default function LoadingOverlay() {
  return (
    <Flex
      align='center'
      justify='center'
      position='absolute'
      inset={0}
      zIndex={999}
      backgroundColor='rgba(0, 0, 0, 0.5)'
      height='100%'
    >
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
