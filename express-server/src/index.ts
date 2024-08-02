import express from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());

const client = createClient();

client.on('error', (err)=>console.error("Redis Client Error: " , err));

serverStart();

app.post("/submit", async(req,res)=>{
    try{
        const {problemId, userId, code, language} = req.body;

        // store in database 
        
        // put in redis to cache the data

        await client.lPush("submissions", JSON.stringify({problemId, userId, code, language}));

        res.status(200).json({
            message: "Submission recieved"
        })
    }
    catch(err){
        res.status(500).json({
            message:"Submission Failed!",
            data: err,
        })
    }
})


async function serverStart(){
    try{

        await client.connect();

        console.log("Connected to Redis");

        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });

    }
    catch(err){
        console.error("Failed to connect to Redis", err);
    }
}