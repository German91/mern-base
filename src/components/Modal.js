import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

const ReactModal = ({ isOpen, onClose, children }) => (
  <Modal show={ isOpen } onHide={ onClose }>
    <Modal.Body>
      { children }
    </Modal.Body>
  </Modal>
);

ReactModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default ReactModal;
