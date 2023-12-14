const express = require('express')
const app = express()


app.get('/',(req,res)=>{
    console.log('here')
    res.status(404).json({message : "Error"})
})


app.listen(3000)