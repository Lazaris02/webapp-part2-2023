const baseUrl = 'https://wiki-ads.onrender.com/'
const serverUrl = 'http://localhost:5000'
const loginForm = document.querySelector('#login-form')
const loginUsername = document.querySelector('#username')
const loginPassword = document.querySelector('#password')
const notification = document.querySelector('#error-notification')
const favouritesHeart = document.querySelectorAll('.favourites-heart')
const favoritesLink = document.querySelector('#favorites-link')

let CategoryData
let templateData = []
let user
let heart = 'resources/heart.png'
let redheart = 'resources/redheart.png'
let currFavourites = []
// to add to favorites we check if user exists and if his
//session id is defined

function initializeEventListeners(){
    //initializes the needed eventListeners
    loginForm.addEventListener('submit',(e)=>{
        e.preventDefault()
        LS()
    })

    document.addEventListener('click',(e)=>{
        //checks which heart was clicked and performs 
        //the service for the specific ad.
        if(e.target.classList.contains('favourites-heart')){
            //checks if we are logged in 
            if(user === undefined){
                alert('Login to add to favourites')
                return
            }
            //gets the id of the current ad (assigned to the li parent as id)
            let currId = e.target.parentElement.id 
            AFS(currId,e.target)
        }
    })

    favoritesLink.addEventListener('click',(e)=>{createFavoritesURL(e)})
}

function createFavoritesURL(e){
    if(user === undefined || user.sessionId === undefined){e.preventDefault()}
    const favoritesURL = `favorite-ads.html?username=${user["username"]}&sessionId=${user["sessionId"]}`
    favoritesLink.href = favoritesURL
    console.log(favoritesLink.href)
}

function clearCurrentFavourites(){
    //removes everything from the favourites
    for(let fav of currFavourites){
        fav.src = `../${heart}`
    }
    currFavourites = []
}

function changeImage(currImg){
    //changes the image of the clicked heart
   currImg.src = (currImg.src.includes(heart)) ? `../${redheart}` : `../${heart}`
}

function displayError(){
    //displays error message on wrong input
    notification.classList.remove('login-success-message')
    notification.classList.add('login-error-message')
    notification.innerHTML = 'Wrong Credentials!'
}

function displaySuccess(){
    //displays success message on correct input
    notification.classList.remove('login-error-message')
    notification.classList.add('login-success-message')
    notification.innerHTML = 'Successful Login!'
}

function createTemplateData(){
    for(let scd of CategoryData){
        templateData.push({
            'id' : scd['id'],
            'title' : scd['title'],
            'description' : scd['description'],
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

function createFavouriteObject(currId){
    let arrayPosition = CategoryData.findIndex(item=>item['id'] == currId)
    console.log(arrayPosition)
    return {
        "id" : currId,
        "title" : CategoryData[arrayPosition]['title'],
        "description" : CategoryData[arrayPosition]['description'],
        "cost": CategoryData[arrayPosition]['cost'],
        "images" : CategoryData[arrayPosition]['images'][0],
        "username" : user.username,
        "password" : user.password,
        "sessionId" : user.sessionId
    }
}


function LS(){
    //packs the username and password in an object
    //sends the post message with fetch
    //awaits for the response from server and either
    //logs in or notifies the user that he can't login
   
    let unidentifiedUser = {
        "username" : loginUsername.value ,
        "password" : loginPassword.value
    }

    let postHeader = new Headers()
    postHeader.append('Content-Type','application/json')
    let init ={
        method : "POST",
        headers : postHeader,
        body : JSON.stringify(unidentifiedUser)
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
            clearCurrentFavourites()
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

function AFS(currId,adClicked){
    //sends a post request to the server
    //that contains the 
    let favObj = createFavouriteObject(currId)
    let postHeader = new Headers()
    postHeader.append('Content-Type','application/json')
    let init ={
        method : "POST",
        headers : postHeader,
        body : JSON.stringify(favObj)
    }
    fetch(`${serverUrl}/favourites`,init)
    .then(response =>{

        if(response.status == 200){
            changeImage(adClicked)
            currFavourites.push(adClicked)
            console.log('Succesfully Added to Favorites')
        }

        if(response.status == 403){
            console.log("Mismatching session ids")
        }

        if(response.status == 400){
            console.log('Wrong format')
        }

        return response.json()

    })
    .then(data=>{
        currFavourites = data
        console.log(currFavourites)
    })
    .catch(err=>{console.log(err)})
}


function main(){
    initializeEventListeners()
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
        CategoryData = data
        console.log(CategoryData)
        createTemplateData()
        createCategoryTemplate()
    })
    .catch(err=>console.log(err))
}


window.addEventListener('load',main)