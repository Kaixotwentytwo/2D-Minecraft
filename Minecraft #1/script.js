const w = window.innerWidth,
      h = window.innerHeight;
var placingBlocks = ['url(img/block.png)',
                     'url(img/ocr.jpg)',
                     'url(img/diamond.png)',
                     'url(img/redstone.jpg)',
                    'url(img/ruby.jpg)',
                    'url(img/stoneyet.png)',
                    'url(img/stone.png)',
                    'url(img/grass.png)',
                    'url(img/iron.png)',
                    'url(img/magma.jpg)',
                    'url(img/pumpkin.png)',
                    'url(img/glass.png)',
                    'url(img/log.png)',
                    'url(img/dirt.png)']

var backGrounds = ['linear-gradient(50deg, red, cyan)', 
                  'linear-gradient(50deg, #ffffff, cyan)',
                  'linear-gradient(50deg, #493bf7, cyan)',
                  'linear-gradient(-210deg, cyan, white, #ff8000 70%)',
                  'linear-gradient(0deg, #c44398, #6ef2f7 70%)',
                  'linear-gradient(100deg, #d1672e, #fae123 80%)']

let body = document.querySelector('body');
const container = document.querySelector(".container"),
      backGroundContainer = document.querySelector('.backGroundContainer'),
      containerWrapper = document.querySelector('.containerWrapper'),
      choise = document.querySelector('.choise'),
      blockMenu = document.querySelector('.blockMenu'),
      blockListElement = document.querySelector(".blockList");


function color() {
    let da = Math.floor(Math.random() * backGrounds.length);
    return backGrounds[da]
}

body.style.setProperty('--font', color())

let text = document.querySelector('.text')
setTimeout(function() {text.style.opacity = 0}, 19000)
setTimeout(function() {choise.removeChild(text)}, 20000)

let w16 = 16,
    h9 = 9;

let rowValue = w / w16 + 'px',
    columnValue = h / h9 + 'px';

let amount = w16 * h9;


choise.style.setProperty('--width', rowValue)
choise.style.setProperty('--height', columnValue)

function placeBlock() {
    let bg = getComputedStyle(choise).background

    this.style.setProperty('--img',  bg);
    this.style.opacity = 1;
}

function choiseBlock() 
{switch (blockMenu.getAttribute('state')) {
    case 'closed':
        blockMenu.style.zIndex = 1000;
        blockMenu.style.opacity = 1
        blockMenu.setAttribute('state', 'opened');
        break;
    case 'opened':
        blockMenu.style.zIndex = -1000;
        blockMenu.style.opacity = 0
        blockMenu.setAttribute('state', 'closed');
        break;
}};

function changeDegree()
{
    if (containerWrapper.getAttribute("state")==1) //на второй план
    {
        backGroundContainer.style.zIndex = 2;
        backGroundContainer.style.filter = "brightness(.8)"
        container.style.opacity = 0.3
        containerWrapper.setAttribute("state", 2);
        
        document.querySelector("h2").style.opacity = 1;
        document.querySelector("h2").innerHTML = "Выбран задний план";
        setTimeout(function() {(document.querySelector("h2").style.opacity = 0)}, 1000);
    }
    else // на первый план
    {
        backGroundContainer.style.zIndex = 0;
        backGroundContainer.style.filter = "brightness(0.5)"
        container.style.opacity = 1
        containerWrapper.setAttribute("state", 1);
        
        document.querySelector("h2").style.opacity = 1;
        document.querySelector("h2").innerHTML = "Выбран передний план";
        setTimeout(function() {(document.querySelector("h2").style.opacity = 0)}, 1000);
    }
}

choise.addEventListener('mousedown', choiseBlock)
document.addEventListener('keydown', function(event) {
    if (event.code == "KeyF") {choiseBlock()};
    if (event.code == "KeyD") {changeDegree()}
});

let i = 0; // заполнение переднего плана воздухом
while (i < amount) {

    let drop = document.createElement('i');

    container.appendChild(drop);

    let I = document.querySelectorAll('i');

    drop.style.setProperty('--width', rowValue)
    drop.style.setProperty('--height', columnValue)

    I[i].addEventListener('click', function() {
        this.style.opacity = "0";
    })
    I[i].addEventListener('scrollup', function() {
        this.style.opacity = "0";
    })
    I[i].addEventListener('contextmenu', placeBlock)

    I[i].style.opacity = 0;
    
    i++
}

let m = 0; // заполнение заднего плана воздухом
while (m < amount) {

    let drop = document.createElement('k');

    backGroundContainer.appendChild(drop);

    let M = document.querySelectorAll('k');

    drop.style.setProperty('--width', rowValue)
    drop.style.setProperty('--height', columnValue)

    M[m].addEventListener('click', function() {
        this.style.opacity = "0";
    })
    M[m].addEventListener('scrollup', function() {
        this.style.opacity = "0";
    })
    M[m].addEventListener('contextmenu', placeBlock)
    
    M[m].style.opacity = 0;
    
    m++
}

for (let i = 0; i <= placingBlocks.length; i++) 
{
    let drop = document.createElement('p');
    blockListElement.appendChild(drop);
    let blockList = document.querySelectorAll('p');

    blockListElement.childNodes[i].style.setProperty('--img', placingBlocks[i])    
}

blockListElement.childNodes.forEach(e => e.addEventListener('click', function(e) {
    choise.style.setProperty('--img', getComputedStyle(this).background);
    choiseBlock()
}))