
const baseUrl = 'https://wiki-ads.onrender.com/'

let subURL
let fullAds


document.addEventListener('load',main())

function createTableData(){
  //creates an array that contains substrings
  //made from the features of each ad
  for(let ad of fullAds){

     ad['ftr'] = ad['features'].split(';')
  }
}


function createSubCategoryTemplate(){
    let fullAdsTemplateScript = document.querySelector('#full-ad-template').textContent
    let compiledAdsTemplate = Handlebars.compile(fullAdsTemplateScript)
    console.log(fullAds)
    let templateObj = compiledAdsTemplate({
        'fullAds' : fullAds
    })
    console.log(templateObj)
    let adsList = document.querySelector('.full-ad-container')
    adsList.innerHTML = templateObj
}

function main(){
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
        createTableData()
        createSubCategoryTemplate()        
    })
    .catch(err=>console.log(err))
}