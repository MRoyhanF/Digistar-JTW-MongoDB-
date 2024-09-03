import "dotenv/config";
import bodyParser from "body-parser";

import { connectDB } from "./config/db.js";
import authRoutes from "./app/auth/auth.routes.js";
import userRoutes from "./app/user/user.routes.js";
import orderRoutes from "./app/order/order.routes.js";
import express from "express";
const app = express();
connectDB();

app.use(bodyParser.json());
app.use(userRoutes);
app.use(authRoutes);
app.use(orderRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
