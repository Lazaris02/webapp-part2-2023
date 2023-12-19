const {User} = require('./user.js')
const users = [] // users collection


class userDAO{
    constructor(){
        createDefaultUsers()  
        console.log(users[0].getUsername,users[0].getPassword)    
    }

    find(index){
        //returns the user that
        //corresponds to the index 
        return (index>= 0 && index <users.length) ? users[index] : undefined
    }

    findIndex(search){
        for(let x=0; x<users.length; x++){
            if(users[x].getUsername == search.username 
            && users[x].getPassword == search.password){
                return x
            }
        }
        return -1
    }

    checkSessionId(index){
        return users[index].getSessionId 
    }

    giveSessionId(index,uniqueId){
        //saves the sessionId 
        if(index<0 || index>= users.length){return}
        users[index].setSessionId(uniqueId)
    }

    checkIfLoggedIn(){
        //checks if the user has a sessionId in the db 
        //so that it can load the favourites.
    }

}


function createDefaultUsers(){
    //creates the default user objects + stores them
    let defaultUsers = ['makis','takis','teo','antzi']
    let defaultPasswords = ['password1','password2','password3','password4']
    for(let i = 0; i<defaultUsers.length; i++){
        users.push(new User(defaultUsers[i],defaultPasswords[i]))
    }
}


module.exports = {
    "DAO" : userDAO
}

