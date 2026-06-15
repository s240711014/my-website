let canvas =document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let old_x = 0;
let old_y = 0;

let size = 10;
let color = "#ff0000"
let shape = "line";

function init()
{
    canvas.addEventListener("touchstart", touchStart, false);
    canvas.addEventListener("touchmove", touchMove,false);

    window.addEventListener("orientationchange", oChange, true);

    //色
    let picker = document.getElementById("colorPicker");
    picker.addEventListener("input", changeColor);
    //太さ
    let slider = document.getElementById("sizeSlider");
    slider.addEventListener("input", changeSize);
}

function touchStart(event)
{
    if (event.touches.length > 1)
    {
        size = event.touches.length * 2;
    }

    old_x = event.touches[0].pageX;
    old_y = event.touches[0].pageY;
}

function touchMove(event)
{
    let c_x;
    let c_y;
    event.preventDefault();
    c_x = event.touches[0].pageX;
    c_y = event.touches[0].pageY;
    Penshape(c_x, c_y)
    old_x = c_x;
    old_y = c_y;
}

function drawLine(x1, y1, x2, y2, psize,color)
{
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.lineWidth = psize;
    ctx.strokeStyle = color;
    ctx.stroke();
}

function drawCcl(x, y, r, color)
{
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}

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

//絵を消す
function clearCanvas()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function oChange()
{
    var flag = confirm("絵を消去しますか？");
    if (flag == false) return;
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//色の変更
function changeColor(event)
{
    color = event.target.value;
}

//太さの変更
function changeSize(event)
{
    size = Number(event.target.value);
    document.getElementById("sizeText").textContent = size;
}

//ペン先の変更
function circlePen()
{
    shape = "circle";
}

function linePen()
{
    shape = "line";
}

function trianglePen()
{
    shape = "triangle";
}

function Penshape(x, y)
{
    if (shape == "circle")
    {
        drawCcl(x, y, size, color);
    }
    else if (shape == "line")
    {
       drawLine(old_x, old_y, x, y, size, color);
    }
    else if (shape == "triangle")
    {
        drawTri(x, y, size, size, color);
    }
}