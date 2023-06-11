import { useState} from 'react';
import Home from './Home';

const Login = () => {
  const [name , setName] = useState('');
  const [email , setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser(e){
    e.preventDefault();
const response = await fetch('http://localhost:8000/login' , {
  method: 'POST',
headers:{
    'Content-Type': 'application/json',
  },
  body : JSON.stringify({
    
    email,
    password
  })
})

const data = await response.json();
console.log(data);
if(data.user){
  localStorage.setItem('token' , data.user);
  alert('Login Successful');
  window.location.href = '/dashboard';
}else{
  alert('Check your credentials');
}
  }

  return (
    <div>
      <Home/>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
         
           <input 
        value= {email}
        onChange = { (e) => setEmail(e.target.value)}
        type ='email' 
        placeholder='Email'/>
           <input 
        value= {password}
        onChange = { (e) => setPassword(e.target.value)}
        type ='password' 
        placeholder='Password'/>

        <input type ='submit' value ='Login'/>
      </form>

    </div>
  );
}

export default Login;
