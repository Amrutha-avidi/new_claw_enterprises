import React, {useState, useContext, useEffect} from 'react';
import './index.css'; // Import the CSS file for styling
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { UserContext } from '../../context/userContext';
import Cookies from "js-cookie"; // Ensure correct import path

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // Use setUser to update context
  const [data, setData] = useState({
    username: '',
    password: ''
  });
  const [isUserPresent, setIsUserPresent] = useState(false)
  const [error,setError] = useState("")

  useEffect(() => {
    const token = Cookies.get('token'); // Get token from cookies
    setIsUserPresent(token ? true : false)
    if (token)
      navigate("/")
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = data;
    try {
      const { data } = await axios.post('/login', { username, password });
    
      if (data.error) {
        console.log(data.error)
      } else {
        console.log(data)
        setUser(data.user); // Update user context with returned user data
        setData({});
        navigate("/");
      }
    } catch (err) {
      setError(err.response.data.error)
    }
  };
  // console.log(error)

  return (
    !isUserPresent && <div className='main-con'>
      <h1>Login Now</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="username">username:</label>
          <input
            type="username"
            id="username"
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            required
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
        <button type="submit" className='login-button'>Login</button>
        {error && <p style={{color:'red',fontSize:'20px'}}>{error}</p>}
        <p>Didn't have an Account ? Please <Link to='/signup'>Register</Link></p>
      </form>
    </div>
  );
};

export default Login;