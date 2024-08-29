import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'

export const signup = async (req,res, next) =>{
   const {username, email, password} = req.body

   if(!username || !email || !password || username === '' || email === '' || password === ''){
        next(errorHandler(400,'All fields'))
   }

const hashedPassword = bcryptjs.hashSync(password,10);

const newUser = new User({
    username,
    email,
    password:hashedPassword,
})

    try{
        await newUser.save();
        res.json({message:'Signup worked'})
    }catch(error){
    next(error)
    }
}

export const signin = async (req,res,next) => {
const{username, password} = req.body

        if(!username || !password || username === ''|| password === ''){
            next(errorHandler(400,'All fields'))
    } try{
    const validateUser = await User.findOne({username})
        if(!validateUser){
           return next(errorHandler(404,'User not found'))
        }
    const validPassword = bcryptjs.compareSync(password,validateUser.password) 
        if(!validPassword){
           return next(errorHandler(400,'Password not correct'))
        }
        const token = jwt.sign({id:validateUser._id},process.env.JWT_SECRET)
        
        const{password:pass, ...rest} = validateUser._doc

        res.status(200).cookie('got_it',token,{httpOnly:true}).json(rest)
        
    }catch (error){
    next(error)
    }
}