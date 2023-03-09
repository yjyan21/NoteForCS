

const express = require("express")
const path = require("path")
const app = express() //获取服务器的实例

//app.use(express.static("public"))
app.use(express.static(path.resolve(__dirname,"./public")))

app.get("/hello",(req,res)=>{
    res.send("这是Hello路由器-0309!!!")
})

app.get("/login",(req,res)=>{
    if(req.query.username == "admin" && req.query.password == "123"){
        res.send("登录成功")
    }else{
        res.send("用户名或者密码输入有误")
    }
    console.log("请求已经收到~")
    
})
app.listen(3000,()=>{
    console.log("服务器已经启动!!!")
})