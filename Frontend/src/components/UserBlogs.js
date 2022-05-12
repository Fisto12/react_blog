import axios from 'axios'
import { useEffect, useState } from 'react'
import Blog from './Blog'
import {useNavigate} from 'react-router-dom'


const UserBlogs = () => {
    const navigate=useNavigate()
    const [user,setUser]= useState([])
    const id = localStorage.getItem("userId")
    const sendRequest = async()=>{                         
            const res=  await axios.get(`http://localhost:5000/api/blogs/user/${id}`).catch(err=>console.log(err))
            const data= await res.data;
            return data 
    }
    useEffect(()=>{
         sendRequest()
         .then((data)=>setUser(data.user))
    },[])
    console.log(user);
    return (  
        <div>
            {user && user.blogs && user.blogs.map((blog,index)=>(
                 <Blog key={index} id={blog._id} title={blog.title}  description={blog.description} imageURL= {blog.image} userName={user.name} isUser={true}  />
            ))} 
        </div>
    );
}
 
export default UserBlogs;