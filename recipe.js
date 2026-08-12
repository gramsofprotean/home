

const recipes = [
    {
    id:"chickpea-chicken-salad",
    title:"Chickpea Chicken Salad",
    image:"images/recipe-images/chickpea-chicken-salad.png",
    serves: 6,
    prepTime: "45min",
    author:"Almaveganac",
    photographer:"Almaveganac",
    ingredients:[
        "89g Water (6 Tbsp or 3/8 cup)",
        "76g Hemp Hearts",
        "10g plant based protein (pea/quinoa)",
        "2g Garlic (small clove)",
        "10g apple cider vinegar (1½ tsp)",
        "4g Djon mustard (½ tsp)",
        "2g salt (solid pinch for the blender mayo)",
        "3g chia seeds"
    ],
    directions:[
        "make the thing",
        "eat the thing"
    ]
    }
]

const ingredient_text = document.getElementById('ingredient-text');

const direction_text = document.getElementById('direction-text');

const recipe_image = document.getElementById('photo');

const recipe_title = document.getElementById('title');

const recipe_servings = document.getElementById('serves');

const recipe_time = document.getElementById('time');

const recipe_author = document.getElementById('recipe-credit');

const recipe_photographer = document.getElementById('image-credit');


target_id = "chickpea-chicken-salad";

target_recipe = recipes.find(recipe => recipe.id == target_id);

recipe_image.src = target_recipe.image;

recipe_title.textContent = target_recipe.title;

recipe_servings.textContent = "Serves: "+target_recipe.serves;

recipe_time.textContent = "Time: "+target_recipe.prepTime;

recipe_author.textContent = "by: "+target_recipe.author;

recipe_photographer.textContent = "photo credit: "+target_recipe.photographer;




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







