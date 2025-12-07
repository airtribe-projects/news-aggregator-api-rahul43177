const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name : {
        type : String , 
        required : true 
    } , 
    email : {
        type : String , 
        required : true , 
        unique : true 
    } , 
    password : String  , 
    role : {
        type : String, 
        default : "user"
    } , 
    preferences : {
        type : [String] , 
        enum : ['Business' , 'Sports' , 'Technology', 'movies', 'comics']   , 
        defualt : ['movies', 'comics']
    } 
}, {timestamps : true}) 


module.exports = mongoose.model('Users' , userSchema)