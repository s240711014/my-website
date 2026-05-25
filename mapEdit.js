let selectChip ="chipA.png"; //画像の初期値
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
    //画像(classで管理して、選択できるようにした。)
    let chips = document.getElementsByClassName("selectChip");
    for(let i = 0; i < chips.length; i++){
        chips[i].onclick = select; 
    }

    }
}
//マップ内画像をクリックの処理
function clicked(e) {
    document.getElementById("info").textContent = e.target.id + "clicked";
    document.getElementById(e.target.id).src =selectChip;
}
//画像の選択時の処理
function select(e){
    selectChip=e.target.src;
}
