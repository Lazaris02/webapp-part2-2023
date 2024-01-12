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

    if(contentType !== 'application/json'){
        console.log('not json format')
        res.status(400).send("Wrong format requested!")
        return
    }

    let user = req.body
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


app.post('/favourites',(req,res)=>{
    //checks if username + password + sessionId match(if not err)
    //check if already added in user's collection (if not add else remove it)
    //sends message to back to client 
    console.log('AFS request received!')

    let contentType = req.header('Content-Type')
    if(contentType !== 'application/json'){
        console.log('not json format')
        res.status(400).send("Wrong format requested!")
        return
    }

    let msgBody = req.body

    let userCredentials = {
        username : msgBody['username'],
        password : msgBody['password'],
        sessionId : msgBody['sessionId']
    }
    console.log(userCredentials,'userCredentials')

    let userPosition = userDAO.findIndex(userCredentials)
    console.log('user index', userPosition)

    if(userCredentials['sessionId'] !== userDAO.checkSessionId(userPosition)){
        console.log("session ids don't match")
        res.status(403).send("Mismatch in session ids!")
        return 
    }

    //creates the ad format
    let newFavourite = {
        ...msgBody
    }
    delete newFavourite['username']
    delete newFavourite['password']
    delete newFavourite['sessionId']

    //check if ad already in favourites
    console.log(newFavourite['id'], 'id of current ad')
    let adPosition = userDAO.findFavourite(userPosition,newFavourite['id'])
    console.log(adPosition,"Ad position!")
    //if it is remove it else add it
    if(adPosition != -1){
        userDAO.removeFromFavourites(userPosition,adPosition)
        console.log('Removed ad from favourites!')
    }
    else{
        userDAO.addToFavourites(userPosition,newFavourite)
        console.log('Added to favourites succesfully!')
    }
    //send response
    let favList = userDAO.returnFavouritesList(userPosition)
    res.status(200).send(JSON.stringify(favList))
})


app.get('/favorites-list',(req,res)=>{
    //receive the favorites retrieval request
    console.log(req.query.username,req.query.sessionId)
    let username = req.query.username
    let sessionId = req.query.sessionId
    //check if user + sessionId combo exists
    let user = userDAO.findUser(username)
    console.log(user,"the user!")
    if(user === undefined || user.sessionId != sessionId){
        res.status(404).send('Invalid User')
        return  
    }
    //if it does get his favorites list and send it back to the user 
    console.log("User authenthicated sending favorites")
    favoritesList = user["favourites"]
    res.status(200).send(JSON.stringify(favoritesList))

})


app.listen(port,()=>{console.log(`Starting ${port}`)})

