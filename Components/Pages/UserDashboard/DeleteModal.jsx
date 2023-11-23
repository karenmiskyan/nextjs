import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Btn } from '../../AbstractElements';
import { Areyousuretodelete  } from '../../Constant';
const DeleteModal = () => {
  const dispatch = useDispatch();
  const { isDelete } = useSelector((state) => state.ModalReducer);
  const toggle = () => {
    dispatch({ type: 'OPENDELETEMODAL' });
  };
  const RedirectModal = () => {
    dispatch({ type: 'OPENDELETEMODAL' });
    dispatch({ type: 'CONFIRMDELETE' });
  };
  return (
    <>
      <Modal className='delete-account-modal' fade id='deleteModal' isOpen={isDelete} toggle={toggle}>
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody className='pb-3 text-center mt-4'>
          <h4>{Areyousuretodelete}</h4>
        </ModalBody>
        <ModalFooter className='d-block text-center mb-4'>
          <Btn attrBtn={{ className: 'btn btn-solid-default btn-sm fw-bold rounded', onClick: RedirectModal }}>"Yes"</Btn>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default DeleteModal;
