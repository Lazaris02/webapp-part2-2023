const serverUrl = 'http://localhost:5000'
const serverHandler = '/favorites-list'
let favoritesURL


function FRS(){
    //executes the favorites retrieval service

    //setup the request params 
    let getHeader = new Headers()
    getHeader.append('Accept','application/json')

    let init = {
        method : "GET",
        headers : getHeader
    }

    fetch(favoritesURL,init)
    .then(response =>{
        if(response.status == 404){
            console.log("User not Found!")
            return undefined
        }
        if(response.status == 200){
            console.log("Received Favorites list!")
            return response.json()
        }
    })
    .then(data=>{
        //we should have the favorites list!
        if(data === undefined){
            console.log('undefined!')
            return
        }
        //Now we need to put the Data in the handlebars template
        console.log(data)
        setupFavoritesTemplate()
    })
    .catch(err=>{console.log(err)})

}

function setupFavoritesTemplate(){
    //setups + compiles the Handlebars template
}


function main(){
    console.log('loaded!')
    // first I need the URLparams
    const searchValues = window.location.search
    const params = new URLSearchParams(searchValues)
    const username = params.get('username')
    const sessionId = params.get('sessionId')

    //create the URL the GET request will use
    const queryString = `?username=${username}&sessionId=${sessionId}`
    favoritesURL = `${serverUrl}${serverHandler}${queryString}`
    console.log(favoritesURL)
    //call the frs function
    FRS()
    
}



window.addEventListener('load',main)