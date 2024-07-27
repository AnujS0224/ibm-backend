import { comparePassword, hashPassword } from "../helper/authhelper.js";
import UserModel from '../models/userModel.js';
import JWT from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
    const { name, email, password,role } = req.body;
    const photo=req.file;
    if(!name || !email || !password  || !photo) 
        return res.send({message:'All the fields are mandatory'})

    const existinguser=await UserModel.findOne({email})
    if(existinguser){
        return res.status(200).send({
            success:false,
            message:'Already Register please login',
        })
    } 
    const hashedPassword=await hashPassword(password)
    const user =await new UserModel({ name, email, password:hashedPassword,photo:photo.path, role }).save();
    res.status(201).send({
        success:true,
        message:"User Register Successfully",
        user,
    })
  }   
   catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error in Registeration',
        error,
    });
}   
};

export const login= async (req, res) => {
    try {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(400).send({
            success:false,
            message:'Invalid email or password'
        });
    }
    const user=await UserModel.findOne({email});
    if(!user){
        return res.status(401).send({
            success:false,
            message:"The email is not registered"
        })
    }
    const match=await comparePassword(password,user.password)
    if(!match){
        return res.status(200).send({
            success:false,
            message:'Invalid credentials',
        });
    }
    const token= await JWT.sign({_id:user._id,role: user.role},process.env.JWT_SECERT,{expiresIn:"1d",});
    res.status(200).send({
        success:true,
        message:'login successfully',
        user:{
            name:user.name,
            email:user.email,
            role:user.role,
        },
        token,
    });
  } catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error In Login',
        error
    });
}
};

export const forgotPassword= async (req,res)=>{
    try{
        const {email,newpassword}=req.body
        if(!email||!newpassword){
            res.status(400).send({message:'All the fields are mandatory'})
        }
        //check
        const user=await UserModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Wrong Email",
            });
        }
        const hashed=await hashPassword(newpassword);
        await UserModel.findByIdAndUpdate(user._id,{password:hashed});
        res.status(200).send({
            success:true,
            message:"Password Reset Successfully",
        });
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Something went wrong',
            error
        })
    }
}
