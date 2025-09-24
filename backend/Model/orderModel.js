const mongoose=require("mongoose")

const orderSchema=mongoose.Schema({
   school_id: { type: String, required: true },
  trustee_id: { type: String, required: true },
  student_info: {
    name: {type:String},
    id: {type:String},
    email: {type:String}
  },
  gateway_name: {type:String}
},{versionKey:false,timestamps: true})

const orders=mongoose.model("order",orderSchema)

module.exports={orders}