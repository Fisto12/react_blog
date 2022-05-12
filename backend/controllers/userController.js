import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
export const getUsers = async (req,res,next)=>{
    let user;
    try {
        user= await User.find();
    } catch (error) {
        return console.log(error)
    }
    if(!user){
        return res.status(404).json({message:'no user found'})
    }
          return res.status(200).json({user})
}
export const signUp =async (req,res)=>{
          const {name, email, password} = req.body;
          let existingUser;
          try {
               existingUser= await User.findOne({email})
          } catch (error) {
              return console.log(error)
          }
             if(existingUser){
                 res.status(400).json({message:'email already exists in the database'})
             }
             const hashedPasssword = bcrypt.hashSync(password)
              const userInfos = new User({
                  name,
                  password:hashedPasssword,
                  email,
                  blogs:[]
              })
              try {
                 await userInfos.save()
              } catch (error) {
                  return console.log(error)
              }
                  res.status(200).json({userInfos})
}

  export const logIn = async (req,res,next) => {
    const {email, password} = req.body;
   let existingUser;
   try {
       ////id: "626fcc894d02dd00daeaef41", name: "waheed", email: "waheed@gmail.com"
        existingUser= await User.findOne({email})
   } catch (error) {
       return console.log(error)
   }
      if(!existingUser){
         return res.status(404).json({message:'user not found with the email'})
      }
      const isPasswordCorrect =  bcrypt.compareSync(password, existingUser.password)
      if (!isPasswordCorrect){
         return res.status(400).json({message:'incorrect password'})
      }
      return res.status(200).json({message:"Login successful", user:existingUser})
 }

