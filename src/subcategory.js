const baseUrl = 'https://wiki-ads.onrender.com/'

let subURL
let fullAds

document.addEventListener('load',main())


function main(){
    //creates the template function
    let fullAdsTemplateScript = document.querySelector('#ads-container-template').textContent
    compiledCategoryTemplate = Handlebars.compile(fullAdsTemplateScript)

    //extract the search params
    const searchValues = window.location.search
    const params = new URLSearchParams(searchValues)
    const id = params.get('category_id')
    subURL = `${baseUrl}ads?subcategory=${id}`
    //fetch the needed data

    fetch(subURL)
    .then(response=>response.json())
    .then(data=>{
        fullAds = data
        console.log(fullAds)
    })
}