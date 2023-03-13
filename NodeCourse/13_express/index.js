const express = require("express")
const path = require("path")
const app = express()
const fs = require("fs/promises")
const userRouter = require("./routers/user.js")
const goodsRouter = require("./routers/goods.js")
const cookiePraser = require("cookie-parser")
const session = require("express-session")

app.set("view engine","ejs")
app.set("views",path.resolve(__dirname,"views"))
app.use(express.static(path.resolve(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use(cookiePraser())
app.use(session({
    secret:"dazhaxie"
}))

app.use("/user",userRouter)
app.use("/goods",goodsRouter)
app.use("/students",require("./routers/students.js"))

app.get("/",(req,res)=>{
    res.render("login")
})
app.get("/get_cookie",(req,res)=>{
    res.cookie("username","admin")
    res.send("cookie has been send.")
})
app.get("/hello",(req,res)=>{
    console.log(req.cookies)
    res.send("Hello Router.")
})
app.post("/login",(req,res)=>{
    const {username,password} = req.body
    if(username === "admin" && password==="123"){
        //登陆成功后，将用户信息放到session
        req.session.loginUser = username
        //res.send("log in successfully.")
        res.cookie("username",username)
        res.redirect("/students/list")
    }else{
        res.send("username or password is not correct.")
    }
})


const router = express.Router()
app.use((req,res)=>{
    res.status(404).send("The page is not exist.")
})

router.get("/hello",(req,res)=>{
    res.send("Hello Router!")
})
app.use(router)

app.listen(3000,()=>{
    console.log("服务器已经启动~~")
})