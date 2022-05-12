import {Box, Typography, TextField, Button} from  '@mui/material'
import { useState } from 'react';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { authActions } from '../store';
import { useNavigate } from 'react-router-dom';
const Auth = () => {
    const dispatch =useDispatch()
    const navigate=useNavigate()
    const [isSignup, setIsSignup] = useState(false)
    const [inputs, setInputs]= useState({
        name:"",email:"",password:""
    })
    const handleChange =(e)=>{
       setInputs((prevState)=>({
           ...prevState,
           [e.target.name]:e.target.value
       }))
    }
    const sendRequest = async (type='logIn')=>{
           const res= await axios.post(`http://localhost:5000/api/users/${type}`,{
               name:inputs.name,
               email:inputs.email,
               password:inputs.password
           }).catch(err=>console.log(err))
           const data = await res.data;
           console.log(data)
           return data
    }
    const handleSubmit = (e)=>{
          e.preventDefault()
          if(isSignup){
              sendRequest('signUp')
               .then((data)=>localStorage.setItem('userId',data.user._id))
              .then(()=>dispatch(authActions.login()))
              .then(()=>navigate('/blogs'))
          }
          else{
              sendRequest()
              .then((data)=>localStorage.setItem('userId', data.user._id))
              .then(()=>dispatch(authActions.login()))
              .then(()=>navigate('/blogs'))
              .then(data=>console.log(data))
          }
    }
    return ( 
       <div>
           <form onSubmit={handleSubmit}>
               <Box display='flex' boxShadow='10px 10px 20px #ccc' padding={3}  margin='auto' marginTop={5} borderRadius={5} flexDirection={'column'} alignItems='center' justifyContent="center" maxWidth={400} >
                 {/* if you are in signup or login page render something */}
                <Typography variant='h2' padding={3} textAlign='center'>{isSignup?'Sign Up':'Log In'}</Typography>
                { isSignup && <TextField onChange={handleChange} name='name' value={inputs.name} placeholder='Name' type={"name"} margin='normal'/>}
                <TextField onChange={handleChange}  value={inputs.email} name='email' placeholder='Email' type={"email"} margin='normal'/>
                <TextField onChange={handleChange}  value={inputs.password} name='password' placeholder='Password' type={"password"} margin='normal'/>
                <Button variant='contained' color='warning' sx={{borderRadius:3, marginTop:3} } type='submit'>Submit</Button>
               <Button onClick={()=>setIsSignup(!isSignup)}  sx={{borderRadius:3, marginTop:3} }>Proceed To {isSignup? 'Login' :'signup'   }</Button>
               </Box>
           </form>
       </div>
     );
}
 
export default Auth;