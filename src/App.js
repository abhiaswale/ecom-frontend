import "./App.css";
import Landing from "./components/Landing/Landing";
import Shop from "./components/Shop/Shop";
import Login from "./components/Login/Login";
import { Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./components/util/PrivateRoutes";
import Account from "./components/Account/Account";
// import Prod from "./components/Prod";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/landing" element={<Landing />} />
        {/* <PrivateRoutes path="/profile" element={<Account />} /> */}
      </Routes>
    </div>
  );
}

export default App;
