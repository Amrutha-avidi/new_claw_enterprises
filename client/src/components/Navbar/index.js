import React from 'react'
import {MdAssignment} from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css'

const Navbar = () => {
    const navigate = useNavigate();

  const removeToken = () => {
    Cookies.remove('token'); // Remove the token from cookies
    navigate('/login'); // Redirect to login page
  };

   
    
  return (
    <div className='nav-con'>
        <MdAssignment size={40} />

        <h1>ChecklistChronicle</h1>
        <button onClick={removeToken}>Logout</button>
    </div>
  )
}

export default Navbar