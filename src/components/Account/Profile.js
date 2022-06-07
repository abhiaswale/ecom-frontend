import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/auth-context";

const Profile = () => {
  const [userData, setUserData] = useState();
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = () => {
    fetch("http://localhost:3000/user/details", {
      method: "GET",
      headers: { Authorization: authCtx.token },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.user);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="text-left m-6">
      {userData && (
        <div>
          <h3 className=" font-semibold">PROFILE DETAILS</h3>
          <div className="my-4 w-2/3">
            <section className="my-2 grid grid-cols-2">
              <p>Full Name :</p>
              <p>
                {userData.firstName} {userData.lastName}
              </p>
            </section>
            <section className="my-2 grid grid-cols-2">
              <p>Email :</p>
              <p>{userData.email}</p>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
