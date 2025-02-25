import dotenv from "dotenv"
import authRouter  from "./routers/auth.router.js"
import messageRouter  from "./routers/message.router.js"
import cookieParser from "cookie-parser";
import { connectDB } from './lib/db.js';
import { EventEmitter } from 'events';
import cors from 'cors';
import {server,app} from "./lib/socket.js"
dotenv.config();
EventEmitter.defaultMaxListeners = 20; 

app.use(cookieParser());

app.use(cors({
    origin:"http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials:true
}))

app.use("/api/auth",authRouter);
app.use("/api/messages",messageRouter);


app.get('/', (req, res) => {
    res.send('Hello World!');
});

server.listen(process.env.PORT, () => {
    console.log(`\x1b[34m\x1b[1mServer is running on http://localhost:${process.env.PORT}\x1b[0m`);
    connectDB();
});