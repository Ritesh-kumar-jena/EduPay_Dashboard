import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";

const Navbar = () => {
   const{setIsLogin}=useContext(AuthContext)
   const navigate=useNavigate()
    const handelLogout=()=>{
      setIsLogin(false)
      navigate("/login")
      
    }
  return (
    <nav className="bg-blue-600 text-white p-4 flex gap-4 justify-around">
      <Link to="/" className="hover:underline">Transactions Overview</Link>
      <Link to="/school" className="hover:underline">By School</Link>
      <Link to="/status" className="hover:underline">Check Status</Link>
      <Link to="/create-payment" className="hover:underline">New Payment</Link>
      <button onClick={handelLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
