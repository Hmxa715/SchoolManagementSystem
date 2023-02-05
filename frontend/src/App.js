import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={[<Navbar />, <Dashboard />]} />
        <Route path="/dashboard/add" element={[<Navbar />, <AddUser />]} />
        <Route path="/dashboard/edit/:id" element={[<Navbar />, <EditUser />]} />
      </Routes>
    </Router>
  );
}

export default App;