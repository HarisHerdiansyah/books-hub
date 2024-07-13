import PropTypes from 'prop-types';
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton
} from '@chakra-ui/react';

export default function Modal({
  children,
  title,
  isOpen,
  onClose,
  closeBtn,
  size
}) {
  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      size={size}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        {closeBtn && <ModalCloseButton />}
        {children}
      </ModalContent>
    </ChakraModal>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  size: PropTypes.string,
  children: PropTypes.any,
  closeBtn: PropTypes.bool
};
