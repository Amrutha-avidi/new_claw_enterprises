import React, { useState } from 'react';
// import Cookies from 'js-cookie'

import './index.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: '',
    password: ''
  })


  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = data
    try {
      const { data } = await axios.post('/register', {
        username, password
      })
      console.log(data)
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({})
        toast.success("SignUp Successful. Welcome!")
        navigate("/login")
      }
    } catch (error) {
      console.log("error")

    }

  };
  // const jwtToken = Cookies.get('joken')
  // if (jwtToken ) {
  //   return navigate("/")
  // }

  return (
    <div className='main-con'>
      <h1>Register Now</h1>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}

          />
        </div>

        <div className="form-control">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />
        </div>
        <button type="submit" className='login-button'>SignUp</button>
        <p>Already having an Account? Please <Link to='/login'>Login</Link></p>

      </form>
    </div>

  );
};

export default SignUp;
