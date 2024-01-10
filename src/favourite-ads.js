const baseUrl = 'https://wiki-ads.onrender.com/'
const serverUrl = 'http://localhost:5000'

// function createFavouriteTemplate(){
//     //creates the template function
// let favouriteTemplateScript = document.querySelector('#favourite-ads-template').textContent
// let compiledFavouriteTemplate = Handlebars.compile(favouriteTemplateScript)
// let templateObj = compiledFavouriteTemplate({
//     'favouriteAds' : templateData
// })
// let favAdsList = document.querySelector('.favourite-ads-list')
// favAdsList.innerHTML = templateObj
// }

function FRS(){
    let myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json')

    let init = {
        method: 'GET',
        headers: myHeaders
    }

    fetch(`${serverUrl}/user/favourites`,init)
    .then(response => {
        if(response.status == 403){
            console.log('Mismatching session ids')
        }

        if(response.status == 400){
            console.log('Wrong format')
        }

        return response.json()
    })
    .then(favList => {
        // Handle the retrieved favorites list
        console.log('Favorites List:', favList)
        // Display the favorites list in the user interface (e.g., update HTML elements)
        // Example: Assuming you have an element with the id 'favorites-list'
        const favoritesListElement = document.getElementById('favorites-list');
        favoritesListElement.innerHTML = '' // Clear previous content

        favList.forEach(ad => {
            const adElement = document.createElement('div')
            adElement.textContent = ad.title;// Assuming 'title' is a property of each ad
            favoritesListElement.appendChild(adElement)
        })
    })
    .catch(err=>{console.log(err)})
}
