import mongoose, { Schema } from 'mongoose'
import formatDate from '../utils/Date.js'

const leaveSchema = new mongoose.Schema({
    
    employeeId:{
        type:Schema.Types.ObjectId,
        ref:"Employee",
        required: true
    },
    leaveType:{
        type:String,
        enum:["Sick Leave","Casual Leave","Annual Leave"],
        required:true
    },
    startDate:{
        type:Date,
        default: formatDate(new Date().toISOString()) ,
        required: true
    },
    endDate:{
        type:Date,
        default: formatDate(new Date().toISOString()) ,
        required: true
    },
    reason:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum:["Pendding","Approved","Rejected"],
        default: "Pendding"
    },
    appliedAt: {
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type:Date,
        default: Date.now
    }

})

export const LeaveModel = mongoose.models.Leave || mongoose.model('Leave', leaveSchema)