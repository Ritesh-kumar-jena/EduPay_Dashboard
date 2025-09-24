const express = require("express");
const { webhookLogs } = require("../Model/webhookLogModel");
const { orderStatus } = require("../Model/orderStatusModel");

const webhookRoute = express.Router();


webhookRoute.post("/", async (req, res) => {
  try {
    const payload = req.body;

    await new webhookLogs({ event: "payment_update", payload }).save();

    await orderStatus.findOneAndUpdate(
      { collect_id: payload.order_info.order_id },
      {
        order_amount: payload.order_info.order_amount,
        transaction_amount: payload.order_info.transaction_amount,
        payment_mode: payload.order_info.payment_mode,
        payment_details: payload.order_info.payment_details,
        bank_reference: payload.order_info.bank_reference,
        status: payload.order_info.status,
        payment_message: payload.order_info.payment_message,
        payment_time: payload.order_info.payment_time,
        error_message: payload.order_info.error_message,
      }
    );

    res.status(200).send({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports={webhookRoute}
