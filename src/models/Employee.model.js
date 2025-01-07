import mongoose, { Schema} from 'mongoose'
import formatDate from '../utils/Date.js'

const employeeSchema = new mongoose.Schema({

    userId:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    employeeId:{
        type: String,
        required:true,
        unique: true
    },
    dob:{
        type: String, 
        default: formatDate(new Date().toISOString()) 
    },
    gender:{
        type: String
    },
    maritalStatus:{
        type: String
    },
    department:{
        type: Schema.Types.ObjectId,
        ref:"Department",
        required: true
    },
    salary:{
        type: Number,
        required: true,
    },
    createdAt:{
        type: Date,
        default:Date.now
    },
    updatedAt:{
        type: Date,
        default:Date.now
    }

})

export const EmployeeModel = mongoose.models.Employee || mongoose.model('Employee', employeeSchema)