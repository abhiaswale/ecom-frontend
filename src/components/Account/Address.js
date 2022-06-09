import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

import AuthContext from "../Context/auth-context";
import AddressForm from "./AddressForm";

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

  const removeAddress = (id) => {
    fetch(`http://localhost:3000/remove-address/${id}`, {
      method: "POST",
      headers: {
        Authorization: authCtx.token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAddresses(data.data);
        console.log(data);
      });
  };

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
          <div className="my-2" key={i._id}>
            <p className="font-semibold ">{i.Name}</p>
            <section className="my-2 ">
              {i.AddressLine1}&nbsp;
              {i.City}, {i.State}-{i.Pincode}
              <p>{i.Country}</p>
              <p>Mobile Number: {i.Mobile}</p>
            </section>
            <div className="flex justify-start items-start">
              <div className="">
                <button
                  className="text-sm text-white my-2 p-[4px] px-4 border-[0.5px] border-[#0E3EDA] rounded-lg bg-[#0E3EDA] hover:bg-[#3053c8]"
                  onClick={() => {
                    editHandler(i._id);
                  }}
                >
                  Edit
                </button>
              </div>
              <div className="ml-4">
                <button
                  className="text-sm border-[0.5px] border-black my-2 p-[4px] px-4 rounded-lg  hover:bg-[#3f404353]"
                  onClick={() => {
                    removeAddress(i._id);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
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
