const express = require("express")
const path = require("path")
const app = express()
const STUDENTS_ARR = [
    {
        name:'sunwukong',
        age:18,
        sex:0
    },
    {
        name:'zhubajie',
        age:22,
        sex:0
    },
    {
        name:'baigujing',
        age:16,
        sex:1
    }
]
//将ejs设置为默认模版引擎
app.set("view engine","ejs")
app.use(express.static(path.resolve(__dirname,"public")))
app.use(express.urlencoded())

app.get("/students",(req,res)=>{
    res.render("students",{name:"sunwukong",age:18})

})
app.use((req,res)=>{
    res.status(404)
    res.send("您访问的页面不存在")
})
app.listen(3000,()=>{
    console.log("服务器已经启动~~")
})