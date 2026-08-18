const recipes = [
    {
    id:"EXAMPLE RECIPE",
    title:"Example recipe!",
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
    },

    {'id': 'chickpea-chicken-salad', 'title': 'Chickpea Chicken Salad', 'prepTime':'45min', 'image': 'images/recipe-images/chickpea-chicken-salad.png', 'serves': '6', 'author': 'Almaveganac', 'photographer': 'Almaveganac', 'ingredients': ['89g Water (6 Tbsp or 3/8 cup)', '76g Hemp Hearts', '10g plant based protein (pea/quinoa)', '2g Garlic (small clove)', '10g apple cider vinegar (1½ tsp)', '4g Djon mustard (½ tsp)', '2g salt (solid pinch for the blender mayo)', '3g chia seeds', '71g Celery (2 stalks)', '44g Shallot (med/small)', '~15.5oz Canned chickpeas', '2g Lemon juice ', 'Poultry seasoning (Sage, rosemary, thyme)', 'Dried or fresh Dill', 'Cumin'], 'directions': ['Drain the liquid from can of chickpeas, rinse off any remaining liquid', 'Pour chickpeas into a medium sized bowl with enough room to comfortably mash them', 'Add a pinch of salt to the bowl and mash them thoroughly.', 'Cut shallots into a small dice/mince and add them to the bowl', 'Cut celery into a small dice and add it to the bowl', 'Into a blender, add the water, garlic, apple cider vinegar, chia seeds, hemp hearts, plant protein, salt, a few cracks of pepper, and djon mustard', 'Blend on high for 60-90sec until the mixture is creamy and there are no longer noticeable chunks (it may take longer for a non vitamix)', 'Add the wet mixture to the bowl with the vegetables and add lemon juice, sage, rosemary, thyme, dill, and cumin', 'Mix and enjoy']}
    ,
    {'id': 'guajillo-ancho-chili-paste', 'title': 'Guajillo-Ancho Chili Sauce/Paste', 'image': 'images/recipe-images/guajilloanchoonpasta.png', 'serves': '10, total batch is around a few cups of sauce', 'prepTime': '45min', 'author': 'Almaveganac', 'photographer': 'Almaveganac (PICTURED: SAUCE ON PASTA WITH TOFU AND NUTRITIONAL YEAST)', 'ingredients': ['1oz guajillo dried', '2oz ancho dried', '(DRIED PEPPER WEIGHTS WERE TAKEN BEFORE STEMS WERE CUT)', '427g (2 whole) Red bell pepper with stems already cut off', '50g (2 whole) jalapeno with stems already cut off', '63g (most of a bunch?) cilantro', '104g (8tbsp @ 13g/tbsp) extra virgin olive oil', '42g peeled garlic cloves', '54g lemon juice (4tbsp)', '23g plain salt (3tsp)', '12g cumin'], 'directions': ['Cut stems off of the peppers and soak them in boiling water for at least 15min.', 'Add the olive oil and lemon juice to a high-powered blender.\n', 'Very roughly chop the bell peppers, cilantro, serrano and jalapeno, add them to the blender cup.\n', 'Drain and add the soaked guajillo and ancho peppers to the blender cup. ', 'Peel and add the garlic cloves to the blender cup.', 'Add the cumin, blend on high for a couple minutes, salt to taste.']}
    //{'id': 'chocolate-coconut-banana-PB-cookies', 'title': 'Chocolate, Banana, Coconut, & Peanut Butter Cookies', 'image': '', 'serves': '10 (1 cookie/person)', 'time': '45min', 'author': 'Almaveganac', 'photographer': 'N/A', 'ingredients': ['2 Bananas', '1/2cup Crunchy Peanut Butter', '1/2cup Unsweet Coconut Flakes', 'Vegan Chocolate (to taste)'], 'directions': ['Pre-heat oven to 350F', 'Mash the bananas into a bowl.', 'add the peanut butter, coconut flakes, and vegan chocolate.', 'Scoop and shape 10 cookies of equal size on a parchment paper lined baking sheet. Then flatten them out firmly (they will not flatten by themselves in the oven)','Bake for 15-20min (I have yet to overcook them, they tend to be soft)']}
]

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







