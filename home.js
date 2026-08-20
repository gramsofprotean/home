const boxContainer = document.getElementById('box-container')

pages = ["cross-stitch-designer", "almaveganac"]

const pagesMap = {
    "cross-stitch-designer":{
        "text":"Cross Stitch Designer / Pixel Art->Cross Stitch Converter",
        "link":"cross-stitch-designer.html",
        "image":"images/page-box-icons/cross-stitch-designer-boxart.png"},

    "almaveganac":{
        "text":"Almaveganac | Vegan Recipe Archvie",
        "link":"almaveganac.html",
        "image":"images/page-box-icons/almaveganac-boxart.png"}
}

for(const page of pages){
    const clickableDiv = document.createElement("a");
    clickableDiv.classList.add("box-anchor");

    clickableDiv.href = `${pagesMap[page]["link"]}`;
    clickableDiv.style.textDecoration = "none";
    clickableDiv.style.color = "inherit";
    clickableDiv.style.cursor = "pointer";

    const newDiv =  document.createElement("div");
    newDiv.classList.add("box");

    const url = pagesMap[page]["image"];

    const blurFilterDiv = document.createElement("div");

    blurFilterDiv.classList.add("blur-filter-div");

   

    blurFilterDiv.style.backgroundImage = `url("${url}")`;
    blurFilterDiv.style.backgroundSize = 'cover'; 
    blurFilterDiv.style.height = 'inherit';
    blurFilterDiv.style.width = 'inherit';



    const newDiv2 = document.createElement("div");

    newDiv2.classList.add("box-text-container");

    const newDiv2Text = document.createElement("p");
    newDiv2Text.textContent = pagesMap[page]["text"];
    newDiv2Text.classList.add("box-text")

    

    boxContainer.appendChild(clickableDiv);
    newDiv2.appendChild(newDiv2Text);
    newDiv.appendChild(blurFilterDiv);
    clickableDiv.appendChild(newDiv);
    newDiv.appendChild(newDiv2);
}


