import React, { useState } from "react";
import AddressCard from "../Address/AddressCard";
import Modal from "../Modal/Modal";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import AddressForm from "../Address/AddressForm";

const AddressSelector = (props) => {
  const [isAddNew, setIsAddNew] = useState(false);
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
        <div className="bg-white my-3 h-auto w-11/12 lg:w-2/5 absolute top-[15%] left-[4%] lg:left-[28%]">
          <div>
            <div className="flex justify-end items-center p-2">
              <CloseIcon
                onClick={() => {
                  props.selection(false);
                }}
              />
            </div>
            <div>
              {props.addresses.map((a) => (
                <label
                  key={a._id}
                  className="flex justify-start items-baseline p-4"
                >
                  <input
                    type="radio"
                    name="address"
                    value={a._id}
                    onChange={addressSelector}
                    className=""
                  />
                  <AddressCard i={a} setAddresses={props.setAddresses} />
                </label>
              ))}
            </div>
            <div className="flex justify-center items-center py-4">
              <button
                className="font-semibold"
                onClick={() => {
                  setIsAddNew(true);
                }}
              >
                <AddIcon /> ADD NEW ADDRESS
              </button>
            </div>
          </div>
        </div>
        {isAddNew && (
          <AddressForm
            setAddresses={props.setAddresses}
            setIsAddNew={setIsAddNew}
          />
        )}
      </div>
    </Modal>
  );
};

export default AddressSelector;
