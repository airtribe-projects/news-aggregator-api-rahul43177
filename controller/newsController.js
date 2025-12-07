const axios = require("axios")
const getNews = async (req , res) => {
    try {
        const userData = req.userData; 
        let userPrefences = userData.userPrefences; 
        if(!userPrefences) {
            return res.status(400).json({
                status : false , 
                message : "The preferences are not present"
            })
        }

        if(userPrefences.length > 1) {
            
        }
        //env key NEWS_API_KEY
        let API_TO_HIT = `https://newsapi.org/v2/top-headlines/sources?category=business&apiKey=83030fdf33c7443f8fdac0150b565079`
    } catch(error) {
        return res.status(500).json({
            status : false , 
            message : error.message 
        })
    }
}

module.exports = getNews; 