import React from "react";
import AddressCard from "../Address/AddressCard";
import Modal from "../Modal/Modal";
import CloseIcon from "@mui/icons-material/Close";

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
      <div className="bg-white bg-opacity-50 w-full h-full relative">
        <div className="bg-white h-auto w-2/5 absolute top-[28%] left-[28%]">
          <div className="">
            <CloseIcon
              onClick={() => {
                props.selection(false);
              }}
            />
            {props.addresses.map((a) => (
              <label className="flex justify-start items-baseline p-4">
                <input
                  type="radio"
                  name="address"
                  value={a._id}
                  onChange={addressSelector}
                />
                <AddressCard i={a} setAddresses={props.setAddresses} />
              </label>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AddressSelector;
