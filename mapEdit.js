function init(){
    let b = document.getElementById("board");
    for (let i = 0; i < 8; i++){
        let tr = document.createElement("tr")
        for (let j = 0; j < 8; j++){
            let td = document.createElement("td");
            tr.appendChild(td);
            let img = document.createElement("img");
            img.src = "chipA.png";
            img.className = "chip";
            img.id ="chip"+ i + j;
            img.onclick = clicked;
            td.appendChild(img);
        }
        b.appendChild(tr);
    }
}

function clicked(e) {
    document.getElementById("info").textContent = e.target.id + "clicked";
    if(e.target.src.includes("chipA.png")){
        e.target.src = "chipA1.png"; 
    }
    else{
        e.target.src = "chipA.png";     //再度押したときに元の画像に戻るようにする
    }

}
