const mongoose = require("mongoose")
const User = require("../model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const signUp = async (req , res) => {
    try {
        const {name , email , password , role = "user" , preferences} = req.body; 
        if(!name || !email || !password ) {
            return res.status(400).json({
                status : false , 
                message : "Please fill all the required fields"
            }) 
        }


        const user = await User.findOne({email : email});
        
        if(user) {
            return res.status(400).json({
                status : false , 
                message : "The user already exists"
            })
        }

        const saltRounds = 10; 
        const salt = await bcrypt.genSalt(saltRounds); 

        const hashedPassword = await bcrypt.hash(password , salt);

        const newUserData= {
            name , 
            email , 
            role , 
            password : hashedPassword , 
            preferences
        }

        const createUser = await User.create(newUserData); 

        return res.status(200).json({
            status : true , 
            message : "The user has been created" , 
            newUserData : newUserData , 
            createUser
        })

    } catch(error) {
        return res.status(500).json({
            status : false , 
            message : error.message 
        })
    }
}

const login = async (req,res) => {
    try {
        const {email , password } = req.body; 
        if(!email || !password ) {
            return res.status(400).json({
                status : false ,
                message : "Email , Password and preference are required"
            })
        }

        //finding the user 
        const user = await User.findOne({email}) ; 
        if(!user) {
            return res.status(400).json({
                status : false , 
                message : "The user does not exist"
            })
        } 


        //checking if password is valid or not 
        const isPasswordValid = await bcrypt.compare(password , user.password); 

        if(!isPasswordValid) {
            return res.status(401).json({
                status : false , 
                message : "Invalid Password"
            }) 
        }    
        const userId = user._id.toString()
        const userPayload = {
            userId : userId, 
            userRole : user.role , 
            userEmail : user.email  , 
            userPreferences : user.preferences 
        }

        console.log("userid" ,typeof userId); 
        const token = jwt.sign(userPayload , process.env.JWT_SECRET);
        
        return res.status(200).json({
            status : true , 
            message : "Login Successful" , 
            token 
        }) 

    } catch(error) {
        return res.status(500).json({
            status : false , 
            message : error.message
        })
    }
}
const preferences = async (req , res) => {
    try {
        const userData = req.userData; 
        let userPrefences = userData.userPreferences
        
        return res.status(200).json({
            status : true , 
            message : "The preferences are fetched" , 
            preferences : userPrefences    
        })
    } catch(error) {
        return res.status(500).json({
            status : false , 
            message : error.message 
        })
    }
}

const updatePreferences = async (req , res) => {
    try {
        const {preferences} = req.body ; 
        const userData =req.userData; 
        if(!preferences) {
            return res.status(400).json({
                status : false , 
                message : "Please enter the preferenes"
            })
        }

        const updateUserPreferences = await User.findByIdAndUpdate(
            userData.userId , 
            {
                $set : { preferences }  
            } , 
            {
                new : true 
            }
        )

        console.log("the updated value is " , updateUserPreferences)

        return res.status(200).json({
            status : true , 
            message : "Preferences updated successfully" , 
            preferences : updateUserPreferences.preferences
        }) 

        
    } catch(error) {
        return res.status(500).json({
            status : false , 
            message : error.message 
        })
    }
}

const getNews = async (req , res) => {
    try {
        //external news API -> https://newsapi.org/v2/everything?q=Apple&from=2025-11-07&sortBy=popularity&apiKey=83030fdf33c7443f8fdac0150b565079

        
    } catch(error) {
        return res.status(500).json({
            status : false , 
            message : error.message 
        })
    }
}

module.exports = {signUp , login , preferences , updatePreferences}