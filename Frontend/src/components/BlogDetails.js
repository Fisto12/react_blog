import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Box, InputLabel, TextField, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
const labeltyles={mb:1,mt:2,fontSize:'24px', fontWeight:'bold'}



const BlogDetails = () => {
    const navigate=useNavigate()
    const id = useParams().id
    const [blog,setBlog]=useState()
    const [inputs, setInputs]= useState({})
    const handleChange =(e)=>{
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
     }
    const fetchDetails= async()=>{
        const res= await axios.get(`http://localhost:5000/api/blogs/${id}`).catch(err=>console.log(err))
         const data= await res.data
         return data;
    }
    useEffect(()=>{
        fetchDetails().then((data)=>{
            setBlog(data.blog)
           setInputs({title:data.blog.title,description:data.blog.description,imageURL:data.blog.image})
        })
    },[id])
    const sendRequest= async()=>{
        const res= await axios.put(`http://localhost:5000/api/blogs/updateBlog/${id}`,{
            title:inputs.title,
            description:inputs.description      
        }).catch(err=>console.log(err));
        const data= await res.data;
        return data
    }
    const handleSubmit =(e)=>{
        e.preventDefault()
        sendRequest().then((data)=>console.log(data))
        .then(()=>navigate('/myBlogs'))
     }
    return ( 
        <div className="blogDetails">
            {inputs &&(
              <form onSubmit={handleSubmit}>
                <Box  border={3} borderColor='green' borderRadius={10} boxShadow='10px 10px20px #ccc' padding={3} margin={'auto'} marginTop={3} display='flex' flexDirection={'column'} width={'80%'} >
                    <Typography fontWeight={'bold'} padding={3} color='grey' variant='h2' textAlign={'center'}>POST YOUR BLOG</Typography>
                    <InputLabel  sx={labeltyles}>Title</InputLabel>
                    <TextField value={inputs.title} name='title' onChange={handleChange} margin="auto" variant='outlined'/>
                    <InputLabel sx={labeltyles}>Description</InputLabel>
                    <TextField value={inputs.description} name='description' onChange={handleChange} margin="auto" variant='outlined'/>
                    <Button sx={{marginTop:2, borderRadius:4}} variant='contained' color='warning' type='submit'>SUBMIT </Button>
                </Box>
            </form>)}
        </div>
     );
}
 
export default BlogDetails;