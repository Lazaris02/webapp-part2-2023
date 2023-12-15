import User from "./user.js"

const baseUrl = 'https://wiki-ads.onrender.com/'
const loginButton = document.querySelector('#login-button')
const loginUsername = document.querySelector('#username')
const loginPassword = document.querySelector('#password')

let subCategoryData
let templateData = []







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
    // let username = loginUsername.value
    // let password = loginPassword.value
    let username = "s"
    let password = "p"
    console.log(username,password)
    let user = new User(username,password)
    console.log(user.getUsername,user.getPassword)
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