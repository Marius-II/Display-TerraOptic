import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/Users.js';


const router = express.Router();


router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username: username });

    if (user){
        return res.json({message: "User already exist!"})
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel ({username, password: hashedPassword});
    await newUser.save();

    res.json({message: `${username} registered successfully`});  // This will return `null` if no user is found
});
 

router.post("/login", async(req,res) => {
    const {username, password} = req.body;
    const user = await UserModel.findOne({username});

    if (!user){
        return res.json({message: `${username} doesn't exist`});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.json({message: "Username or Password is incorrect!"})
    }

    const token = jwt.sign({id: user._id}, "secret")

    // Send the token and user ID to the client
    return res.json({ 
        message: "Login successful!", 
        token: token,
        userID: user._id  // Include the user ID in the response
    });
});



export {router as userRouter}