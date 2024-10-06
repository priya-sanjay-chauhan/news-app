const API_KEY = "804cd2ec3f054bdf9b743888167e2f6e"
const url = "https://newsapi.org/v2/everything?q="
// const url="https://newsapi.org/v2/everything?q=&from=2024-09-05&sortBy=publishedAt"

window.addEventListener("load", () => fetchNews("India"))

function reload(){
    window.location.reload()
}

async function fetchNews(query,sortBy="published") {
    try{
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}&sortBy=${sortBy}`)
    const data = await res.json()
    console.log(data.articles)
    bindData(data.articles)
    }catch(error){
        console.error("There is some error",error)
    }
}

function bindData(articles) {
    const cardContainer = document.getElementById('cards-container');
    const cardTemplate = document.getElementById('template-news-card');

    if (!cardTemplate) {
        console.error("Template not found!");
        return;
    }

    cardContainer.innerHTML = '';

    articles.forEach(article => {
        if (!article.urlToImage) {
            return;
        }
        const card = cardTemplate.content.cloneNode(true)

        const newsImage = card.querySelector("#news-image");
        const newsTitle = card.querySelector("#news-title");
        const newsDescription = card.querySelector("#desc");
        const newsSource = card.querySelector("#news-source");

        newsImage.src = article.urlToImage;
        newsTitle.textContent = article.title;
        newsDescription.textContent = article.description;
        newsSource.textContent = `${article.source.name} • ${new Date(article.publishedAt).toLocaleDateString()}`;


        card.querySelector('.card').addEventListener("click", () => {
            console.log("Card Clicked: ", article.url); 
            window.open(article.url, "_blank")
        })

        cardContainer.appendChild(card);
    });

}

let selectedList=null;
function itemClick(id){
    fetchNews(id)
    const navItem=document.getElementById(id)
    if(selectedList){
        selectedList.classList.remove("active")
    }
    if(navItem){
        navItem.classList.add("active")
    }

    selectedList=navItem
}

const searchButton=document.querySelector('.search-button')
const searchText=document.querySelector('input')

searchButton.addEventListener("click",()=>{
    const text=searchText.value;
    if(!text){
        return;
    }
    fetchNews(text);
    if(selectedList){
        selectedList.classList.remove("active")
    }
    
})

function onSortChange(){
    const sortBy=document.getElementById('sort-by').value;
    if(selectedList){
        fetchNews(selectedList.id,sortBy)
    }else{
        fetchNews("India",sortBy)
    }
}
