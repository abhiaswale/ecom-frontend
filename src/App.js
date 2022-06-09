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
import SearchPage from "./pages/SearchPage";
import SingleProduct from "./components/Filters/SingleProduct";
import Wishlist from "./components/Account/Wishlist";
import Orders from "./components/Account/Orders";
import Cart from "./components/Cart/Cart";
import Address from "./components/Account/Address";
function App() {
  return (
    <div className="font-Sans text-center ">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<SingleProduct />} />
        <Route path="/search" element={<SearchPage />}></Route>
        <Route path="/" element={<Landing />} />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/wishlist"
          element={
            <PrivateRoute>
              <Wishlist />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          }
        >
          <Route path="" element={<Profile />} exact></Route>
          <Route path="address" element={<Address />}></Route>
          <Route path="setting" element={<>hi setting</>}></Route>
          <Route path="wishlist" element={<></>}></Route>
          <Route path="orders" element={<Orders />}></Route>
        </Route>
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
