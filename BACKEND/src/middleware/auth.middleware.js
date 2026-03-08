const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken');
const redis = require('../config/cache')

async function authUserVerification(req,res,next) {
    const token = req.cookies.token;
    
    // if token not exists
    if (!token) {
        return res.status(401).json({
            message:"Token is not Provided"
        });
    };

 
    const isBlacklisted = await redis.get(token);

    if (isBlacklisted) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

 
    // Now verfiying a token
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message:"Invaild Token"
        })
        
    }

}

module.exports = {authUserVerification}