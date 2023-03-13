const express = require("express")
const router = express.Router()
router.get("/list",(req,res)=>{
    res.send("Hello, this is Router.")
})
module.exports = router
