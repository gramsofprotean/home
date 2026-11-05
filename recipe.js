const ingredient_text = document.getElementById('ingredient-text');

const direction_text = document.getElementById('direction-text');

const recipe_image = document.getElementById('photo');

const recipe_title = document.getElementById('title');

const recipe_servings = document.getElementById('serves');

const recipe_time = document.getElementById('time');

const recipe_author = document.getElementById('recipe-credit');

const recipe_photographer = document.getElementById('image-credit');


const webSearchBar = window.location.search;

const urlParams = new URLSearchParams(webSearchBar);

target_id = urlParams.get('id');

target_recipe = recipes.find(recipe => recipe.id == target_id);

recipe_image.src = target_recipe.image;

recipe_title.textContent = target_recipe.title;

recipe_servings.textContent = "Serves: "+target_recipe.serves;

recipe_time.textContent = "Time: "+target_recipe.prepTime;

recipe_author.textContent = "By: "+target_recipe.author;

recipe_photographer.textContent = "Photography: "+target_recipe.photographer;




ingredient_text.textContent = "Ingredients: \n\n";
for(const item of target_recipe.ingredients){
    ingredient_text.textContent += item;
    ingredient_text.textContent += '\n\n';
}

direction_text.textContent = "Directions: \n\n";
var count = 0;
for(const item of target_recipe.directions){
    count += 1;
    direction_text.textContent += `${count}. `;
    direction_text.textContent += item;
    direction_text.textContent += '\n\n';
}







