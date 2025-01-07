import jwt from 'jsonwebtoken'
import {UserModel} from '../models/user.model.js'

export const isAdmin = async (req, res, next) => {
    try {
        
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({
                success:false,
                message:"unauthorized no token provided"
            })
        }

        const decode =  jwt.verify(token, process.env.JWT_SECRET_CODE)
        const user = await UserModel.findById(decode.userId)
        if(!user){
            return res.status(401).json({
                success:true,
                message:"user not found"
            })
        }
        if(user.role !== 'admin'){
            return res.status(403).json({
                success:true,
                message:"not access admin panel"
            })
        }

        req.user = user

        next()

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"internal server error"
        })
    }
}