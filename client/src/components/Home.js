import { useState} from 'react';
import { useNavigate } from "react-router-dom";
const Home = () => {
 
    const navigate = useNavigate();

const handleLoginClick = () => {
navigate('/login');
}

const handleRegisterClick = () => {
    navigate('/register');
    }

  return (
    <div>
      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleRegisterClick}>Register</button>
    </div>
  );
}

export default Home;
