import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/auth-context";
import Modal from "../Modal/Modal";

const AddressForm = (props) => {
  const authCtx = useContext(AuthContext);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Maharashtra");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("India");
  const [mobile, setMobile] = useState("");

  let options = [
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Goa", label: "Goa" },
  ];

  const addAddress = () => {
    fetch("http://localhost:3000/user/add-address", {
      method: "POST",
      headers: {
        Authorization: authCtx.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        addressline1: address,
        city: city,
        state: state,
        mobile: mobile,
        pincode: pincode,
        country: country,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        props.setAddresses(data.data);
        cancelHandler();
      });
  };

  useEffect(() => {
    if (props.isEdit) {
      const addressData = props.addressData;
      console.log(addressData);
      setCountry(addressData.Country);
      setName(addressData.Name);
      setAddress(addressData.AddressLine1);
      setState(addressData.State);
      setPincode(addressData.Pincode);
      setMobile(addressData.Mobile);
      setCity(addressData.City);
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(name);
    console.log(address);
    console.log(city);
    console.log(state);
    console.log(mobile);
    console.log(pincode);
    addAddress();
  };

  const cancelHandler = () => {
    props.isEdit ? props.setIsEdit(false) : props.setIsAddNew(false);
  };

  return (
    <Modal>
      <form
        onSubmit={submitHandler}
        className="absolute w-2/5 top-1/3 left-1/3 p-3 flex justify-center items-center flex-col bg-blue-300"
      >
        <h4>Add Address</h4>
        <label>
          <select
            className="w-full"
            defalutValue={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          >
            <option value="India">India</option>
            <option value="Australia">Australia</option>
          </select>
        </label>
        <input
          type="text"
          placeholder="Enter name"
          name="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
          defaultValue={name}
        />
        <input
          type="text"
          placeholder="Enter House no., street, colony"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          defaultValue={address}
        />
        <input
          type="text"
          placeholder="Enter city"
          onChange={(e) => {
            setCity(e.target.value);
          }}
          defaultValue={city}
        />
        <label>
          State
          <select
            onChange={(e) => {
              setState(e.target.value);
            }}
            defaultValue={state}
          >
            {options.map((opt, i) => (
              <option key={i} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
        <input
          type="number"
          placeholder="Enter pincode"
          onChange={(e) => {
            setPincode(e.target.value);
          }}
          defaultValue={pincode}
        />
        <input
          type="text"
          placeholder="Enter mobile number"
          onChange={(e) => {
            setMobile(e.target.value);
          }}
          defaultValue={mobile}
        />
        <section>
          <button type="submit">Save</button>
          <button>Fill with dummy details</button>
          <button
            type="submit"
            onClick={() => {
              cancelHandler();
            }}
          >
            Cancel
          </button>
        </section>
      </form>
    </Modal>
  );
};

export default AddressForm;
