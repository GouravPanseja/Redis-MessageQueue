"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
function wsConnect(httpServer, client) {
    const wss = new ws_1.WebSocketServer({ server: httpServer });
    wss.on('connection', function (ws, req) {
        ws.on('error', (err) => console.error(err));
        ws.on('message', function message(data, isBinary) {
            return __awaiter(this, void 0, void 0, function* () {
                const payload = data.toString();
                console.log(payload);
                yield client.lPush("submissions", JSON.stringify(payload));
                ws.send("Request accepted");
            });
        });
        ws.on('close', () => {
            console.log("socekt connection to " + req.socket.remoteAddress + " closed");
        });
        ws.send("Welcome! Message from the server ");
    });
}
exports.default = wsConnect;
