import { WebSocketServer } from 'ws';
import express from "express";
import { createClient } from "redis";
import wsConnect from "./utils/wsConnect";

const app = express();
const client = createClient();

app.use(express.json());

client.on('error', (err)=>console.error("Redis Client Error: " , err));  

// connect to redis
( async()=>{
    try{
        await client.connect();
        console.log("Connected to Redis");

    }
    catch(err){
        console.error("Failed to connect to Redis", err);
    }
})();

const httpServer = app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

wsConnect(httpServer, client);






