const express=require("express")
const { orders } = require("../Model/orderModel")
const { auth } = require("../Middelware/auth")

const orderRoute=express.Router()
orderRoute.use(auth)

orderRoute.post("/",async(req,res)=>{
    try {
        const data =req.body
        const order=new orders(data)
        await order.save()
        res.status(200).send({msg:"order successfull",order:order})
    } catch (error) {
          res.status(400).json(error)
    }
})

orderRoute.get("/",async(req,res)=>{
    try {
        const order=await orders.find()
        res.status(200).send(order)
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports={orderRoute}