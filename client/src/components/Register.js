import { useState , useHistory} from 'react';
import { useNavigate } from 'react-router-dom';
 import Home from './Home';

const Register = () => {
  const history = useNavigate();
  const [name , setName] = useState('');
  const [email , setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function registerUser(e){
    e.preventDefault();
const response = await fetch('https://login-signup-mern-backend.onrender.com/register' , {
  method: 'POST',
headers:{
    'Content-Type': 'application/json',
  },
  body : JSON.stringify({
    name,
    email,
    password
  })
})

const data = await response.json();
console.log(data);
if(data.status === 'ok'){
  alert('Registeration Successfull');
 history('/login');
}else{
  alert('Id already exists');
}
  }

  return (
    <div>
      <Home/>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input 
        value= {name}
        onChange = { (e) => setName(e.target.value)}
        type ='text' 
        placeholder='First Name'/>
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

        <input type ='submit' value ='Register'/>
      </form>

    </div>
  );
}

export default Register;
