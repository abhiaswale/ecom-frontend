import React, { useContext, useState, useEffect } from "react";

import AuthContext from "../Context/auth-context";
import AddressForm from "./AddressForm";

const Address = () => {
  const [isAddNew, setIsAddNew] = useState(false);
  const authCtx = useContext(AuthContext);

  const [addresses, setAddresses] = useState();

  useEffect(() => {
    fetch("http://localhost:3000/user/details", {
      method: "GET",
      headers: { Authorization: authCtx.token },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <section>
        {addresses.map((i) => (
          <p>{i.Name}</p>
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
      {isAddNew && <AddressForm setIsAddNew={setIsAddNew} />}
    </>
  );
};

export default Address;
