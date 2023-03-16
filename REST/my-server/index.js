const express = require("express")
const app = express()
const STU_ARR = [
	{id:"1",name:"sunwukong",age:18,gender:"Male",address:"shuiliandong"},
	{id:"2",name:"zhubajie",age:19,gender:"Male",address:"gaolaozhuang"},
	{id:"3",name:"shaheshang",age:28,gender:"Male",address:"liushahe"}
]
app.use(express.json())
app.use((req,res,next)=>{
		res.setHeader("Access-Control-Allow-Origin","*")
		//res.setHeader("Access-Control-Allow-Origin","http://127.0.0.1:5500")
		res.setHeader("Access-Control-Allow-Method","GET,POST,PUT,DELETE,PATCH")
		res.setHeader("Access-Control-Allow-Headers","Content-type")
		next()
})

//定义一个登录的路由/api
app.post("/login",(req,res)=>{
	const {username, password} = req.body
	if(username === "admin" && password === "123"){
		res.send({
			status:"ok",
			data:{id:"12345",name:"admin",nickname:"superManager"}
		})
	}else{
		res.status(403).send({
			status:"err",
			data:"username or password is not correct."
		})
	}
})

//定义学生信息的路由
app.get("/students",(req,res)=>{

	console.log("收到students的get请求")
    //返回学生信息
		res.send({
			status:"ok",
			data:STU_ARR
		})
})

app.use(express.urlencoded({extended:true}))

//解析json格式请求体的中间件
app.use(express.json())

//定义一个添加学生的路由
app.post("/students",(req,res)=>{
	console.log("收到students的post请求",req.body)
	const {name,age,gender,address} = req.body
	const stu = {
		id:+STU_ARR.at(-1).id + 1 + "",
		name,
		age:+age,
		gender,
		address,
	}
	STU_ARR.push(stu)
	res.send({
		status:"ok",
		data:stu
	})
})

//查询某个学生的路由
app.get("/students/:id",(req,res)=>{
	const id = req.params.id
	const stu = STU_ARR.filter(item=>item.id === id)
	if(stu){
		res.send({
			status:"ok",
			data:stu
		})
	}else{
		res.send({
			status:"err",
			data:"This student is not exist."
		})
	}
	
})

//定义一个删除学生的路由
app.delete("/students/:id",(req,res)=>{
	const stuid = req.params.id
	for(let i = 0; i < STU_ARR.length; i++){
		
		if(STU_ARR[i].id === stuid){
			const delStu = STU_ARR[i]
			STU_ARR.splice(i,1)
			res.send({
				status:"ok",
				data:delStu
			})
			return //别忘了这里写return
		}
	}
	res.status(403).send({
		status:"err",
		data:"This student is not exist."
	})
})

//定义一个修改学生信息的路由
app.put("/students",(req,res)=>{
	const {id,name,age,gender,address} = req.body
	const updateStu = STU_ARR.find(item=>item.id===id)
	if(updateStu){
		updateStu.name = name
		updateStu.age = +age
		updateStu.gender = gender
		updateStu.address = address
		res.send({
			status:"ok",
			data:updateStu
		})
		console.log(updateStu)
	}else{
		res.status(403).send({
			status:"err",
			data:"This student id is not exist.."
		})
	}
})




app.listen(3000,()=>{
    console.log("服务器已经启动~")
})