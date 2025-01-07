import mongoose from "mongoose";
import {EmployeeModel} from '../models/Employee.model.js'
import {LeaveModel} from '../models/Leave.model.js'
import {SalaryModel} from '../models/salary.model.js'

const departmentScheme = new mongoose.Schema({
    dep_name:{
        type:String,
        required: true,
        unique:true
    },
    description:{
        type:String
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type:Date,
        default: Date.now
    }
})

departmentScheme.pre("deleteOne",{
    document: true,
    query: false
},
async function (next) {
    try {
        
        const departmentId = this._id; // Access the document's _id
        
        const employees = await EmployeeModel.find({ Department: departmentId });
        const empIds = employees.map(emp => emp._id);

        await EmployeeModel.deleteMany({department: this._id})
        await LeaveModel.deleteMany({employeeId: {$in : empIds}})
        await SalaryModel.deleteMany({employeeId: {$in : empIds}})

        next()
    } catch (error) {
        next(error)
    }
}
)

export const DepartmentModel = mongoose.models.Department || mongoose.model('Department', departmentScheme)