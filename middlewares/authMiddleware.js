const jwt = require("jsonwebtoken")

async function authenticateToken(req, res,next) {
    try {
        let token = req.headers['authorization'];
        if(token.includes(" ") && token.includes("Bearer")) {
            token = token.split(" ")[1]; //taking the first index = second part of the token
        }

        //verifying the token from user 
        const decoded = jwt.verify(token , process.env.JWT_SECRET); 
        if(!decoded) {
            return res.status(401).json({
                status : false , 
                message : "The token is invalid or expired"
            })
        }

        req.userData = decoded; 
        console.log("inisde middleware",req.userData); 
        next(); 
    } catch(error) {
        return res.status(401).json({
            status : false , 
            message : "The token is invalid or expired" , 
            error : error.message 
        })
    }
}


module.exports = authenticateToken; 