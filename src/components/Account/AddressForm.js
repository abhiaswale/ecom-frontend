import React, { useContext, useState } from "react";
import AuthContext from "../Context/auth-context";
import Modal from "../Modal/Modal";

const AddressForm = (props) => {
  const authCtx = useContext(AuthContext);
  const [country, setCountry] = useState("India");
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [state, setState] = useState();
  const [pincode, setPincode] = useState();
  const [mobile, setMobile] = useState();
  let options = [
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Goa", label: "Goa" },
  ];

  const countrySelector = (e) => {
    setCountry(e.target.value);
  };

  const addAddress = () => {
    fetch("http://localhost:3000/user/add-address", {
      method: "POST",
      headers: {
        Authorization: authCtx.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: name,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  const submitHandler = () => {
    console.log(name);
    addAddress();
  };
  return (
    <Modal>
      <form
        onSubmit={submitHandler}
        className="absolute w-2/5 top-1/3 left-1/3 p-3 flex justify-center items-center flex-col bg-blue-300"
      >
        <h4>Add Address</h4>
        <label>
          <select className="w-full" value={country} onChange={countrySelector}>
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
        />
        <input type="text" placeholder="Enter House no., street, colony" />
        <input type="text" placeholder="Enter city" />
        <label>
          State
          <select>
            {options.map((opt, i) => (
              <option key={i} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
        <input type="number" placeholder="Enter pincode" />
        <input type="number" placeholder="Enter mobile number" />
        <section>
          <button type="submit">Save</button>
          <button>Fill with dummy details</button>
          <button
            onClick={() => {
              props.setIsAddNew(false);
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
