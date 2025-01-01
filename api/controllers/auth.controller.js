import User from '../models/user.model.js';
import bycryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';



export const signup =  async (req,res, next) => {
   const {username, email, password} = req.body;
    if(
      !username || 
      !email || 
      !password || 
      username==='' ||  
      email==='' || 
      password==='')
    {
      next(errorHandler(400, 'All fields are required'));
    }

    const hashPassword = bycryptjs.hashSync(password, 10);

    const newUser = new User({
      username: username,
      email: email,
      password: hashPassword,
    });


    try {
       await newUser.save();
       res.json('SignUp Successful');
    } catch (error) {
         next(error);
    }
}