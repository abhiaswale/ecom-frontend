import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/auth-context";
import Modal from "../Modal/Modal";
import { AddressDetails } from "../util/TempLogin";

const AddressForm = (props) => {
  const authCtx = useContext(AuthContext);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Maharashtra");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("India");
  const [mobile, setMobile] = useState("");

  // const [editAddress, setEditAddress] = useState();
  // const [isEdit, setIsEdit] = useState(false);
  // const [addresses, setAddresses] = useState([]);

  let options = [
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Goa", label: "Goa" },
  ];

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

  const cancelHandler = () => {
    console.log("called");
    props.isEdit ? props.setIsEdit(false) : props.setIsAddNew(false);
  };

  const setDummyDetails = () => {
    setCountry(AddressDetails.country);
    setName(AddressDetails.name);
    setAddress(AddressDetails.address);
    setState(AddressDetails.state);
    setPincode(AddressDetails.pincode);
    setMobile(AddressDetails.mobile);
    setCity(AddressDetails.city);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!name) {
    }
    let url = "http://localhost:3000/add-address";
    let method = "POST";
    if (props.isEdit) {
      url = `http://localhost:3000/edit-address/${props.addressData._id}`;
      method = "PUT";
    }

    fetch(url, {
      method: method,
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

  return (
    <Modal>
      <form
        onSubmit={submitHandler}
        className="text-sm lg:text-base absolute w-11/12 lg:w-2/5 top-[22%] left-[4%] lg:top-[15%] lg:left-[30%] p-4 flex justify-center  flex-col bg-white"
      >
        <h4 className="text-xl font-semibold">Add Address</h4>
        <label>
          <select
            className="w-full my-2 focus:outline-none focus:shadow-outline rounded-lg border-[1px] border-gray-300 p-2"
            defalutValue={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          >
            <option value="India">India</option>
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
          className="my-2 focus:outline-none focus:shadow-outline rounded-lg border-[1px] border-gray-300 p-2"
        />
        <input
          type="text"
          placeholder="Enter House no., street, colony"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          defaultValue={address}
          className="my-2 focus:outline-none focus:shadow-outline rounded-lg border-[1px] border-gray-300 p-2"
        />
        <input
          type="text"
          placeholder="Enter city"
          onChange={(e) => {
            setCity(e.target.value);
          }}
          defaultValue={city}
          className="my-2 focus:outline-none focus:shadow-outline rounded-lg border-[1px] border-gray-300 p-2"
        />
        <label>
          <select
            onChange={(e) => {
              setState(e.target.value);
            }}
            defaultValue={state}
            className="w-full my-2 focus:outline-none focus:shadow-outline rounded-lg border-[1px] border-gray-300 p-2"
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
          className="my-2 focus:outline-none focus:shadow-outline rounded-lg border-[1px] border-gray-300 p-2"
        />
        <input
          type="text"
          placeholder="Enter mobile number"
          onChange={(e) => {
            setMobile(e.target.value);
          }}
          defaultValue={mobile}
          className="my-2 focus:outline-none focus:shadow-outline rounded-lg border-[1px] border-gray-300 p-2"
        />
        <section className="flex justify-start items-center text-sm">
          <button
            type="submit"
            className=" mr-1 text-white my-4 p-2 px-5 rounded-lg bg-[#0E3EDA] hover:bg-[#3053c8]"
          >
            Save
          </button>
          <button
            onClick={() => {
              setDummyDetails();
            }}
            className="mx-1 rounded-lg border-[1px] border-gray-300 p-2 hover:bg-[#3053c8] hover:text-white"
          >
            Fill with dummy details
          </button>
          <button
            type="submit"
            onClick={() => {
              cancelHandler();
            }}
            className="mx-1 rounded-lg border-[1px] border-gray-300 p-2 hover:bg-[#3053c8] hover:text-white"
          >
            Cancel
          </button>
        </section>
      </form>
    </Modal>
  );
};

export default AddressForm;
