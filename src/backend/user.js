class User{
//user object that is managed by the DAO-object

    constructor(username,password){
        this.username = username
        this.password = password
        this.sessionId = undefined
    }

    get getUsername(){return this.username}
    get getPassword(){return this.password}
    get getSessionId(){return this.sessionId}

    setSessionId(value){ this.sessionId = value}

}


module.exports = {
    "User" : User
}


