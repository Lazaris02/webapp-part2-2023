class User{
//user object that is sent to and saved in the server

    constructor(username,password){
        this.username = username
        this.password = password
        this.sessionId = undefined
    }

    get getUsername(){return this.username}
    get getPassword(){return this.password}

    set setsessionId(value){
        if(this.sessionId === undefined){
            this.sessionId=value
        }
    }

}


