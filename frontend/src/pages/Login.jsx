import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import api from "../services/api";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLogin} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/login", { email, password });
      localStorage.setItem("token", res.data.token);

      const welcomeMsg = res.data.msg; 
       const name = welcomeMsg.split(" ")[1]
       localStorage.setItem("name", name)
      setIsLogin(true);
      navigate("/")
      
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
}

  return (
  <>
   <div 
   style={{
        backgroundImage: `url("https://www.terrabytegroup.com/wp-content/uploads/2024/09/What-is-Email-Authentication-and-Why-Its-Crucial-for-Your-Business-768x768.png")`,
        backgroundSize: "cover",
        width:"100%",
         minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }}
    >
    <form onSubmit={handleLogin} style={{background: "white", padding: "20px", borderRadius: "8px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center" }}>
      <h2>Login</h2>
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
      <button type="submit" style={{ marginTop: "10px",cursor: "pointer" }}>Login</button>
    </form>
    <h4 style={{ marginTop: "10px",cursor: "pointer",display: "inline-block",backgroundColor:"white"}} onClick={()=>navigate("/signUp")}><u>If you don't have account click here for Sign Up</u></h4>
  </div>
 </>
  );
}

export default Login;