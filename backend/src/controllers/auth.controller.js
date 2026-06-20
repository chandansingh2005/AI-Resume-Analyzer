const userModel = require("../models/user.model")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function registerUser(req, res) {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }


    const isUserAlreadyExits = await userModel.findOne({

        $or: [
            { username },
            { email }
        ]

    })

    if (isUserAlreadyExits) {
        return res.status(409).json({
            message: "User Already Exits"
        })
    }

    // create a password
    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash,
    })

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    )

    res.cookie("token", token);

    return res.status(201).json({
        message: "User register successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

async function loginUser(req, res) {

    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" })
    }

    // check the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Password is Invalid " })
    }

    // This line create token
    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    )

    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(201).json({
        message: "User login in successfully",
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
    })
}

async function logout(req, res) {
    res.clearCookie("token");

    res.status(200).json({ message: "User logout successfully" })

}

async function getProfile(req, res) {

    try {
        const userId = req.user.id;
        const user = await userModel.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json({
            message: "User profile fetched successfully",
            data: user

        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Internal server Error "})

    }




}

module.exports = { registerUser, loginUser, logout, getProfile }