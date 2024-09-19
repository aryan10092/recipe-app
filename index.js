const input=document.querySelector(`.sea`);
const search=document.querySelector(`.butt`);
const alldata=document.querySelector(`.data`);
const close=document.querySelector(`.cross`);
const info=document.querySelector(`.deta`);
fetchd();
search.addEventListener(`click`,(x)=>{
    x.preventDefault();
    const sinput=input.value;
    if(!sinput){
        alldata.innerHTML=`<h2 style="color:white">Type the food in search box </h2>`
        
        return;
    }
    fetchdata(sinput);
})

async function fetchdata(s){
    try{
const response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${s}`);
const value= await response.json()
alldata.innerHTML=""

value.meals.forEach(k => {

    const tex=document.createElement("div");
   
tex.classList.add(`it`)
    tex.innerHTML=`
   
    <img class="i" src="${k.strMealThumb}"/>
   <h3 class="nam">${k.strMeal}</h3>
    <p class="nam"> ${k.strArea}</p>
    <p class="nam">${k.strCategory}</p>
   

    `
    const but=document.createElement("button")
    but.textContent="View Recipe"
    tex.appendChild(but);
    but.addEventListener(`click`,()=>{
         showr(k);
    })
    alldata.appendChild(tex);

   
    
});}
catch(error){

alldata.innerHTML=`<h2 style="color:white"> food not found</h2>`
}}
 function fetchIngredients(mea){
    let ingred="";
    for(let i =1;i<40 ;i++){
        const ing=mea[`strIngredient${i}`];
        if(ing){
            const m=mea[`strMeasure${i}`];
            ingred+=`<li>${m}${ing}</li>`
        }
        else{
            break;
        }
    }
    return ingred;

}



  function showr(k){
   info.innerHTML=`
   <h2 class="rm">${k.strMeal}</h2>
   <h3 >Ingredients:</h3>
   <ul class="ri">${fetchIngredients(k)}</ul>
   <div> 
   <h3 class="rin">Instructions:</h3>
   <p class="rin">${k.strInstructions}</p>
   </div>
   `
    info.parentElement.style.display="block";

}

close.addEventListener(`click`,()=>{
    info.parentElement.style.display="none";


})
 async function fetchd(){
    const respons=await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
    const valu= await respons.json();
   
    if (valu.meals && valu.meals[0]) {
        const meal = valu.meals[0];
    display(meal);}}
    
function display(me){
    alldata.innerHTML=""
    const text=document.createElement("div");
    text.className="item";
    text.innerHTML=`
    <div > 
   <div> <img class="id" src="${me.strMealThumb}"/></div>
   <div> <h3 class="name">${me.strMeal}</h3>
    <p class="name"> ${me.strArea}</p>
    <p class="name">${me.strCategory}</p></div>

    `
    text.classList.add(`x`)
    const bu=document.createElement("button")
   
    bu.textContent="View Recipe"
    text.appendChild(bu);
    bu.addEventListener(`click`,()=>{
         showr(me);
    })
  
    alldata.appendChild(text);
}
