import jwt from "jsonwebtoken"
import  {UserModel} from "../models/user.model.js"

export const isUser = async (req, res, next) => {

    try {
        
        const token = req.cookies.token 
        if(!token){
            return res.status(401).json({
                success:false,
                message:"user not authenticated"
            })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET_CODE)

        const user = await UserModel.findById(decode.userId)

        if(!user){
            return res.status(404).json({
                error:"User not found"
            })
        }
        req.user = user;
        next()

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error:"User is unAuthenticated: "
        })
    }

}