const express = require("express");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();


// REGISTER ROUTE
router.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // CHECK USER EXISTS
        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: "User already exists",
            });
        }

        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        // CREATE USER
        const user = await User.create({

            name,

            email,

            password: hashedPassword,
        });

        res.status(201).json({
            message: "User Registered Successfully",
            user,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message,
        });
    }
});


// LOGIN ROUTE
router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        // FIND USER
        const user = await User.findOne({ email });

        if (!user) {

            return res.status(400).json({
                message: "Invalid Email or Password",
            });
        }

        // CHECK PASSWORD
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid Email or Password",
            });
        }

        // CREATE TOKEN
        const token = jwt.sign(

            {
                id: user._id,
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d",
            }
        );

        res.status(200).json({

            message: "Login Successful",

            token,

            user,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message,
        });
    }
});

module.exports = router;