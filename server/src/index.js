import express from "express"
import cors from "cors"
import mongoose from "mongoose"

import {userRouter}  from './routes/users.js'
import {productsRouter}  from './routes/products.js'

const PORT = 3001;

const app = express();

app.use (express.json());
app.use (cors());

app.use ("/auth", userRouter)
app.use ("/products", productsRouter)

mongoose.connect("mongodb+srv://admin:adminterra@displayappcluster.a9iqzhw.mongodb.net/displayAppCluster?retryWrites=true&w=majority&appName=displayAppCluster"
);

app.listen(PORT, () => console.log("SERVER STARTED!")) 