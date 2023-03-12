const express = require("express")
const path = require("path")
const app = express()
const fs = require("fs/promises")
const userRouter = require("./routers/user.js")
const goodsRouter = require("./routers/goods.js")

app.set("view engine","ejs")
app.set("views",path.resolve(__dirname,"views"))
app.use(express.static(path.resolve(__dirname,"public")))
app.use(express.urlencoded({extended:true}))

app.use("/user",userRouter)
app.use("/goods",goodsRouter)
app.use("/students",require("./routers/students.js"))

const router = express.Router()
router.get("/hello",(req,res)=>{
    res.send("Hello Router!")
})
app.use(router)

app.listen(3000,()=>{
    console.log("服务器已经启动~~")
})