import './App.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import UserSignUp from './pages/user/UserSignUp';
import UserLogin from './pages/user/UserLogin';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import {Avatar, AvatarGroup, AvatarIcon} from "@nextui-org/avatar";
import NavbarAll from './components/miscellaneous/NavbarAll';
import UserHomepage from './pages/user/UserHomepage';
import MyProfilePage from './pages/user/MyProfilePage';


function App() {


  return (
    <div>

      <NavbarAll/>
     
 
    
    <BrowserRouter>
      <div
       
      >
        <Routes>
          <Route path='/user/signup' element={<UserSignUp/>} />
          <Route path='/user/login' element={<UserLogin/>} />
          <Route path='/user/homepage' element={<UserHomepage/>} />
          
          <Route path = '/user/myprofile' element = {<MyProfilePage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  </div>
  )
}

export default App
