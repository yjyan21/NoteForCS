const express = require("express")
const path = require("path")
const app = express()
const fs = require("fs/promises")
let STUDENTS_ARR = require("./data/students.json")


let name = "zhubajie";

//将ejs设置为默认模版引擎
app.set("view engine","ejs")
app.set("views",path.resolve(__dirname,"views"))
app.use(express.static(path.resolve(__dirname,"public")))

app.use(express.urlencoded({extended:true}))

// app.get("/students",(req,res)=>{
//     res.render("students",{name, age:18, gender:"male"})
// })
app.get("/students",(req,res)=>{
   res.render("students",{stus:STUDENTS_ARR})
   })
app.post("/add_student",(req,res)=>{
    
    const id = STUDENTS_ARR.at(-1)?.id + 1
    const newUser = {
        id,
        name:req.body.name,
        age:+req.body.age,
        gender:req.body.gender,
        address:req.body.address
    }
    console.log(newUser)
    STUDENTS_ARR.push(newUser)
    fs.writeFile(path.resolve(__dirname,"./data/students.json"),
        JSON.stringify(STUDENTS_ARR))
        .then(()=>{
            // res.send("添加成功")
            res.redirect("/students")
        }).catch(()=>{
            
        })
   
})
app.get("/delete",(req,res)=>{
    const id = +req.query.id
    STUDENTS_ARR = STUDENTS_ARR.filter(item=> item.id !== id)
    fs.writeFile(path.resolve(__dirname,"./data/students.json"),
    JSON.stringify(STUDENTS_ARR))
    .then(()=>{
        // res.send("添加成功")
        res.redirect("/students")
    }).catch(()=>{
        
    })
    // res.send("删除成功")
    // res.redirect("/students")
    
})
app.get("/to_update",(req,res)=>{
    const id = +req.query.id
    const student = STUDENTS_ARR.find(item => item.id === id)
    console.log(student)
    res.render("update",{student})
})
app.post("/update_student",(req,res)=>{
    const id = +req.query.id
    const {name, age,gender,address} = req.body
    const student = STUDENTS_ARR.find(item=>item.id == id)
    student.name = name
    student.age = age
    student.gender = gender
    student.address = address
    fs.writeFile(path.resolve(__dirname,"./data/students.json"),
    JSON.stringify(STUDENTS_ARR))
    .then(()=>{
        // res.send("添加成功")
        res.redirect("/students")
    }).catch(()=>{
        
    })
})
app.get("/set_name",(req,res)=>{
    name = req.query.name
    console.log(name)
    res.send("修改成功")
})
app.use((req,res)=>{
    res.status(404)
    res.send("您访问的页面不存在")
})
app.listen(3000,()=>{
    console.log("服务器已经启动~~")
})