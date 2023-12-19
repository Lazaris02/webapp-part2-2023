const {DAO} = require('./userDAO.js')
const {v4: uuidv4} = require('uuid')
const express = require('express')


const app = express()
const userDAO = new DAO()
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
    let contentType = req.header('Content-Type')
    console.log(contentType)

    if(contentType !== 'application/json'){
        console.log('here')
        res.status(404).send("Wrong format requested!")
        return
    }

    let user = req.body
    console.log('Received user',user.username,user.password)
    

    
    let position = userDAO.findIndex(user)

    if(position===-1){
        res.status(404).send("User not found!")
        return 
    }

    //create the new sessionID and give it to the user

    let newSID = uuidv4()
    userDAO.giveSessionId(position,newSID)
    user["sessionId"] = newSID
    console.log(userDAO.find(0))


    //finally send the reply 
    res.type('application/json')
    res.status(200).send(JSON.stringify(user))

})



app.listen(port,()=>{console.log(`Starting ${port}`)})

