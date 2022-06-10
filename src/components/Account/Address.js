import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

import AuthContext from "../Context/auth-context";
import AddressForm from "../Address/AddressForm";
import AddressCard from "../Address/AddressCard";

const Address = () => {
  const [isAddNew, setIsAddNew] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const authCtx = useContext(AuthContext);
  const [addresses, setAddresses] = useState([]);
  const [editAddress, setEditAddress] = useState();

  useEffect(() => {
    fetch("http://localhost:3000/get-addresses", {
      method: "GET",
      headers: { Authorization: authCtx.token },
    })
      .then((res) => res.json())
      .then((data) => {
        setAddresses(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const editHandler = (id) => {
    console.log(id);
    setIsEdit(true);
    const aD = addresses.filter((a) => a._id === id);
    setEditAddress(aD[0]);
    console.log(aD);
  };

  return (
    <div className="text-left m-6">
      <h3 className="font-semibold my-6">MY ADDRESSES</h3>
      <section>
        {addresses.map((i) => (
          <AddressCard
            i={i}
            editAddress={editHandler}
            setAddresses={setAddresses}
          />
        ))}
      </section>
      <div className=" my-8 ">
        <button
          className="font-semibold"
          onClick={() => {
            setIsAddNew(true);
          }}
        >
          <AddIcon /> ADD NEW ADDRESS
        </button>
      </div>
      {isAddNew && (
        <AddressForm setAddresses={setAddresses} setIsAddNew={setIsAddNew} />
      )}
      {isEdit && (
        <AddressForm
          addresses={addresses}
          setAddresses={setAddresses}
          isEdit={isEdit}
          addressData={editAddress}
          setIsEdit={setIsEdit}
        />
      )}
    </div>
  );
};

export default Address;
