import React, { useContext } from "react";
import {Navigate, Route , Routes} from  'react-router-dom'
import Login from "../pages/Login";
import Signup from "../pages/SignUp";
import NotFoundPage from "../pages/NotFoundPage";
import { AuthContext } from "../context/AuthContextProvider";
import TransactionStatus from "../pages/TransactionStatus";
import TransactionsBySchool from "../pages/TransactionsBySchool";
import TransactionsOverview from "../pages/TransactionsOverview";
import CreatePayment from "../pages/CreatePayment";
import PaymentSuccess from "../pages/PaymentSuccess";





function Allroutes() {
  const { isLogin } = useContext(AuthContext)
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        {isLogin&&<Route path="/overview" element={<TransactionsOverview/>}/>}
        {isLogin &&<Route path="/status" element={<TransactionStatus/>}/>}
        {isLogin&&<Route path="/school" element={<TransactionsBySchool/>}/>}
        {isLogin && <Route path="/create-payment" element={<CreatePayment />} />}
        {isLogin && <Route path="/payment-success" element={<PaymentSuccess />} />}

        <Route
        path="/"
        element={
          isLogin
            ? <Navigate to="/overview" />
            : <Navigate to="/signup" />
        }
      />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </>
  );
}


export default Allroutes;