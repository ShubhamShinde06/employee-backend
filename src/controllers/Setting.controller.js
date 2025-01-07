import {UserModel} from '../models/user.model.js'
import bcrypt from 'bcrypt'

export const changePassword = async (req, res) => {

    try {
        
        const {userId, oldPassword, newPassword} = req.body

        const user = await UserModel.findById({_id: userId})
        if(!user){
            return res.status(404).json({
                success: false,
                message:"user not found"
            })
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if(!isMatch){
            return res.status(404).json({
                success:false,
                message:"wrong old password"
            })
        }

        const hashPassword = await bcrypt.hash(newPassword, 10)

        const newUser = await UserModel.findByIdAndUpdate({_id: userId}, {password: hashPassword})

        if(newUser){
           return res.status(200).json({
            success:true,
            message:"Password updated"
            }) 
        }
        

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"server error"
        })
    }

}