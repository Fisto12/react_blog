import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import {Routes, Route} from 'react-router-dom'
import Auth from './components/Auth';
import Blogs from './components/Blogs';
import UserBlogs from './components/UserBlogs';
import BlogDetails from './components/BlogDetails';
import AddBlog from './components/AddBlog';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {authActions} from './store'

function App() {
  const dispatch = useDispatch()
   const isLoggedIn = useSelector(state=>state.isLoggedIn)
   useEffect(()=>{
     if(localStorage.getItem('userId')){
       dispatch(authActions.login())
     }
},[dispatch])

  return (
    <div>
      <header>
      <Header/>
      </header>
      <main>
        <Routes>

          { !isLoggedIn ? 
          <>
          <Route path='/auth' element={<Auth/>}/>
          </>  :
            <>
          <Route path='/blogs' element={<Blogs/>}/>
          <Route path='/blogs/add' element={<AddBlog/>}/>
          <Route path='/myBlogs' element={<UserBlogs/>}/>
          <Route path='/myBlogs/:id' element={<BlogDetails/>}/>
            </>
          
          
          }

        </Routes>
      </main>
      
    </div>
  );
}

export default App;
