import { WebSocket, WebSocketServer } from "ws";

function wsConnect(httpServer:any, client: any): any{

    const wss = new WebSocketServer({server : httpServer});

    wss.on('connection', function(ws, req){

        ws.on('error', (err)=> console.error(err));

        ws.on('message', async function message(data, isBinary){
            const payload = data.toString();

            console.log(payload);

            await client.lPush("submissions", JSON.stringify(payload));

            ws.send("Request accepted");
        })

        ws.on('close', ()=>{
            console.log("socekt connection to " + req.socket.remoteAddress + " closed");
        })

        ws.send("Welcome! Message from the server ");

    });
  
}

export default wsConnect;

