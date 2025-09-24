const mongoose=require("mongoose")

const orderStatusSchema=mongoose.Schema({
  collect_id: { type: mongoose.Schema.Types.ObjectId, ref: "order",required:true },
  order_amount: {type:Number,required:true},
  transaction_amount: {type:Number,required:true},
  payment_mode: {type:String},
  payment_details: {type:String},
  bank_reference: {type:String},
  payment_message: {type:String},
  status: {type:String},
  error_message: {type:String},
  payment_time: {type:Date}
},{versionKey:false,timestamps: true})

const orderStatus=mongoose.model("orderStatus",orderStatusSchema)

module.exports={orderStatus}