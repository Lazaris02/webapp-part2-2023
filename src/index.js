

//client for the app
const baseUrl = 'https://wiki-ads.onrender.com/'
var main_category
var sub_category = {}
let compiledIndexTemplate





function sortSubCategories(data){
    //after we fetch the subcategories
    //we sort them out + add them to the main_category
    for(let sub of data){
        sub_category[sub['category_id']].push(sub)
    }

    let curr_id
    for(let mc of main_category){
        curr_id = mc['id']
        mc['sub'] = [...sub_category[curr_id]]
    }

    
}

function createIndexTemplate(){
    let categoryObj = compiledIndexTemplate({
        'mainCategory' : main_category 
    })
    let category_list = document.querySelector('.categories-container')
    category_list.innerHTML = categoryObj
}

function initSubCategory(){
    //initializes the sub-category object
    for(let d of main_category){
        sub_category[d['id']] = []
    }
}





function main(){
    //creates the template function
    let index_template_script = document.querySelector('#categories-container-template').textContent
    compiledIndexTemplate = Handlebars.compile(index_template_script)

    //fetches all the categories data and returns them
    fetch(baseUrl+'categories')
    .then(response => response.json())
    .then(data=>{
        main_category = data
        initSubCategory()
        return fetch(baseUrl+'subcategories')
    })
    .then(response=>response.json())
    .then(data=>{
        sortSubCategories(data)
        createIndexTemplate()
    })
    .catch(err=> console.log(err))
}

window.addEventListener('load',main)





 
