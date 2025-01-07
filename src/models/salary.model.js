import mongoose, { Schema} from 'mongoose'
import formatDate from '../utils/Date.js'

const salarySchema = new mongoose.Schema({
    
    employeeId:{
        type: Schema.Types.ObjectId,
        ref:"Employee",
        required: true
    },
    basciSalary:{
        type:Number,
        required:true
    },
    allowance:{
        type:Number
    },
    duducation:{
        type:Number
    },
    netSalary:{
        type:Number
    },
    payDate:{
        type:String,
        default:formatDate(new Date().toISOString()) 
    },
    createAt:{
        type:Date,
        default: Date.now
    },
    updateAt:{
        type:Date,
        default:Date.now
    }
        
})

export const SalaryModel = mongoose.models.Salary || mongoose.model('Salary', salarySchema)