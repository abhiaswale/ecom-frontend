import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../Context/auth-context";
import AddressForm from "./AddressForm";

const Address = () => {
  const [isAddNew, setIsAddNew] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const authCtx = useContext(AuthContext);
  const [addresses, setAddresses] = useState([]);
  const [editAddress, setEditAddress] = useState();

  useEffect(() => {
    fetch("http://localhost:3000/user/details", {
      method: "GET",
      headers: { Authorization: authCtx.token },
    })
      .then((res) => res.json())
      .then((data) => {
        setAddresses(data.user.addresses);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const removeAddress = (id) => {
    fetch(`http://localhost:3000/user/remove-address/${id}`, {
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
          <div className="p-2 my-2" key={i._id}>
            <p className="font-semibold">{i.Name}</p>
            <section>
              {i.AddressLine1}&nbsp;
              {i.City}, {i.State}-{i.Pincode}
              <p>{i.Country}</p>
              <p>Mobile Number: {i.Mobile}</p>
            </section>
            <div>
              <button
                onClick={() => {
                  editHandler(i._id);
                }}
              >
                Edit
              </button>

              <button
                onClick={() => {
                  removeAddress(i._id);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </section>
      <div>
        <button
          onClick={() => {
            setIsAddNew(true);
          }}
        >
          Add Address
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
