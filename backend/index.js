const dotenv=require("dotenv").config()
const express=require("express")
const cors=require("cors")
const { connection } = require("./db")
const { userRoute } = require("./Controller/userRoutes")
const { orderRoutes } = require("./Controller/orderRoutes")
const { paymentRoutes } = require("./Controller/paymentRoutes")
const { transactionRoute } = require("./Controller/transactionRoutes")
const { webhookRoute } = require("./Controller/webhookRoutes")


const port=process.env.port

const app=express()

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    try {
        res.status(200).send("Wellcom to my project.")
    } catch (error) {
        res.status(400).json(error)
    }
})

app.use("/users",userRoute)
app.use("/orders",orderRoutes)
app.use("/payments",paymentRoutes)
app.use("/transactions",transactionRoute)
app.use("/webhooklogs",webhookRoute)


app.listen(port,async()=>{
    try {
        await connection
        console.log(`server is running on port:- ${port} and connected to EduPay database.`)
    } catch (error) {
        console.log(error)
    }
})