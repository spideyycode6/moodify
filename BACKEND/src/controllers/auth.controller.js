const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const redis = require('../config/cache')

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    const isUserExist = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    });

    if (isUserExist) {
        return res.status(400).json({
            message: "User already exist"
        })
    }

    
    const user = await userModel.create({
        username,
        email,
        password
    });

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "3d"
        }
    );

    res.cookie("token", token);

    res.status(201).json({
        message: "user register successfully....",
        user: {
            id: user._id,
            username: user.username,
            emial: user.email
        },
        token
    })

}

const loginUser = async (req, res) => {
    const { username, email, password } = req.body;

    const user = await userModel.findOne(
        {
            $or: [
                { email },
                { username }
            ]
        }
    ).select("+password");

    if (!user) {
        return res.status(400).json({
            message: "Invaild Credetials"
        })
    }

    const isPassword = await bcrypt.compare(password, user.password);


    if (!isPassword) {
        return res.status(400).json({
            message: "Invaild Credetials"
        })
    };

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "3d"
        }
    );

    res.cookie("token", token);

    return res.status(201).json({
        message:'Login Successfully....',
        user:{
            id: user._id,   
            username: user.username,
            email:user.email
        },
        token
    })

}

const getMe = async (req,res)=>{
    const user = await userModel.findById(req.user.id) ;

    return res.status(200).json({
        message:"user fatched successfully",
        user
    })
}

async function logout(req,res) {
    const token = req.cookies.token;
    
    res.clearCookie('token');

    await redis.set(token,Date.now().toString());

    
    return res.status(200).json({
        message:"User logout successfully"
    });
}


module.exports = { registerUser, loginUser,getMe,logout }
