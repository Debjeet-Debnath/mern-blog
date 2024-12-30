import User from '../models/user.model.js'

export const signup =  async (req,res) => {
   const {username, email, password} = req.body;
    if(!username || !email || !password || username==='' ||  email==='' || password==='')
    {
      return res.status(400).json({message: "All fields arer required"});
    }

    const newUser = new User({
      username: username,
      email: email,
      password: password,
    });


    try {
       await newUser.save();
       res.json('SignUp Successful');
    } catch (error) {
      res.status(500).json(
         {
            message: error.message,
         }
      );
    }
}