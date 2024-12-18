import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    },
    isVerified:{
        type:String,
        default:false
    },
    lastLogin:{
        type:Date,
        default:Date.now
    },
    verificationToken:String,
    verificationTokenExpiresAt:Date,
    resetPasswordToken:String,
    resetPasswordTokenExpiresAt:Date

},
    {timestamps:true}
)

const User = mongoose.model('users',userSchema)
export default User