import express from "express";
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from "./config.js";
import router from "./routes/bookRoute.js";
import cors from 'cors'

const app = express();

// Middleware for parsing request body
app.use(express.json())

//Middleware fro handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors())
//Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );


app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('Welcomex')
});

app.use('/books', router)

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database')

        app.listen(PORT, () => {
            console.log(`Hello: ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    });

