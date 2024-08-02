import { createClient } from "redis";

const client = createClient({ url: "redis://redis:6379"});

(async()=>{

    let payload = null;

    try{
        // connect the worker process to redis server 
        await client.connect(); 

        // @ts-ignore
        console.log("Worker succesfull started :", process.pid);
        
        while(true){
            payload = await client.brPop("submissions", 0);
            console.log(payload);
            
            // do the main bussiness task here on the payload recieved from queue,,,,,, docker orchesteration
            await new Promise((resolve) => setTimeout(resolve, 5000));

            // after doing the task compeletly.... send your resopnse to pubSub system so that it can be sent to the server that has subscribed for it
            console.log("Processed user submission");
        }
    }
    catch(err){
        // @ts-ignore
        console.log(`Worker ${process.pid} couldn't be started`);

        // push the task back into the queue as it was not able to be compeleted succesfully
        await client.lPush("submissions", payload);
    }
})();





