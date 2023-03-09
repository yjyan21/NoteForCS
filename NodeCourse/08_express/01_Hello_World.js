
const express = require("express")
const app = express() //获取服务器的实例
app.listen(3000,()=>{
    console.log("服务器已经启动")
})
// app.get("/hello",(req,res)=>{
//    console.log("有人访问我了")
//    //res.status(200)
//    res.send("<h1>这是我的第一个服务器</h1>")
// })

app.use("/",(req,res)=>{
    console.log("收到请求")
    res.send("这是通过中间件传送的")
})
