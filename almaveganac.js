const recipeBoxContainer = document.getElementById('recipe-box-container');


for(const recipe in recipes){
    const newRecipeAnchor = document.createElement("a");
    newRecipeAnchor.classList.add("recipe-anchor");
    newRecipeAnchor.href = `recipe.html?id=${recipes[recipe]["id"]}`;
    newRecipeAnchor.style.backgroundImage = `url("${recipes[recipe]["image"]}")`;
  

    newRecipeAnchor.style.textDecoration = "none";
    newRecipeAnchor.style.color = "black";
    newRecipeAnchor.style.fontWeight = "bold";

    const newRecipeBox = document.createElement("div");
    newRecipeBox.classList.add("recipe-box");
    
    const newRecipeBoxLabelContainer = document.createElement("div");
    newRecipeBoxLabelContainer.classList.add("recipe-box-label-container");

    const newRecipeBoxText = document.createElement("p");
    newRecipeBoxText.classList.add("recipe-box-text");
    newRecipeBoxText.textContent = `${recipes[recipe]["title"]}`
    
    
    recipeBoxContainer.appendChild(newRecipeAnchor);
    newRecipeAnchor.appendChild(newRecipeBox);
    newRecipeBox.appendChild(newRecipeBoxLabelContainer);
    newRecipeBoxLabelContainer.appendChild(newRecipeBoxText);


    
    
}
