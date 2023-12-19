const baseUrl = 'https://wiki-ads.onrender.com/'
const serverUrl = 'http://localhost:5000'
const loginForm = document.querySelector('#login-form')
const loginUsername = document.querySelector('#username')
const loginPassword = document.querySelector('#password')
const notification = document.querySelector('#error-notification')
let subCategoryData
let templateData = []
let user 
// to add to favorites we check if user exists and if his
//session id is defined

function displayError(){
    notification.classList.remove('login-success-message')
    notification.classList.add('login-error-message')
    notification.innerHTML = 'Wrong Credentials!'
}

function displaySuccess(){
    notification.classList.remove('login-error-message')
    notification.classList.add('login-success-message')
    notification.innerHTML = 'Successful Login!'
}

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
   
    let unidentified_user = {
        "username" : loginUsername.value ,
        "password" : loginPassword.value
    }

    let postHeader = new Headers()
    postHeader.append('Content-Type','application/json')
    let init ={
        method : "POST",
        headers : postHeader,
        body : JSON.stringify(unidentified_user)
    }
  
    fetch(`${serverUrl}/users`,init)
    .then((response)=>{
        if (response.status == 404){
            //let the user know that they
            //input wrong credentials
            loginUsername.classList.add("login-error")
            loginPassword.classList.add("login-error")
            loginUsername.value = ''
            loginPassword.value = ''
            displayError()
            return undefined
        }
        if(response.status == 200){
            loginUsername.classList.remove("login-error")
            loginPassword.classList.remove("login-error")
            displaySuccess()
           return response.json()
        }
    })
    .then(data=>{
        user = data
        console.log(user)
    })
    .catch(err=>console.log(err))

}




function main(){
    loginForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        submitLogin()
    })
    //extract the search params
    const searchValues = window.location.search
    const params = new URLSearchParams(searchValues)
    const id = params.get('category_id')
    const subURL = `${baseUrl}ads?category=${id}`
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