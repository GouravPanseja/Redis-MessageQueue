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
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
const startWorker = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        // @ts-ignore
        console.log("Worker succesfull started :", process.pid);
        while (true) {
            const payload = yield client.brPop("submissions", 0);
            console.log(payload);
            // do the main bussiness task here on the payload recieved from queue
            yield new Promise((resolve) => setTimeout(resolve, 1000));
            // after doing the task compeletly.... send your resopnse to pubSub system so that it can be sent to the server that has subscribed for it
            console.log("Processed user submission");
        }
    }
    catch (err) {
        // @ts-ignore
        console.log(`Worker ${process.pid} couldn't be started`);
    }
});
startWorker();
