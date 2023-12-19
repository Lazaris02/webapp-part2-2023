class User{
//user object that is managed by the DAO-object

    constructor(username,password){
        this.username = username
        this.password = password
        this.sessionId = undefined
        this.favourites = []
    }

    get getUsername(){return this.username}
    get getPassword(){return this.password}
    get getSessionId(){return this.sessionId}
    get getFavouritesList(){return this.favourites}

    setSessionId(value){ this.sessionId = value}
    addFavourite(value){this.favourites.push(value)}
    removeFavourite(index){this.favourites.splice(index,1)}

}


module.exports = {
    "User" : User
}


