import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import { userSchema } from '../../model/user.schema.js';
import jwt from "jsonwebtoken";
import {blacklist} from "../../config/blacklist.js";

const Users = mongoose.model("User", userSchema);

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: "Invalid credentials" });
        }

        const key = process.env.JWT_SECRET;
        const payload = {
            id: user.id,
            email: user.email,
            name: user.name
        };
        const token = jwt.sign(payload, key, { expiresIn: '30m' });
        // res.status(200).json({ token });
        res.status(200).json(token);

    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const logout = async (req, res) => {
    try {
        const { authorization } = req.headers;
        const maxBlacklist = 50;
    
        if (blacklist.length >= maxBlacklist) {
          blacklist.splice(0, 25); //delete token blacklist as many as 25 data starting from index 0
        }
    
        //add token to blacklist
        blacklist.push(authorization);
    
        console.log(blacklist);
        res.status(200).json({ message: "Logout successful" });
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}