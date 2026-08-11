const stateMap = {
    drawing: 0,
    erasing: 1,
}

let state = stateMap['drawing']

let panEnabled = true;

let accumatedX = 0, accumatedY = 0;

let currentZoom = 1;
let startPosX = 0;
let startPosY = 0;
let mouse_dragging = false;
let panX = 0;
let panY = 0;
    
let pressStartTime = 0;

let controlsVisible = true;

const imageUploadButton = document.getElementById('imageUpload');

const showHide = document.getElementById('showHideControls');

const pixelCanvas = document.getElementById('pixel-canvas');

const tempMobile = document.getElementById('tempMobile');

const eraserButton = document.getElementById('eraser');

const pencilButton = document.getElementById('pencil');

//rect for pixel canvas
const rect = pixelCanvas.getBoundingClientRect();
pixelCanvas.style.position = 'absolute';

const colorPicker = document.getElementById('colorPicker')

function makeGrid(rows, cols) {
    pixelCanvas.style.setProperty('--grid-rows', rows)
    pixelCanvas.style.setProperty('--grid-cols', cols)

    pixelCanvas.innerHTML = '';

    for (let r = 0; r<rows;r++){
        for(let c = 0;c<cols;c++){
            const pixel=document.createElement('div');
            pixel.style.backgroundColor = "#cbcaca";
            pixel.dataset.col = c;
            pixel.dataset.row = r;

            const newImg = document.createElement('img');

            newImg.src='images/xframegray.png';
            newImg.alt='local x frame';
            newImg.width =20;
            newImg.height=20;

            pixel.appendChild(newImg);

            pixel.classList.add('pixel');
            pixel.classList.add('pixLabel');

            pixel.addEventListener('click', function(){

                const pressDuration = Date.now() - pressStartTime;

                
                if(pressDuration>200) return;

                if(state==stateMap['drawing']){
                    pixel.style.backgroundColor = colorPicker.value;
                    const label = pixel.querySelector('img');
                    if(label){
                        label.src='images/xframefilledgray.png';
                    }
                    
                }
                if(state==stateMap['erasing']){
                    pixel.style.backgroundColor = '#cbcaca';
                    const label = pixel.querySelector('img');
                    if(label){
                        label.src='images/xframegray.png';
                    }
                    
                }

                
            });
            pixelCanvas.appendChild(pixel);
        }
    }
}

//Save initial cordinates of pixel canvases position to orient for mobile later
const pCanvasTop = pixelCanvas.style.top;
const pCanvasLeft = pixelCanvas.style.left;

console.log(pCanvasTop, pCanvasLeft)

function extractPixels(file) {
    return new Promise((resolve,reject) => {

        const reader = new FileReader();

        reader.onload = function(event){

            const iag = new Image();
            iag.onload = function(){
                const hidCanvas = document.createElement('canvas');
                hidCanvas.width = iag.width;
                hidCanvas.height = iag.height;

                const ctx = hidCanvas.getContext('2d');
                ctx.drawImage(iag, 0, 0, iag.width, iag.height);

                const iagData = ctx.getImageData(0,0,iag.width,iag.height).data;
                
                //this resolves the promise
                resolve([iagData, iag.width, iag.height]);
            }
            iag.onerror = () => reject(new Error("Image failed to load"));
            iag.src = event.target.result;
        };  
        reader.onerror = () => reject(new Error("File reader failed to load"));
        reader.readAsDataURL(file);
    });
}

function disectImage() {
    
    userImg = document.getElementById('imageUpload');

    userImg.addEventListener('change', async function(event) {

        //Actually retrieve the userImg file
        const file = event.target.files[0];
        if (!file) return;
        
        try {
            // using await here makes the function not run fully until resolved, guarenteeing usable data or proper error
            const [pix_data, w_data, h_data] = await extractPixels(file);
            pasteUserImage(pix_data, w_data, h_data);
        }
        catch(error){
            console.error("this dont work",error);
        }
    });
}

function pasteUserImage(pix_data_in, w_data_in, h_data_in){
    const pixel_canvas_width = pixelCanvas.style.getPropertyValue("--grid-rows");
    const pixel_canvas_height = pixelCanvas.style.getPropertyValue("--grid-cols");

    
    if(pixel_canvas_width>=w_data_in && pixel_canvas_height>=h_data_in){
        
        for(let r=0;r<h_data_in;r++){
            for(let c=0;c<w_data_in;c++){

                const pix_change = document.querySelector(`[data-col="${c}"][data-row="${r}"]`);

                if (pix_change){
                    
                    //there are width*4(rgba per pixel) values per row
                    const valuesPerRow = w_data_in*4;
                    
                    const rValue = pix_data_in[(c*4)+(r*valuesPerRow)];
                    const gValue = pix_data_in[(c*4)+(r*valuesPerRow)+1];
                    const bValue = pix_data_in[(c*4)+(r*valuesPerRow)+2];
                    const aValue = (pix_data_in[(c*4)+(r*valuesPerRow)+3])/255;
                    // debug code for math console.log((c*4)+(r*valuesPerRow), (c*4)+(r*valuesPerRow)+1, (c*4)+(r*valuesPerRow)+2, (c*4)+(r*valuesPerRow)+3)
                    
                    //if the pixel is completely transparent then dont change it at all, otherwise set pixel to proper values
                    if(aValue>0) pix_change.style.backgroundColor = `rgba(${rValue}, ${gValue}, ${bValue}, ${aValue})`;
                }
            }
        }
    }
    else{
        console.log("THE IMAGE IS TOO BIG BUDDY")
    }
    //const thechosenone = document.querySelector('[data-row="1"][data-col="2"]');
    //console.log(thechosenone);
    //thechosenone.style.backgroundColor = "black"
}

pixelCanvas.addEventListener('wheel', function(event){
    if(!panEnabled) return;
    currentZoom += event.deltaY/1000;
    pixelCanvas.style.scale = currentZoom;

});

pixelCanvas.addEventListener('dragstart', function(event){
    event.preventDefault();
});

pixelCanvas.addEventListener('pointerdown', function(event){
    if(!panEnabled) return;
    pressStartTime = Date.now();
    mouse_dragging = true;

    startPosX = event.clientX;
    startPosY = event.clientY;

    
});

pixelCanvas.addEventListener('pointermove', function(event){
    if(!mouse_dragging || !panEnabled) return;

    const dx = event.clientX-startPosX;
    const dy = event.clientY-startPosY;
    
    panX = accumatedX + dx;
    panY = accumatedY + dy;


    //console.log(startPosX,startPosY);
    pixelCanvas.style.transform = `translate(${panX}px, ${panY}px)`;
    
    
});

pixelCanvas.addEventListener('pointerup', function(event){
    if(!panEnabled) return;
    mouse_dragging = false;

    accumatedX = panX;
    accumatedY = panY;
    
});

showHide.addEventListener('click', function() {
if(controlsVisible){
    controlsVisible = false;
    imageUploadButton.disabled = true;
    colorPicker.disabled = true;
    imageUploadButton.style.opacity = '0';
    colorPicker.style.visibility = 'hidden';
}
else{
    controlsVisible = true;
    imageUploadButton.disabled = false;
    colorPicker.disabled = false;
    imageUploadButton.style.opacity = '1';
    colorPicker.style.visibility = 'visible';
    
}
});

tempMobile.addEventListener('click',  function() {
    if(panEnabled) {
        panEnabled = false;
        pixelCanvas.style.position = 'absolute';
        pixelCanvas.style.top = '10%';
        pixelCanvas.style.left = '10%';
        pixelCanvas.style.transform = 'translate(-15%, -10%)';
        pixelCanvas.style.scale = '80%'
        
    }
    
    else{

        panEnabled = true; 
        mouse_dragging = false;
    }
});

eraserButton.addEventListener('click', function(){
    state = stateMap['erasing'];
});

pencilButton.addEventListener('click', function(){
    state = stateMap['drawing'];
});



makeGrid(100,100);

disectImage();

