class User{
//user object that is managed by the DAO-object

    constructor(username,password,sessionId){
        this.username = username
        this.password = password
        this.sessionId = sessionId
    }

    get getUsername(){return this.username}
    get getPassword(){return this.password}
    get getSessionId(){return this.sessionId}

}


module.exports = {
    User : User
}


