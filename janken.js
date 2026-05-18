let janken =["グー", "チョキ", "パー"];
let message;
let win = 0;
let count = 0;

function init(){
    win = 0;
    count =0;
    message = "";
    document.getElementById("result").innerHTML = message;
    document.getElementById("restartbtn").style.display ="none";
}

//startとOKを戻す
function init2(){
    document.getElementById("startbtn").style.display = "inline";
    document.getElementById("OKbtn").style.display = "inline";
    document.getElementById("restartbtn").style.display = "none";
}

function judge(){

    count++;

    let comp =Math.floor(Math.random() * 3);
    let elements = document.getElementsByName('jk');
    for (let i = 0; i < elements.length; i++)
        if (elements.item(i).checked) user = i;
    message ="【"+ count +"回戦】<br>";
    message += "あなたの手：" + janken[user]+ "<br>";
    message += "コンピュータの手：" + janken[comp]+ "<br>";
    //勝敗判定
    if( user == comp){
        message += "あいこ<br>";

        //連勝数リセット
        win = 0;
    }
    else if((user == 0 && comp==1) ||(user == 1 && comp==2) ||(user == 2 && comp == 0)){
        message += "ユーザーの勝ち！<br>";

        //連勝数を＋
        win++;
    }
    else{
        message += "コンピュータの勝ち!<br>";

        //連勝数リセット
        win = 0;
    }
    message +="現在の連勝数："+ win + "<br>";
    //3連勝達成
    if (win == 3){
        message += "ユーザーの完全勝利！<br>";
        document.getElementById("startbtn").style.display = "none";
        document.getElementById("OKbtn").style.display = "none";
        document.getElementById("restartbtn").style.display ="inline";
    }
    //12回終了
    else if (count >=12){
        message +="<br>12回終了!ユーザーの負け!";
        document.getElementById("startbtn").style.display = "none";
        document.getElementById("OKbtn").style.display = "none";
        document.getElementById("restartbtn").style.display ="inline";
    }
    document.getElementById("result").innerHTML = message;
}