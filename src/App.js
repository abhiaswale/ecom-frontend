import "./App.css";
import Landing from "./components/Landing/Landing";
import Shop from "./components/Shop/Shop";
import Login from "./components/Login/Login";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./components/util/PrivateRoute";
import Account from "./components/Account/Account";
import Profile from "./components/Account/Profile";
import Prod from "./components/Prod";
import Footer from "./components/Footer/Footer";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/" element={<Landing />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          }
        >
          <Route path="" element={<Profile />}></Route>
          <Route path="cart" element={<Prod />}></Route>
          <Route path="address" element={<>hi address</>}></Route>
          <Route path="setting" element={<>hi setting</>}></Route>
          <Route path="wishlist" element={<></>}></Route>
          <Route path="cart" element={<>hi cart</>}></Route>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
