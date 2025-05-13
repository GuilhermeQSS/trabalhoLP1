import express from "express";
const server = express();
const host = "0.0.0.0";
const port = 3000;

server.use(express.static("./public"));
server.get("/");

server.listen(port,host,()=>{
    console.log(`http://localhost:${port}`);
});