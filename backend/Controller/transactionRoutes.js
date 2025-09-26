const express = require("express");
const { orderStatus } = require("../Model/orderStatusModel");
const { orders } = require("../Model/orderModel");
const { auth } = require("../Middelware/auth");

const transactionRoute = express.Router();
transactionRoute.use(auth)

transactionRoute.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const matchStage = {};
    if (status) {
      matchStage.status = status;
    }

    const skip = (page - 1) * limit;

    const pipeline = [
      {
        $lookup: {
          from: "orders",
          localField: "collect_id",
          foreignField: "_id",
          as: "order_info",
        },
      },
      { $unwind: "$order_info" },
      { $match: matchStage },
      {
        $project: {
          collect_id: 1,
          school_id: "$order_info.school_id",
          gateway: "$order_info.gateway_name",
          order_amount: 1,
          transaction_amount: 1,
          status: 1,
        },
      },
    ];


    const totalCount = await orderStatus.aggregate([...pipeline, { $count: "count" }]);
    const count = totalCount[0]?.count || 0;

    
    const transactions = await orderStatus.aggregate([
      ...pipeline,
      { $skip: parseInt(skip) },
      { $limit: parseInt(limit) },
    ]);

    res.status(200).json({
      transactions,
      totalCount: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



transactionRoute.get("/school/:schoolId", async (req, res) => {
  try {
    const transactions = await orderStatus.aggregate([
      {
        $lookup: {
          from: "orders",
          localField: "collect_id",
          foreignField: "_id",
          as: "order_info",
        },
      },
      { $unwind: "$order_info" },
      { $match: { "order_info.school_id": req.params.schoolId } },
      {$project: {
       collect_id: 1,
       school_id: "$order_info.school_id",
       gateway: "$order_info.gateway_name",
       order_amount: 1,
       transaction_amount: 1,
       status: 1,
  }}
    ]);
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


transactionRoute.get("/status/:collectId", async (req, res) => {
  try {
    const transaction = await orderStatus.findOne({ collect_id: req.params.collectId });
    if (!transaction) {
  return res.status(404).json({ msg: "Transaction not found" });
}
    res.status(200).send(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports={transactionRoute}
