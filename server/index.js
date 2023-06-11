import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import User from './model/user.js';
import jwt  from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/mern-auth');

app.post('/register', async (req, res) => {
    console.log(req.body);
    try{
        const newPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({
            name : req.body.name,
            email : req.body.email,
            password : newPassword,
        });
        res.json({status : 'ok' , message : 'User created successfully'});
    }catch(err){
        res.json({status : 'error' , message : err})
    }
})

app.post('/login', async (req, res) => {
    console.log(req.body);
   
       const user=  await User.findOne({
            
            email : req.body.email,
             
        });
        if(!user){
            
            return res.json({status : 'error' ,  error: 'Invalid Email'});
        }
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if(isPasswordValid){
            const token = jwt.sign({
                name : user.name,
                email : user.email
            } , 'secret123')
        res.json({status : 'ok' ,user : token , message : 'User logged in successfully'});
    }else{
        res.json({status : 'error' ,  user : false})
    }
})

app.get('/dashboard', async (req, res) => {
     
    const token = req.headers['x-access-token'];
     
    try{
        const decoded = jwt.verify(token, 'secret123');
        const email = decoded.email;
        const user = await User.findOne({email : email});
        return res.json({ status :'ok' , quote : user.quote});

    }catch(error){
        console.log(error);
        res.json({status : 'error' ,  error: 'invalid token'});
    }
   
        
})

app.post('/dashboard', async (req, res) => {
     
    const token = req.headers['x-access-token'];
     
    try{
        const decoded = jwt.verify(token, 'secret123');
        const email = decoded.email;
        const user = await User.updateOne({email : email},
            { $set: { quote: req.body.quote } });
        return res.json({ status :'ok' })

    }catch(error){
        console.log(error);
        res.json({status : 'error' ,  error: 'invalid token'});
    }
   
        
})


app.listen(8000, () => {
    console.log('Server starter on 8000');
})