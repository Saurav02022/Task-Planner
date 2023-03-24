import { Route, Routes } from "react-router-dom";

import Login from "./pages/login";
import Signup from "./pages/Signup";

import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Sprint from "./pages/Sprint";
import Private from "./PrivateRoute/private";
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <Private>
              <Home />
            </Private>
          }
        />
        <Route
          path="/sprint"
          element={
            <Private>
              <Sprint />
            </Private>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
