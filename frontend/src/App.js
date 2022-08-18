import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import EditUser from './components/EditUser';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import PageNotFound from './components/PageNotFound';
import Signup from './components/Signup';
import Welcome from './components/Welcome';
import { authActions } from './store';

const App = () => {

  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log(isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Welcome />} />
          {!isLoggedIn ? <>
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} /></> : <>
            <Route path='/home' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/edituser/:id' element={<EditUser />} />
            <Route path='/contact' element={<Contact />} /></>}
            <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App