import mongoose from "mongoose";

export const orderSchema = new mongoose.Schema({
    email: String,
    name: String,
    status: String
});

