import mongoose from 'mongoose';
import { orderSchema } from '../../model/order.schema.js';

const Orders = mongoose.model("Order", orderSchema);

export const getAll = async (req, res) => {
    try {
        const order = await Orders.find();
        res.status(200).json(order);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const createOrder = async (req, res) => {
    try {
        const order = req.body;
        const newOrder = await Orders.create(order);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
}