import { DepartmentModel } from "../models/department.model.js"

export const addDepartment = async (req, res) => {
    try {
        
        const {dep_name, description} = req.body
        if(!dep_name){
            return res.status(400).json({
                success:false,
                message:"enter department fild"
            })
        }

        const existdep_name = await DepartmentModel.findOne({dep_name})
        if(existdep_name){
            return res.status(400).json({
                success:false,
                message:"Department Already have in Database "
            })
        }

        const newDep = new DepartmentModel({
            dep_name,
            description
        })
        await newDep.save()

        if(newDep){
            return res.status(201).json({
                success:true,
                message:"Add New One Department",
                department : newDep
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Server Error"
        })
    }
}

export const getDepartment = async (req, res) => {

    try {
        
        const departments = await DepartmentModel.find()
        if(!departments){
            return res.status(404).json({
                success:false,
                message:"Department not found"
            })
        }

        res.status(200).json(departments)

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Server Error"
        })
    }

}

export const getSingleDepartment = async (req, res) => {

    const Dep_Id = req.params.id

    const department = await DepartmentModel.findById(Dep_Id)
    if(!department){
        return res.status(404).json({
            success:false,
            message:"Department not found"
        })
    }

    res.status(200).json(department)

}

export const deletDepartment = async (req, res) => {

    try {
        
        const Dep_Id = req.params.id

        const department = await DepartmentModel.findById(Dep_Id)
        if(!department){
            return res.status(404).json({
                success:false,
                message:"Department Not Found"
            })
        }

        await DepartmentModel.deleteOne(department)
        return res.status(200).json({
            success:true,
            message:"Department Delete Successfully",
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Server Error"
        })
    }

}

export const updatDepartment = async (req, res) => {

    try {
        
        const Dep_id = req.params.id
        const department = await DepartmentModel.findById(Dep_id)
        if(!department){
            return res.status(404).json({
                success:false,
                message:"depart not found"
            })
        }

        const updatDepartment = await DepartmentModel.findByIdAndUpdate(Dep_id, req.body,{new : true})
        return res.status(200).json({updatDepartment, message:"updated"})



    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Server Error"
        })
    }

} 
