import {AppBar,Typography,Toolbar,Box,Button,Tabs,Tab} from '@mui/material'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { authActions } from '../store';

const Header = () => {
    const isLoggedIn = useSelector(state=>state.isLoggedIn)
     const dispatch = useDispatch()
    const [value,setValue]= useState(1)
    return (
      <AppBar position='sticky' sx={{background:'green'}}>
          {/* helps us create elements in the appbar */}
          <Toolbar>
              <Typography variant='h4'> BlogsApp </Typography>
              {isLoggedIn && <Box display='flex' marginLeft='auto' marginRight='auto' >
                <Tabs color='white' value={value} onChange={(e,val)=>setValue(val)} textColor='inherit'>
                    <Tab LinkComponent={Link}  to='/blogs' label='All Blogs'/>
                    <Tab LinkComponent={Link}  to='/myBlogs' label='My Blogs'/>
                    <Tab LinkComponent={Link}  to='/blogs/add' label='Add Blogs'/>
                </Tabs>
              </Box>}
              <Box display='flex' marginLeft='auto'>
                { !isLoggedIn &&
                 <>
                <Button variant='contained' sx={{margin:1,borderRadius:10}} color='warning'LinkComponent={Link}  to='/auth'>Login</Button>
                <Button variant='contained' sx={{margin:1, borderRadius:10}} color='warning'LinkComponent={Link}  to='/auth'>SignUp</Button>
                </>}
                {isLoggedIn && <Button onClick={()=> dispatch(authActions.logout()) } variant='contained' sx={{margin:1, borderRadius:10}} color='warning'LinkComponent={Link}  to='/auth'>Logout</Button>}
              </Box>
          </Toolbar>
      </AppBar>
    );
}
 
export default Header;