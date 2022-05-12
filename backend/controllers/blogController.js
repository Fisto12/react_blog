import mongoose from "mongoose";
import Blog from "../models/blogModel.js"
import User from "../models/userModel.js";
export const getAllBlogs= async(req,res)=>{
    let blogs;
    try {
      
        blogs= await Blog.find().populate('user')
    } catch (error) {
        return console.log(error)
    }
    if (!blogs) {
          res.status(400).json({message:'No blogs found'})
    }
    return res.status(200).json({blogs})
}
export const addBlogs = async(req,res)=>{
     const {title,image,description,user}=req.body;
      let existingUser
     try {
       //FIND THE ID OF THE TYPED USER BODY
       existingUser= await User.findById(user)
     } catch (error) {
         return console.log(error)
     }
     if(!existingUser){
       res.status(400).json({message:'unable to find user by id'})
     }
     const blog= new Blog({
         title,description,image,user
     })
     try {
       //ad blog to user
            //await blogInfo.save()
            const session=await mongoose.startSession();
            session.startTransaction()
            await blog.save({session});
           //sending the blogs to existing user
            existingUser.blogs.push(blog)
            await existingUser.save({session})
            await session.commitTransaction()
     } catch (error) {
         console.log(error)
         return res.status(500).json({message:error})
     }
     res.status(200).json({blog})
}
export const updateBlog = async (req,res,next)=>{
    const {title,description}=req.body
      const blogId = req.params.id;
      let blog;
      try {
          blog = await  Blog.findByIdAndUpdate(blogId,{
              title, description
          })
      } catch (error) {
        return console.log(error)
      }  
      if (!blog) {
          return res.status(500).json({message:'unable to update'})
      }
         return res.status(200).json({blog})
}
export const getId= async (req,res)=>{
      const id= req.params.id;
      let blog;
      try {
            blog= await Blog.findById(id)
      } catch (error) {
        return console.log(error)
      }
      if (!blog) {
        return res.status(404).json({message:'Blogs not found'})
      }
      return res.status(200).json({blog})
}
export const deleteBlog = async(req,res)=>{
    const id = req.params.id;
    let blog;
    try {
          blog=  await Blog.findByIdAndRemove(id).populate('user')
          await blog.user.blogs.pull(blog)
          blog.user.save()
    } catch (error) {
      return console.log(error)
    }
    if (!blog) {
      return res.status(404).json({message:'Blogs cannot be deleted'})
    }
    return res.status(200).json({message:'Blogs deleted'})
}
export const getUserId = async(req,res,next)=>{
  const userId= req.params.id;
  let userBlogs;
  try {
    //FIND BLOGS OF USER
    userBlogs=await User.findById(userId).populate('blogs')
  } catch (error) {
    console.log(error);
  }
  if(!userBlogs){
    return res.status(404).json({message:'no blogs found'})
  }
  return res.status(200).json({user:userBlogs})
}