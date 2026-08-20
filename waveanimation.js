const animCanvas = document.getElementById("animation-canvas"); 
const ctx = animCanvas.getContext("2d");

const dimensions = animCanvas.getBoundingClientRect();

animCanvas.height = dimensions.height;;
animCanvas.width = dimensions.width;

ctx.font = "28px monospace";
ctx.fillStyle ="white";


const anichars = [];

const allAnichars = [];

const startX = 960;
const startY = 288;

const startPercX = startX/animCanvas.width
const startPercY = startY/animCanvas.height



function spawn_animchar(yOffIn, xOffIn, squadIn,leaderIn){
    anichars.push({
        char:"=",
        x:startX,
        y:startY,
        state:1,
        yOff:yOffIn,
        xOff:xOffIn,
        squad:squadIn,
        leader:leaderIn
    })
    allAnichars.push({
        char:"=",
        x:startX,
        y:startY,
        state:1,
        yOff:yOffIn,
        xOff:xOffIn,
        squad:squadIn,
        leader:leaderIn
    })

}


function stateOne(particle){
    const percLeft = (particle.x/animCanvas.width)
    const percBelow = 1-(particle.y/animCanvas.height)

    const deltaX = -1*(2*percLeft/startPercLeft)
    const deltaY = (3*percBelow)/startPercBelow;
}


const stateMap = {
    1:{
        "BinaryX":0,
        "BinaryY":1,
        "HorzVelocity":50,
        "VertVelocity":96,
        "char":"@",
    },
    2:{
        "BinaryX":0,
        "BinaryY":0,
        "HorzVelocity":50,
        "VertVelocity":2.4,
        "char":"|",
    },
    3:{   
        "BinaryX":1,
        "BinaryY":0,
        "HorzVelocity":.150,
        "VertVelocity":2.4,
        "char":"/",
    },
    4:{
        "BinaryX":1,    
        "BinaryY":1,
        "HorzVelocity":25,
        "VertVelocity":24,
        "char":"=",

    },
    5:{
        "BinaryX":1,
        "BinaryY":1,
        "HorzVelocity":50,
        "VertVelocity":96,
        "char":"&",
    },
    6:{
        "BinaryX":1,
        "BinaryY":0,
        "HorzVelocity":50,
        "VertVelocity":2.4,
        "char":"|",
    },
    7:{   
        "BinaryX":0,
        "BinaryY":0,
        "HorzVelocity":.150,
        "VertVelocity":2.4,
        "char":"\\",
    },
    8:{
        "BinaryX":0,    
        "BinaryY":1,
        "HorzVelocity":25,
        "VertVelocity":24,
        "char":"=",
    },
}

let count = 0;
let curSquad = 0;
let total_char = 0;

const charListMap = {}

charListMap[`squad_${curSquad}`] = [];
spawn_animchar(total_char/20,-total_char/40,charListMap[`squad_${curSquad}`],true);

charListMap[`squad_${curSquad}`].push(anichars.pop());





function animate(timestamp) {
    
    if(total_char<600){
        if(count==2){
            if(total_char % 11 == 0){
                curSquad += 1;
                charListMap[`squad_${curSquad}`] = [];
                spawn_animchar(total_char/20,-total_char/40,charListMap[`squad_${curSquad}`],true);
                charListMap[`squad_${curSquad}`].push(anichars.pop());
                total_char +=1;
                count = 0;
            }
            else{
                total_char +=1;
                spawn_animchar((total_char*(Math.random() < 0.5 ? 1 : -1))/5,(total_char* (Math.random() < 0.5 ? 1 : -1))/5,charListMap[`squad_${curSquad}`], false);
                charListMap[`squad_${curSquad}`].push(anichars.pop());
                total_char  += 1;
                count = 0;
            }
            
        }

    }
    
    
    count += 1;
    
    


    ctx.clearRect(0, 0, animCanvas.width, animCanvas.height);

    

    for(const particle of allAnichars){

        const percX = (particle.x/animCanvas.width)
        const percY = (particle.y/animCanvas.height)

        if (particle.state === 1) {
            if (particle.x < startX / 3) {
                particle.state++;
            }
        } 
        else if (particle.state === 2) {
            if (particle.y < startY) {
                particle.state++;
            }
        } 
        else if (particle.state === 3) {
            if (particle.x > startX / 5) {
                particle.state++;
            }
        } 
        else if (particle.state === 4) {
            if (particle.x > startX) {
                particle.state++;
            }
        } 
        else if (particle.state === 5) {
            if (particle.x > (startX / 3) * 5) {
                particle.state++;
            }
        } 
        else if (particle.state === 6) {
            if (particle.y < startY) {
                particle.state++;
            }
        } 
        else if (particle.state === 7) {
            if (particle.x < (startX / 5) * 9) {
                particle.state++;
            }
        } 
        else if (particle.state === 8) {
            if (particle.x < startX) {
                particle.state = 1;
            }
        }


        particle.char = stateMap[particle.state]["char"];

        const deltaX = stateMap[particle.state]["HorzVelocity"]*((stateMap[particle.state]["BinaryX"]-percX)/startPercX);

        const deltaY = stateMap[particle.state]["VertVelocity"]*((stateMap[particle.state]["BinaryY"]-percY)/startPercY);
        
        ctx.fillText(particle.char, particle.x, particle.y);
        
   
        
        
        

        if(particle.leader){
            particle.x += deltaX;
            particle.y += deltaY;
            particle.squad[0].x = particle.x;
            particle.squad[0].y = particle.y;
        }
        else{
            particle.x = particle.squad[0].x;
            particle.y = particle.squad[0].y;
        
            particle.x += particle.xOff;
            particle.y += particle.yOff;
        }
        
        
    }

    

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);




