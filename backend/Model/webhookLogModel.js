const mongoose=require("mongoose")

const webhookLogSchema=mongoose.Schema({
    event: { type: String },
    payload: { type: Object }
},{versionKey:false,timestamps: true})

const webhookLogs=mongoose.model("webhookLog",webhookLogSchema)

module.exports={webhookLogs}
