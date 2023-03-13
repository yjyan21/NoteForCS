const express = require("express")
const router = express.Router()
router.get("/list",(req,res)=>{
    res.send("Hello, this is Goods Router.")
})
module.exports = router
