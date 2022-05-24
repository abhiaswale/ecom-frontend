import "./App.css";
import Landing from "./components/Landing/Landing";
import Shop from "./components/Shop/Shop";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./components/util/PrivateRoute";
import Account from "./components/Account/Account";
import Profile from "./components/Account/Profile";
import Prod from "./components/Prod";
import Footer from "./components/Footer/Footer";
import Signup from "./pages/Signup";
import Address from "./components/Account/Address";
import SearchPage from "./pages/SearchPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/search" element={<SearchPage />}></Route>
        <Route path="/" element={<Landing />} />
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          }
        >
          <Route path="" element={<Profile />}></Route>
          <Route path="cart" element={<Prod />}></Route>
          <Route path="address" element={<Address />}></Route>
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
