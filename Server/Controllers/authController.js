import User from "../Models/userModel.js"
import bycript from 'bcryptjs'
import { encodeTokenAndSetCookie } from "../Utilities/encodeToken.js"

export const signup = async(req,res)=>{
    const {username,email,password} = req.body

    try {

       if(!username || !email || !password){
            return res.status(400).json({success:false,message:'all field requires!'})
       } 

       const userExist = await User.findOne({email})
       if(userExist){
            return res.status(400).json({success:false,message:'User already exist!'})
       }

       const hashedPassword = await bycript.hash(password,10)
       const verificationToken = Math.floor(100000 + Math.random() * 900000).toString() ;

       const user = new User({
            username,email,
            password:hashedPassword,
            verificationToken,
            verificationTokenExpiresAt:Date.now() + 24 * 60 *  60 * 1000
       })

       await user.save()

       //jwt
       encodeTokenAndSetCookie(res,user._id)

       res.status(201).json({success:true,message:'user created successfully',
        user:{
            ...user._doc,
            password:undefined
        }
       })
        
    } catch (error) {
        res.status(500).json({success:false,message:error.message.toString()})
    }
}

export const login = async()=>{
    res.send('login')
}

export const logout = async()=>{
    res.send('logout')
}