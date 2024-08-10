import PropTypes from 'prop-types';
import { Flex, Button, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';

export default function Pagination({
  currentPage,
  totalPage,
  handlePrevPage,
  handleNextPage,
  ...props
}) {
  return totalPage > 1 ? (
    <Flex align='center' justify='space-between' {...props}>
      <Button
        colorScheme='teal'
        leftIcon={<FontAwesomeIcon icon={faChevronLeft} />}
        onClick={handlePrevPage}
        isDisabled={currentPage === 1}
      >
        Sebelumnya
      </Button>
      <Text fontSize='xl'>
        {currentPage} dari {totalPage}
      </Text>
      <Button
        colorScheme='teal'
        rightIcon={<FontAwesomeIcon icon={faChevronRight} />}
        onClick={handleNextPage}
        isDisabled={currentPage === totalPage}
      >
        Selanjutnya
      </Button>
    </Flex>
  ) : null;
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPage: PropTypes.number.isRequired,
  handlePrevPage: PropTypes.func.isRequired,
  handleNextPage: PropTypes.func.isRequired
};
