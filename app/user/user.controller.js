import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import { userSchema } from '../../model/user.schema.js';

const Users = mongoose.model("User", userSchema);

export const index = async (req, res) => {
  res.send("Berhasil Connect");
};

export const users = async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const createUser = async (req, res) => {
    try {
        const user = req.body;
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        const newUser = await Users.create(user);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await Users.findByIdAndDelete(id);
        res.status(204).send({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
