import { LeaveModel } from "../models/Leave.model.js";
import { EmployeeModel } from "../models/Employee.model.js";

export const addLeave = async (req, res) => {
  try {
    const { leaveType, userId, startDate, endDate, reason } = req.body;

    const employee = await EmployeeModel.findOne({ userId });

    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    const newLeave = new LeaveModel({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });

    await newLeave.save();

    return res.status(201).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

export const getLeave = async (req, res) => {

  try {
    const leaves = await LeaveModel.find().populate({
      path: "employeeId",
      populate: [
        {
          path: 'department',
          select: 'dep_name'
        },
        {
          path: 'userId',
          select: 'username'
        }
      ]
    })
    
    if (!leaves) {
      return res.status(404).json({
        success: false,
        message: "not found",
      });
    }

    res.status(200).json(leaves);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: true,
      message: "Server error",
    });
  }
};

export const deletLeave = async (req, res) => {
  try {
    const leave_Id = req.params.id;

    const leave = await LeaveModel.findById(leave_Id);
    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Not Found",
      });
    }

    await leave.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Leave Type deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      messsage: "server error",
    });
  }
};

export const updateLeave = async (req, res) => {
  try {
    const Leave_Id = req.params.id;
    const Leave = await LeaveModel.findById(Leave_Id);
    if (!Leave) {
      return res.status(404).json({
        success: false,
        message: "not found",
      });
    }

    const updatLeave = await LeaveModel.findByIdAndUpdate(Leave_Id, req.body, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Updated Levae Type",
      updatLeave,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getSingleLeave = async (req, res) => {
  try {
    const {id} = req.params;

    const leaves = await LeaveModel.findById({_id: id}).populate({
      path: "employeeId",
      populate: [
        {
          path: 'department',
          select: 'dep_name'
        },
        {
          path: 'userId',
          select: 'username, profileImage'
        }
      ]
    })

    return res.status(200).json({
      success:true,
      leaves
    });

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


export const getLeaves = async (req, res) => {

  try {
    
    const {id} = req.params

    let leave = await LeaveModel.find({employeeId: id}).populate({
      path: "employeeId",
      select:"employeeId",
      populate: [
        {
          path: 'department',
          select: 'dep_name'
        },
        {
          path: 'userId',
          select: 'username'
        }
      ]
    })

    if(!leave){
      const employee = await LeaveModel.findOne({userId: id})
      leave = await LeaveModel.find({employeeId: employee._id})
    }

    return res.status(200).json({
      success:true,
      leave
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }

}


export const getLeavesUser = async(req, res) => {

  try {
    
    const {id} = req.params
    const employee = await EmployeeModel.findOne({userId: id})

    const leaves = await LeaveModel.find({employeeId: employee._id})
    return res.status(200).json({
      success:true,
      leaves
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }

}