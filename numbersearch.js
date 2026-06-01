let qno =1;
let x = 0;
let startTime;
let memory = [];

//配列の作成(問題作成)
function q(){

    let max = Number(document.getElementById("maxnum").value); //入力値の取得
    //入力警告
    if(max < 2 || max > 9){           
        alert("2～9を入力してください");
    return;
    }

    let dgt = [];
    for(let i = 1; i <= max; i++){
        dgt.push(i);
    }

    let a = Array(max - 1);
    x = Math.floor(Math.random() * max);
    for(let i = 0, j = 0; i < max; i++){
        if(i != x){
            a[j] = dgt[i];
            j++;
        }
    }
    shuffle(a);
}

function start(){
    qno = 1;
    memory = [];

//初期化
    document.getElementById("question1").innerText = "";
    document.getElementById("ans1").innerText = "";
    document.getElementById("memory").innerHTML = "";

    startTime = Date.now();
    q();
}

document.addEventListener('keydown', myhandler, false);

function myhandler(event){
    for(let i = '1'; i <= '9'; i++){
        if (event.key == i){
            document.getElementById("ans1").innerText = '['+i+']';
            if (i == x+1){
                qno++;

                if (qno > 10){
                    let time = (Date.now() - startTime) / 1000;
                    document.getElementById("time").innerText ="クリアタイム：" + time + "秒";
                    return;
                }

                showmemory();

                q();
            }
        }
    }
}

Array.prototype.shuffle = function(){
    let i =this.length;
    while(i){
        let j = Math.floor(Math.random() * i);
        let t = this[--i];
        this[i] = this[j];
        this[j] = t;
    }
    return this;
}

function shuffle(cards){
    cards.shuffle();
    document.getElementById("question1").innerText = cards.join(" ");
    memory.push(cards.join(" ") + "　答え:" + (x+1));
}

function showmemory(){
    let text = "";

    for(let i = 0; i < memory.length; i++){
       text += (i + 1) + "問目 : " + memory[i] + "<br>";
    }

    document.getElementById("memory").innerHTML = text;
}