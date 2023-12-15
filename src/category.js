import User from "./user.js"

const baseUrl = 'https://wiki-ads.onrender.com/'
const loginButton = document.querySelector('#login-button')
const loginUsername = document.querySelector('#username')
const loginPassword = document.querySelector('#password')

let subCategoryData
let templateData = []
let user 
// to add to favorites we check if user exists and if his
//session id is defined






function createTemplateData(){
    for(let scd of subCategoryData){
        templateData.push({
            'title' : scd['title'],
            'description' : scd['descreption'],
            'images' : scd['images'][0],
            'cost' : scd['cost']
        })
    }
    console.log(templateData)
}

function createCategoryTemplate(){
        //creates the template function
    let categoryTemplateScript = document.querySelector('#ads-container-template').textContent
    let compiledCategoryTemplate = Handlebars.compile(categoryTemplateScript)
    let templateObj = compiledCategoryTemplate({
        'ads' : templateData
    })
    let adsList = document.querySelector('.ads-container')
    adsList.innerHTML = templateObj
}


function submitLogin(){
    //packs the username and password in an object
    //sends the post message with fetch
    //awaits for the response from server and either
    //logs in or notifies the user that he can't login
    user = new User(loginUsername.value,loginPassword.value)
    console.log("Passed info",user.getUsername,user.getPassword)
    let postHeader = new Headers()
    postHeader.append('Content-Type','application/json')
    let init ={
        method : "POST",
        headers : postHeader,
        body : JSON.stringify(user)
    }
    //if(serverPostURL==''){return} // remove this
    fetch('/users',init)
    .then(response=>{
        console.log('Received , unpacking')
        if (response.status == 404){
            //print an error message 
            //let the user know
            console.log(response.status)
            loginUsername.classList.add("login-error")
            loginPassword.classList.add("login-error")
            loginPassword.value = ''
            alert("The user doesn't exist")

            return
        }
        if(response.status == 200){
            //update your user instance with the
            //session id + toggle the css in form
            // +make the login form dissapear
            console.log(response.status)
            user.setSessionId(response.body.sessionId)

            loginUsername.classList.remove("login-error")
            loginPassword.classList.remove("login-error")

            return
        }

    })
    .catch(err=>console.log(err))

}




function main(){
    loginButton.addEventListener('click',submitLogin)
    //extract the search params
    const searchValues = window.location.search
    const params = new URLSearchParams(searchValues)
    const id = params.get('category_id')
    const subURL = `${baseUrl}ads?subcategory=${id}`
    //use the needed ones to fetch the category data +
    // its specific sub data
    fetch(subURL)
    .then(response=>response.json())
    .then(data=>{
        subCategoryData = data
        console.log(subCategoryData)
        createTemplateData()
        createCategoryTemplate()
    })
    .catch(err=>console.log(err))
}


window.addEventListener('load',main)