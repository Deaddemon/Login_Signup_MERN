import React, { useEffect } from "react";
import jwt from 'jsonwebtoken';
import { useNavigate } from "react-router-dom";
 

const Dashboard = () => {
     
    const history = useNavigate();
const [quote , setQuote] = React.useState('');
const [tempQuote , setTempQuote] = React.useState('');
    

async function populateQuote(){
   
 const request = await fetch('https://master--luminous-boba-33ec90.netlify.app/dashboard' , {
    headers:{
        'x-access-token' : localStorage.getItem('token'),

    }
 })

 const data = await request.json();
 console.log("get of dashboard" , data);
 if(data.status === 'ok'){
    setQuote(data.quote);
    console.log("data set",data.quote);
 }else{
    alert(data.error);
 }
    }
    
    useEffect( ()=>{
        const token = localStorage.getItem('token');
        if(token){
            const user = jwt.decode(token);
            if(!user){
                localStorage.removeItem('token');
                history('/login', { replace: true });
                 
            }else{
                populateQuote();
            }
        } else{
            alert("Please login first");
            history('/home', { replace: true });
        }
        
    },[])
    async function updateQuote(e){
        e.preventDefault();
        const request = await fetch('https://master--luminous-boba-33ec90.netlify.app/dashboard' , {
            method: 'POST',
        headers:{
            'Content-Type': 'application/json',
                'x-access-token' : localStorage.getItem('token'),
        
            },
            body : JSON.stringify({
                quote : tempQuote
            })
         })
        
         const data = await request.json();
         console.log(data);
         if(data.status === 'ok'){
            setQuote(tempQuote);
            setTempQuote('');
           
         }else{
            alert("Please login first");
         }
    }
    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        history('/', { replace: true });
    }
    return <div>
        <h1>Your Quote : {quote || 'NO quote found'}</h1>
        <form onSubmit={updateQuote}>
            <input 
            type='text'
             placeholder='Enter your quote' 
             value={tempQuote} 
             onChange={(e) => setTempQuote(e.target.value)}/>
                <input type='submit' value='Update Quote'/>
        </form>

        <button onClick={()=>{handleLogoutClick()}}>Logout</button>
        </div> 
}

export default Dashboard;