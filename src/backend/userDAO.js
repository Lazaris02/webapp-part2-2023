const {User} = require('./user.js')
const users = [] // users collection


class userDAO{
    constructor(){
        //constructs some default users
        createDefaultUsers()  
        console.log(users[0].getUsername,users[0].getPassword)    
    }

    find(index){
        //returns the user that
        //corresponds to the index 
        return (index>= 0 && index <users.length) ? users[index] : undefined
    }

    findIndex(search){
        //finds the index of a specified user
        //returns -1 if not found 
        for(let x=0; x<users.length; x++){
            if(users[x].getUsername == search.username 
            && users[x].getPassword == search.password){
                return x
            }
        }
        return -1
    }

    checkSessionId(index){
        //returns a specific user's sessionId
        return users[index].getSessionId 
    }

    giveSessionId(index,uniqueId){
        //saves the sessionId for a specific user 
        if(index<0 || index>= users.length){return}
        users[index].setSessionId(uniqueId)
    }

    findFavourite(user,adId){
        //checks if an ad is already in favourites
        //and returns the position or -1 if not found
        let favList = users[user].getFavouritesList
        for(let i=0; i<favList.length; i++){
            if(favList[i]['id'] == adId){return i}
        }
        return -1
    }

    removeFromFavourites(userIndex,AdIndex){
        //removes an ad from the favourites list
        users[userIndex].removeFavourite(AdIndex)
    }

    addToFavourites(userIndex,newFavourite){
        //adds an ad to the favourites list
        users[userIndex].addFavourite(newFavourite)
    }

    returnFavouritesList(userIndex){
        return users[userIndex].getFavouritesList
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

