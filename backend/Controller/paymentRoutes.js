const express = require("express");
const dotenv=require("dotenv").config()
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { orders } = require("../Model/orderModel");
const { orderStatus } = require("../Model/orderStatusModel");
const { auth } = require("../Middelware/auth");

const paymentRoutes = express.Router();
paymentRoutes.use(auth)

const API_KEY = process.env.API_KEY;
const PG_KEY = process.env.pg_key;
const SCHOOL_ID = process.env.school_id;

paymentRoutes.post("/create-payment", async (req, res) => {
  try {
    const { order_id,trustee_id, student_info, amount, gateway_name, callback_url } = req.body;
    let currentOrder;
    if(order_id){
      currentOrder = await orders.findById(order_id);
      if (!currentOrder) {
        return res.status(404).json({ msg: "Order not found" });
      }
    }else{
       currentOrder = new orders({
      school_id: SCHOOL_ID,
      trustee_id,
      student_info,
      gateway_name,
    });
    await currentOrder.save();
    }
    

    const payload = {
      school_id: SCHOOL_ID,
      amount: String(amount),
      callback_url,
    };

    const sign = jwt.sign(payload, PG_KEY);

    const response = await axios.post(
      "https://dev-vanilla.edviron.com/erp/create-collect-request",
      { ...payload, sign },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const { Collect_request_url } = response.data;

    const statusDoc = new orderStatus({
      collect_id: currentOrder._id,  
      order_amount: amount,
      transaction_amount: 0,
      payment_mode: "initiated",
      status: "pending",
    });

    await statusDoc.save();

    res.status(200).send({
      msg: "Payment link created successfully",
      orderId: currentOrder._id,
      payment_url: Collect_request_url,
      status: statusDoc,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Payment creation failed",
      error: error.response?.data || error.message,
    });
  }
});


paymentRoutes.get("/transaction-status/:custom_order_id", async (req, res) => {
  try {
    const { custom_order_id } = req.params;
    const statusDoc = await orderStatus.findOne({ collect_id: custom_order_id });
    if (!statusDoc) {
      return res.status(404).send({ msg: "Transaction not found" });
    }

    res.status(200).send({
      msg: "Transaction status fetched",
      status: statusDoc,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Failed to fetch transaction status",
      error: error.response?.data || error.message,
    });
  }
});

module.exports = { paymentRoutes };
