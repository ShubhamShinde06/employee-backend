import {SalaryModel} from '../models/salary.model.js'
import {EmployeeModel} from '../models/Employee.model.js'

export const addSalary = async (req, res) => {

    try {
        
        const {employeeId, basciSalary, allowance, duducation, payDate } = req.body

        if(!employeeId || !basciSalary){
            return res.status(400).json({
                success:false,
                message:"some fileds are required"
            })
        }

        const totalSalary = parseInt(basciSalary) + parseInt(allowance) - parseInt(duducation)

        const newSalary = new SalaryModel({
            employeeId,
            basciSalary,
            allowance,
            duducation,
            netSalary: totalSalary,
            payDate
        })

        await newSalary.save()

        return res.status(200).json({
            success:true,
            message:"Done"
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"server error"
        })
    }

}

export const getSalary = async (req, res) => {

    try {
       const {id} =  req.params

        const salarys = await SalaryModel.find({employeeId : id}).populate('employeeId', 'employeeId')

        if(!salarys){
            const employee = await EmployeeModel.findOne({userId: id})
            salarys = await SalaryModel.find({employeeId: employee._id})
            .populate('employeeId', 'employeeId')
        }

        return res.status(200).json({
            success:true,
            salarys
        }) 
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"server error"
        })    
    }
    

}

export const getUserSalary = async (req, res) => {

    try {
       const {id} =  req.params

        const employee = await EmployeeModel.findOne({userId: id})
        const salarys = await SalaryModel.find({employeeId: employee._id}).populate('employeeId', 'employeeId')
        if(!employee || !salarys){
            return res.status(404).json({
                success:false,
                message:"not found"
            })
        }

        return res.status(200).json({
            success:true,
            salarys
        }) 
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"server error"
        })    
    }
    

}