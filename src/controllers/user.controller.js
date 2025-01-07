import { UserModel } from "../models/user.model.js"
import bcrypt from 'bcrypt'
import createTokenAndSaveInCookies from "../jwt/auth.jwt.js"

// export const register = async (req,res) => {

//     try {
        
//         const {username, password, email, role} = req.body
//         if(!username || !email || !password){
//         return res.status(400).json({
//             success:false,
//             message:"All Filds Require"
//         })
//         }

//         const existuser = await UserModel.findOne({email})
//         if(existuser){
//             return res.status(400).json({
//                 success:false,
//                 message:"User Already Register Change Your Email"
//             })
//         }

        // const hasepassword = await bcrypt.hashSync(password, 10)

        // const newUser = new UserModel({
        //     username,
        //     email,
        //     role,
        //     password:hasepassword
        // })
        // await newUser.save()

//         if(newUser){
//             const token = await createTokenAndSaveInCookies(newUser._id, res)
//             return res.status(201).json({
//                 success:true,
//                 message:"user register",
//                 newUser,
//                 token
//             })  
//         }
        

//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({
//             error:"Internal Server Error"
//         })
//     }

// }

export const login = async (req, res) => {

    try{
        const {email, password} = req.body

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"email & password required"
            })
        }

        const notuser = await UserModel.findOne({email})
        if(!notuser){
            return res.status(404).json({
                success:false,
                message:"user not found"
            }) 
        }

        const user = await UserModel.findOne({email}).select("+password")
        if(!user.password){
            return res.status(400).json({
                success:false,
                message:"user password is missing"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"password is incorrect"
            })
        }

        if(!user || !isMatch){
            return res.status(400).json({
                success:false,
                message:"invalid email or password"
            })
        }

        const token = await createTokenAndSaveInCookies(user._id, res)
        return res.status(200).json({
            message:`Welcome Back ${user.username}`,
            user:{
                _id:user.id,
                username:user.username,
                email:user.email,
                role:user.role
            },
            token : token
        })

    } catch(error){
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"internal server error"
        })
    }

}

export const getMyProfile = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user
    })
}

export const logout = async (req, res) => {

    try {
        
        res.clearCookie('token')
        res.status(200).json({
            success:true,
            message:"user logout"
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success:false,
            message:"internal server error"
        })
    }

}
