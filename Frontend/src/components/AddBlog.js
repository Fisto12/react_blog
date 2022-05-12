import { Box, InputLabel, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'

const labeltyles={mb:1,mt:2,fontSize:'24px', fontWeight:'bold'}
const AddBlog = () => {
    const navigate=useNavigate()
    const [inputs, setInputs]= useState({
        title:"",description:"",imageURL:""
    })
    const handleChange =(e)=>{
       setInputs((prevState)=>({
           ...prevState,
           [e.target.name]:e.target.value
       }))
    }
    const sendRequest = async()=>{
        const res= await axios.post('http://localhost:5000/api/blogs/addBlogs',{
            title:inputs.title,
            description:inputs.description,
            image:inputs.imageURL,
            user:localStorage.getItem('userId')
        }).catch(err=>console.log(err))
        const data= await res.data;
        return data
    }
       const handleSubmit =(e)=>{
           e.preventDefault();
           sendRequest().then((data)=>console.log(data)).then(()=>navigate('/blogs'))
       }
    return ( 
        <div >
            <form onSubmit={handleSubmit}>
                <Box  border={3} borderColor='green' borderRadius={10} boxShadow='10px 10px20px #ccc' padding={3} margin={'auto'} marginTop={3} display='flex' flexDirection={'column'} width={'80%'} >
                    <Typography fontWeight={'bold'} padding={3} color='grey' variant='h2' textAlign={'center'}>POST YOUR BLOG</Typography>
                    <InputLabel  sx={labeltyles}>Title</InputLabel>
                    <TextField value={inputs.title} name='title' onChange={handleChange} margin="auto" variant='outlined'/>
                    <InputLabel sx={labeltyles}>Description</InputLabel>
                    <TextField value={inputs.description} name='description' onChange={handleChange} margin="auto" variant='outlined'/>
                    <InputLabel sx={labeltyles}>Image URL</InputLabel>
                    <TextField value={inputs.imageURL} name='imageURL' onChange={handleChange} margin="auto" variant='outlined'/>
                    <Button sx={{marginTop:2, borderRadius:4}} variant='contained' color='warning' type='submit'>SUBMIT </Button>
                </Box>
            </form>
        </div>
     );
}
 
export default AddBlog;