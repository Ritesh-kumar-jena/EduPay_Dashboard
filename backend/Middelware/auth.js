const { users } = require("../Model/userModel")
const dotenv=require("dotenv").config()
const jwt=require("jsonwebtoken")


const auth=async(req,res,next)=>{
    try {
        if(req.headers.authorization){
            const token=req.headers.authorization?.split(" ")[1]
            if(token){
              jwt.verify(token,process.env.key,async(err,decoded)=>{
                if(decoded){
                   const userId=decoded.id
                    const user=await users.findOne({_id:userId})
                    if(user){
                       req.userData={name:user.name,email:user.email}
                       next()
                    }
                    else{
                        res.status(404).send({msg:"User not found in auth middelware."})
                    }
                }else{
                    res.status(400).send({msg:"Invalid or expired token . please login again."})
                }
                 
              })
            }else{
                res.status(404).send({msg:"Token not found."})
            }
         
        }else{
            res.status(404).send({msg:"please login first."})
        }
    } catch (error) {
        res.status(400).json(error)
    }

}

module.exports={auth}