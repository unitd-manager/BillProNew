import React from 'react';
import {

  Input,
  Button,
  Modal,

  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';



const DiscountModal = ({  addDiscountModal,
  setAddDiscountModal,
  editTenderData,
  tenderDetails,
  handleInputs,
 }) => {
  DiscountModal.propTypes = {
    editTenderData: PropTypes.func,
    tenderDetails: PropTypes.object,
    handleInputs: PropTypes.object,
      addDiscountModal: PropTypes.bool,
      setAddDiscountModal: PropTypes.func,
    
    };
  
  // const editTenderById = () => {
  //   api.post('/tradingquote/getTradingquoteById', { quote_id: quoteLine }).then((res) => {
  //     setDiscount(res.data.data);
  //     message('Discount inserted successfully.', 'success');

  //   });
  // };

  // const handleDiscountChange = (e) => {
  //   setDiscount(e.target.value);
  // };

  return (
    <Modal size="l" isOpen={addDiscountModal}>
     <ModalHeader>
          Add Discount
          <Button
            className="shadow-none"
            color="secondary"
            onClick={() => {
              setAddDiscountModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>
      <ModalBody>
        <Input
          type="text"
          onChange={handleInputs}
          name="discount"
          value={tenderDetails && tenderDetails.discount}
         
        />
      </ModalBody>
      <ModalFooter>
        <Button color="primary"  onClick={() => {
                  editTenderData();
                }}>
          Save
        </Button>{' '}
        <Button
                      className="shadow-none"
                      color="secondary"
                      onClick={() => {
                        setAddDiscountModal(false);
                      }}
                    >
                      Cancel
                    </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DiscountModal;
