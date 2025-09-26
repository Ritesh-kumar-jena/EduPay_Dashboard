import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


function Signup() {
    const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/signUp", { name, email, password});
      alert(res.data.msg || "Signup successful! Please login.");
      navigate("/login"); 
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed");
    }
  }
  return (
<>
 <div 
   style={{
        backgroundImage: `url("https://s43022.pcdn.co/wp-content/uploads/2016/09/King-World-News-Email-From-One-Of-The-Largest-Gold-Silver-Dealers-In-The-United-States.jpg")`,
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }}
    >
    <form onSubmit={handleSignup} style={{background: "white", padding: "20px", borderRadius: "8px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"  }}>
      <h2>Sign Up</h2>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
         required
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
         required
      />
      <label htmlFor="password">password</label>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
         required
      />
      <button style={{ marginTop: "10px",cursor: "pointer" }} type="submit">Sign Up</button>
    </form>
    <h4 style={{ marginTop: "10px",cursor: "pointer",display: "inline-block",backgroundColor:"white"}} onClick={()=>navigate("/login")}><u>If you allready have account click here for Login</u></h4>
  </div>
 </>
  );
}

export default Signup;