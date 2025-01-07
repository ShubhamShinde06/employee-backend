import { EmployeeModel } from "../models/Employee.model.js"
import { DepartmentModel } from "../models/department.model.js";
import { LeaveModel } from "../models/Leave.model.js";

export const getDashData = async (req, res) => {

    try {
        
        const totalEmp = await EmployeeModel.countDocuments();

        const totalDep = await DepartmentModel.countDocuments();

        const totalSalaries = await EmployeeModel.aggregate([
            {$group: {_id: null, totalSalary:{$sum : "$salary"}}}
        ])

        const empAppForLeaves = await LeaveModel.distinct('employeeId')

        const leaveStatus = await LeaveModel.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: {$sum: 1}
                }
                
            }
        ])

        const leaveSummary = {
            appliedFro: empAppForLeaves.length,
            approved : leaveStatus.find(item => item._id === "Approved")?.count || 0,
            rejected : leaveStatus.find(item => item._id === "Rejected")?.count || 0,
            pending : leaveStatus.find(item => item._id === "Pendding")?.count || 0
        }

        return res.status(200).json({
            success: true,
            totalEmp,
            totalDep,
            totalSalaries: totalSalaries[0]?.totalSalary || 0,
            leaveSummary
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"server error"
        })
    }

}