const Joi = require("joi");
const User = require("../models/user")
const bcrypt = require("bcryptjs")
const pPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;

const authController = {
  // user registration
  async register(req,res,next) {
        //validate user input
     
        const userRegistrationSchema = Joi.object({
            username: Joi.string().min(5).max(20).required(),
            name:Joi.string().max(20).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(pPattern).required(),
            confirmPassword: Joi.ref("password")
        });

      const {error} = userRegistrationSchema.validate(req.body)

      if(error){
        console.log(error);
        return next(error);
      }

    
    
        const {username, name, email, password} = req.body;

        try{
        const emailInUse = await User.exists({email})
        const UsernameInUse = await User.exists({username})

        if(emailInUse && UsernameInUse){
          const error = {
            status:409,
            message:"Both username and email are in use"
          }
          return next(error)
        }

       if(emailInUse){
        const error = {
            status: 409,
            message:"Email already in use"
        }

        return next(error);
       }
       if(UsernameInUse){
        const error = {
            status: 409,
            message:"username already in use"
        }
        return next(error);
       }

       //password hash

       const hashedPwd = await bcrypt.hash(password, 10);

       const userRegistration = new User({
        username,
        email,
        password:hashedPwd,
        name
       })
       await userRegistration.save();

       return res.status(201).json({userRegistration})


      }
      catch(error){
        return next(error);
      }

  },

  async login(req,res,next){
   
     const userLoginSchema = Joi.object({
      username:Joi.string().min(5).max(30).required(),
      password:Joi.string().pattern(pPattern)
     })

     const {error} = userLoginSchema.validate(req.body);

     if(error){
      return next(error);
     }

     const {username,password} = req.body
  let user;
     try{

       user = await User.findOne({username:username})
      if(!user){
        const error = {
          status:401,
          message:"Invalid username"
        }

        return next(error)
      }

      const match = await bcrypt.compare(password,user.password)
      if(!match){
        const error = {
          status:401,
          message:"Invalid password"
        }
        return next(error)

      }
     
       

     }
     catch(error){
         return next(error)
     }
     return res.status(200).json({user})
  }


}

module.exports = authController;