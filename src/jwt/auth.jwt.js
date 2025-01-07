import jwt from  'jsonwebtoken'
import { UserModel } from '../models/user.model.js'

const createTokenAndSaveInCookies = async(userId, res) => {

    const token = jwt.sign({userId}, process.env.JWT_SECRET_CODE,{
        expiresIn:  "7d"
    })
    res.cookie("token", token,{
        httpOnly: true,
        secure: true,
        sameSite:"strict",
    })
    await UserModel.findByIdAndUpdate(userId, {token})
    return token

}

export default createTokenAndSaveInCookies;