const baseUrl = 'https://wiki-ads.onrender.com/'


let subURL 
let subCategoryData
let templateData = []
let compiledCategoryTemplate


document.addEventListener('load',main())


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
    let templateObj = compiledCategoryTemplate({
        'ads' : templateData
    })
    console.log(templateObj)
    let adsList = document.querySelector('.ads-container')
    adsList.innerHTML = templateObj
}




function main(){
    //creates the template function
    let categoryTemplateScript = document.querySelector('#ads-container-template').textContent
    compiledCategoryTemplate = Handlebars.compile(categoryTemplateScript)

    //extract the search params
    const searchValues = window.location.search
    const params = new URLSearchParams(searchValues)
    const id = params.get('category_id')
    subURL = `${baseUrl}ads?subcategory=${id}`
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