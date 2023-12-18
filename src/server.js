const User = require('./user.js')
const express = require('express')

const app = express()
const userArray = []
const port = 5000
//data received are in json format

app.use(express.json())

app.use((req,res,next)=>{
    //to bypass CORS-POLICY
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE')
    res.header('Access-Control-Allow-Headers','Content-Type')
    next()
})

app.post('/users',(req,res)=>{
    //extract the user info from the body
    //check if the user exists in the user list using DAO
    //then either 200 OK == create uuid + reply
    // or 404 NotFound
    console.log('Login Request Received!')
    res.header('Access-Control-Allow-Origin', '*')
    let contentType = req.header('Content-Type')
    console.log(contentType)

    if(contentType !== 'application/json'){
        console.log('here')
        res.status(404).send("Wrong format requested!")
        return
    }

    let unidentifiedUser = req.body
    console.log('Received user',unidentifiedUser.username,unidentifiedUser.password)
    return
    let position = userDAO.findIndex(unidentifiedUser)
    if(position===-1){
        res.status(404).send("User not found")
        return 
    }

    // if found create the unique uuid 
    // ask the dao to apply it to the found user
    // and send the sessionId as a reply


})



app.listen(port,()=>{console.log(`Starting ${port}`)})

