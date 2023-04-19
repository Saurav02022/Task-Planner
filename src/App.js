import { Route, Routes } from "react-router-dom";

import Login from "./pages/login";
import Signup from "./pages/Signup";

import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Sprint from "./pages/Task";
import Private from "./PrivateRoute/private";
import SingleSprint from "./pages/SingleSprint";
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
        <Route
          path="/:sprintName"
          element={
            <Private>
              <SingleSprint />
            </Private>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
