import {EmployeeModel} from "../models/Employee.model.js"
import {UserModel} from "../models/user.model.js"
import bcrypt from "bcrypt"
//import {uploadCloudinary} from "../utils/cloudnary.js"

export const addEmployee = async (req, res) => {

    try {

        const {username, email, password, role, employeeId, dob, gender, maritalStatus, department, salary} = req.body 

        if(!employeeId || !department || !salary){
            return res.status(400).json({
                success: false,
                message:"Some Fields Are Rquired"
            })
        }

        const user = await UserModel.findOne({email})
        if(user){
            return res.status(400).json({
                success:false,
                message:"Employee Or User Already Register"
            })
        }

        const hasepassword = await bcrypt.hash(password, 10)

        const newUser = new UserModel({
            username,
            email,
            role,
            password:hasepassword
        })
        const savedUser = await newUser.save()

        const newEmployee = new EmployeeModel({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            department,
            salary
        })

        await newEmployee.save()

        return res.status(201).json({
            success: true,
            message:"Employee Add"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Server Error"
        })
    }

}

export const getEmployee = async (req, res) => {
    try {
        
        const employee = await EmployeeModel.find().populate('userId').populate('department')

        return res.status(200).json({
            success:true,
            employee
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Server Error"
        })
    }
}

// export const getSingleEmployee = async (req, res) => {

//     const Emp_Id = req.params.id

//     const employee = await EmployeeModel.findById(Emp_Id).populate('userId').populate('department')

//     return res.status(200).json({
//         success:true,
//         employee
//     })

// }

export const getSingleEmployee = async (req, res) => {

    const {id} = req.params

    try{

        let employee;
        employee = await EmployeeModel.findById({_id: id})
        .populate("userId")
        .populate("department")
        if(!employee){
            employee = await EmployeeModel.findOne({userId: id})
            .populate("userId")
            .populate("department")
        }

        return res.status(200).json({
            success: true,
            employee
        })

    } catch(error){
        return res.status(500).json({
            success:false,
            message:"server error"
        })
    } 

}

export const updateEmployee = async (req, res) => {

    try {
        
        const Emp_Id = req.params.id

        const employee = await EmployeeModel.findById(Emp_Id)

        if(!employee){
            return res.status(4040).json({
                success:false,
                message:"not found"
            })
        }

        const updatedEmployee = await EmployeeModel.findByIdAndUpdate(Emp_Id, req.body,{new : true})
        return res.status(200).json({
            updatedEmployee,
            message:"updated"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"server error"
        })
    }

}

export const  deleteEmployee = async (req, res) => {

    try {
        
        const Emp_Id = req.params.id

        const employee = await EmployeeModel.findById(Emp_Id)
        if(!employee){
            return res.status(404).json({
                success:false,
                message:"Employee Not Found"
            })
        }

        await employee.deleteOne()
        return res.status(200).json({
            success: true,
            message:"Employee Delete Successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:true,
            message:"Server Error"
        })
    }

}

export const fetchEmployeeByDepId = async (req, res) => {

    const {id} = req.params
    
    try{

        const employees = await EmployeeModel.find({department: id})

        return res.status(200).json({
            success:true,
            employees
        })

    } catch(error){
        console.log(error)
        return res.status(500).json({
            success:true,
            message:"Server Error"
        })
    }

}