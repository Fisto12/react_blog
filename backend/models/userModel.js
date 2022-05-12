import mongoose from 'mongoose';
const userSchema = mongoose.Schema({
             name:{
                required:true,
                type:String
             },
             email:{
                 type:String,
                 required:true,
                 unique:true
             },
             password:{
                 type:String,
                 required:true,
                 minlength:6
             },
             blogs:[
                 {
                type:mongoose.Types.ObjectId,
                ref:'Blog',
                 required:true
                }
                ]

})
export default mongoose.model("User", userSchema)
