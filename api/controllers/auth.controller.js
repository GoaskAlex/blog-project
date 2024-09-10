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

//////////////////////////////////////-------SignIn
export const signin = async (req,res,next) => {
const{email, password} = req.body

        if(!email || !password || email === ''|| password === ''){
            next(errorHandler(400,'All fields'))
        } 
            try{
        const validateUser = await User.findOne({ email })
        if(!validateUser){
        return next(errorHandler(404,'User not found'))
        }
        
        const validPassword = bcryptjs.compareSync(password,validateUser.password) 
        if(!validPassword){
           return next(errorHandler(400,'Password not correct'))
        }
        const token = jwt.sign({id:validateUser._id, isAdmin:validateUser.isAdmin},process.env.JWT_SECRET)
        
        const{password:pass, ...rest} = validateUser._doc

        res.status(200).cookie('got_it',token,{httpOnly:true}).json(rest)
        
    }catch (error){
    next(error)
    }
}


///////////////////////////////---GoogleSignIn

export const google = async (req,res,next) =>{
    const{email, name, profilePicture} =req.body
        try{
            const user = await User.findOne({ email });
            if(user){
                const token = jwt.sign({id:user._id, isAdmin:user.isAdmin},process.env.JWT_SECRET)
                const {password, ...rest} = user._doc;
                res.status(200).cookie('got_it',token,{httpOnly:true,}).json(rest)
            }else{
                const generatePassword = Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8)
                const hashedPassword = bcryptjs.hashSync(generatePassword, 10)
                const newUser = new User ({
                    username:name.toLowerCase().split(' ').join('')+Math.random().toString(9).slice(-4),
                    email:email,
                    password:hashedPassword,
                    profilePicture:profilePicture,
                }) 
                await newUser.save()
                const token = jwt.sign({id:newUser._id, isAdmin:newUser.isAdmin},process.env.JWT_SECRET)
                const {password, ...rest} = newUser._doc;
                res.status(200).cookie('got_it',token,{httpOnly:true,}).json(rest)
            }
        }
        catch(error){
            next(error)
        }

}