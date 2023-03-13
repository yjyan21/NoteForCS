const express = require("express")
const path = require("path")
const router = express.Router()
let STUDENTS_ARR = require("../data/students.json")
const fs = require("fs/promises")

//学生列表
router.get("/list",(req,res)=>{
    if(req.cookies.username){
        res.render("students",{stus:STUDENTS_ARR})
    }else{
        res.redirect("/")
    }
})
//添加
router.post("/add",(req,res,next)=>{
    
    const id = STUDENTS_ARR.at(-1)?STUDENTS_ARR.at(-1).id + 1:1
    const newUser = {
        id,
        name:req.body.name,
        age:+req.body.age,
        gender:req.body.gender,
        address:req.body.address
    }
    //console.log(newUser)
    STUDENTS_ARR.push(newUser)
    next()
})
//delete student information
router.get("/delete",(req,res,next)=>{
    const id = +req.query.id
    STUDENTS_ARR = STUDENTS_ARR.filter(item=> item.id !== id)
    next()
    // res.send("删除成功")
    // res.redirect("/students")
    
})
//modify information
router.get("/to_update",(req,res)=>{
    const id = +req.query.id
    const student = STUDENTS_ARR.find(item => item.id === id)
    console.log(student)
    res.render("update",{student})
})
router.post("/update_student",(req,res,next)=>{
    const id = +req.query.id
    const {name, age,gender,address} = req.body
    const student = STUDENTS_ARR.find(item=>item.id == id)
    student.name = name
    student.age = age
    student.gender = gender
    student.address = address
   next()
})

//处理存储文件的中间件
router.use((req,res)=>{
    fs.writeFile(path.resolve(__dirname,"../data/students.json"),
        JSON.stringify(STUDENTS_ARR))
        .then(()=>{
            // res.send("添加成功")
            res.redirect("/students/list")
        }).catch(()=>{
            res.send("Cao Zuo  Shi Bai!!")
        })
})

module.exports = router