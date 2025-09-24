const dotenv=require("dotenv").config()
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const express=require("express")
const { users } = require("../Model/userModel")


const userRoute=express.Router()

userRoute.post("/signUp",async(req,res)=>{
    try {
        const {name,email,password}=req.body
        const user=await users.findOne({email})
        if(user){
            res.status(400).send({msg:"This email allready register."})
        }
        else{
            bcrypt.hash(password,5,async function(err,hash){
                if(err){
                     res.status(400).send({msg:"error while hashing",err:err})
                }else{
                    const newUser=new users({name,email,password:hash})
                    await newUser.save()
                    res.status(201).send({msg:"User register successfully"})
                }
                
            })
        }
    } catch (error) {
        res.status(400).send(error)
    }
})


userRoute.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body
        const user=await users.findOne({email})
        if(user){
           bcrypt.compare(password,user.password,function(err,result){
            if(result){
               const token=jwt.sign({id:user._id},process.env.key,{expiresIn:process.env.tokenExpireTime})
               res.status(201).send({msg:`Wellcom ${user.name}`,token:token})
            }else{
                  res.status(400).send({msg:"wrong credentials."})
            }
           })
        }else{
            res.status(400).send({msg:"user not found Plz signin first"})
        }
    } catch (error) {
         res.status(400).json(error)
    }
})




module.exports={userRoute}