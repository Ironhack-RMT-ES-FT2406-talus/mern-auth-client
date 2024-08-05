import "./App.css";
import { Routes, Route } from "react-router";

// pages
import HomePage from "./pages/HomePage"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import PrivatePageExample from "./pages/PrivatePageExample";

// components
import Navbar from "./components/Navbar"
import Private from "./components/auth/Private";
import Admin from "./components/auth/Admin";
import PaginaAdmin from "./pages/PaginaAdmin";

function App() {

  return (
    <div>
      <Navbar />

      <br />
      <hr />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/private-page-example" element={ <Private> <PrivatePageExample /> </Private> } />
        <Route path="/admin" element={ <Admin> <PaginaAdmin /> </Admin> } />

        {/* error FE routes here... */}

      </Routes>
    </div>
  )
}

export default App
