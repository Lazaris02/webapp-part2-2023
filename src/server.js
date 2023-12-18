const User = require('./user.js')
const express = require('express')

const app = express()
const userArray = []
const port = 5000
//data received are in json format

app.use(express.json())
app.get('/',(req,res)=>{console.log('ihihiihih')})

app.post('/users',(req,res)=>{
    //extract the user info from the body
    //check if the user exists in the user list using DAO
    //then either 200 OK == create uuid + reply
    // or 404 NotFound
    let contentType = req.header
    console.log('hi you posted!')
    res.status(200).send('okok')
    return
    if(contentType !== 'application/json'){
        res.status(404).send("Wrong format requested!")
        return
    }

    let unidentifiedUser = req.body
    console.log('Received user',
    unidentifiedUser.getUsername,unidentifiedUser.getPassword)
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

