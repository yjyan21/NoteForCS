

const express = require("express")
const path = require("path")
const app = express() //获取服务器的实例

const USER = [
    {
        username:'sunwukong',
        password:'123',
        nickname:'箜箜'
    },
    {
        username:'admin',
        password:'123',
        nickname:'超级管理员'
    }
]

//app.use(express.static("public"))
app.use(express.static(path.resolve(__dirname,"./public")))
app.use(express.urlencoded())

// app.get("/hello",(req,res)=>{
//     res.send("这是Hello路由器-0309!!!")
// })

app.get("/login",(req,res)=>{
    if(req.query.username == "admin" && req.query.password == "123"){
        res.send("登录成功")
    }else{
        res.send("用户名或者密码输入有误")
    }
    console.log("请求已经收到~")
    
})
app.get("/hello/:id",(req,res)=>{
    console.log(req.params)
    res.send("您已成功到达~")
})
// app.post("/login",(req,res)=>{
//     console.log(req.body)
//     //console.log(req.query) post这里不能用req.query
//     res.send("post方式传输数据")
// })
app.post("/login",(req,res)=>{
    const {username,password} = req.body
    const loginUser = USER.find(item=>{
        return item.username == username && item.password === password
    })
    if(loginUser){
        res.send("欢迎回来")
    }else{
        res.send("用户名或者密码错误。。")
    }
    console.log(req.body)
    //console.log(req.query) post这里不能用req.query
    
})
app.post("/register",(req,res)=>{
    const {username,password,repassword,nickname} = req.body
    console.log('昵称是：',nickname)
    const loginUser = USER.find(item=>{
        return item.username === username || item.nickname === nickname
    })
    if(!loginUser){
        USER.push({
            username,
            password,
            nickname
        })
        res.send("注册成功 ")
    }else{
        res.send("用户名或者昵称不可用")
    }
    console.log(req.body)
    //console.log(req.query) post这里不能用req.query
    
})
app.listen(3000,()=>{
    console.log("服务器已经启动!!!")
})