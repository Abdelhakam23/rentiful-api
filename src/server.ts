import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";


dotenv.config();


const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



app.get('/',(req,res)=>{
    res.send('Hello, World!');
})

const port = process.env.PORT || 3002;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})