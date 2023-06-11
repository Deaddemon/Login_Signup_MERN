import mongoose from 'mongoose';

const User = new mongoose.Schema({
    name : { type : String , required : true},
    email : { type : String , required : true , unique : true},
    password : { type : String , required : true},
    quote : { type : String },

},
{
    collection : 'users'
})

const user = mongoose.model('User' , User);
export default user;
