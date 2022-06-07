import React from "react";
import Modal from "../Modal/Modal";

const AddressSelector = (props) => {
  const addressSelector = (e) => {
    props.addresses.forEach((a) => {
      if (e.target.value === a._id) {
        props.addressSelector(a);
        props.selection(false);
      }
    });
  };
  return (
    <Modal>
      <div className="bg-gray-600">
        <div>AddressSelector</div>
        {props.addresses.map((a) => (
          <label>
            <input
              type="radio"
              name="address"
              value={a._id}
              onChange={addressSelector}
            />
            {a.Name}
          </label>
        ))}
      </div>
    </Modal>
  );
};

export default AddressSelector;
