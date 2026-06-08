let canvas =document.getElementById("canvas")
let ctx = canvas.getContext("2d");
let timerId = NaN;

let x, color, tailrot, taildir, tailspeed;
let colors = ["red", "blue", "green", "orange", "purple"];

function init()
{
    x = canvas.width;
    color = colors[Math.floor(Math.random() * colors.length)];
    tailrot = 0;
    taildir = 1;
    tailspeed = 1.5;
}

//長方形の描画
function drawRct(x, y, w, h, color, isFill)
{
    if (isFill){
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h); 
    }else{
        ctx.strokeStyle = color;
        ctx.strokeRect(x, y, w, h);
    }
}

//円の描画
function drawCcl(x, y, r, color)
{
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x+r, y+r, r, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}

//多角形の描画
function drawTri(x, y, w, h, color)
{
    ctx.fillStyle =color;
    ctx.beginPath();
    ctx.moveTo(x+w/2, y);
    ctx.lineTo(x, y+h);
    ctx.lineTo(x+w, y+h);
    ctx.closePath();
    ctx.fill();
}

//複数画像を配列として扱う
let img = new Array();
for (i = 0; i < 3; i++){
    img[i] = new Image();
    img[i].src = "button"+i+".png"
}

function drawImgA(x, y, w, h, i)
{
    ctx.drawImage(img[i], x, y, w, h);
}

/*タイマー関連 */
function startTimer(){

    if(isNaN(timerId)){
        timerId = setInterval(draw, 100);
    }
}

function stopTimer(){
    clearInterval(timerId);
    timerId = NaN;
}

//描写
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRct(0, 0, canvas.width, canvas.height, "skyblue", true);
    drawkoinobori(x, 150, color);
    x -= 5;

    if(x < -200){
        x = canvas.width;
        color = colors[Math.floor(Math.random() * colors.length)];
    }
    //尾びれの動き
    tailrot += taildir * tailspeed;
    if(tailrot > 20 || tailrot < -20){
        taildir = -taildir;
    }
}

//こいのぼり用
function drawkoinobori(x, y, color){
    //胴体
    drawRct(x, y, 120, 40, color, true);
    //目
    drawCcl(x + 10, y + 10, 5, "white");
    drawCcl(x + 12, y + 12, 2, "black");
    //尾びれ
    drawTail(x+120, y+20, tailrot, color);
}

//尾びれ用
function drawTail(x, y, rotDig, color){
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotDig * Math.PI / 180);
    ctx.rotate(-Math.PI / 2);
    drawTri(-25, -25, 50, 50, color);
    ctx.restore();
}