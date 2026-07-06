"use strict";

const W = 31; //迷路の幅
const H = 31; //迷路の高さ

const maze = []; //迷路
const size = 19; //もろもろのサイズ(迷路、キャラクター)

let ctx;

let wallimg; //壁
wallimg = new Image();
wallimg.src = "chipA1.png";

let floorimg; //床
floorimg = new Image();
floorimg.src = "chipA.png";

let chestimg; //宝箱
chestimg = new Image();
chestimg.src ="chest.png";

function random(v) {
    return Math.floor(Math.random()* v); //０からｖまでの乱数を整数で返す
}

function init() {
    let maze = document.getElementById("maze")
    ctx = maze.getContext("2d");

    createMaze(W, H); //迷路作成
    createStartArea(); //スタート地点作成
    createRoom(5); //部屋を６個作成
    createChest(); //宝箱作成
    createGoalArea(); //ゴール地点作成

    player.x = startx;
    player.y = starty;

    repaint();
    startTime = Date.now();

    go(); // 教科書はHTMLから呼び出している
}

function go() {
    window.onkeydown = mykeydown;
    window.onkeyup = mykeyup;

    let maze = document.getElementById("maze");
    //迷路への参照を取得して各種イベントハンドラ登録
    maze.oncontextmenu = function (e) {
        e.preventDefault(); //コンテキストメニューを非表示に　(タッチ対応)
    };

    timer = setInterval(tick, 200); //教科書は45
}

function createMaze(w, h) {
    for(let y = 0; y < h; y++) {
        maze[y]=[];
        for (let x = 0; x < w; x++) {
            maze[y][x] = x==0 || x== w-1 || y==0 || y==h - 1 ? 1:0
        }
    }
    for (let y = 2; y < h - 2; y+= 2) {
        for(let x = 2; x < w-2; x+= 2) {
            maze[y][x] = 1; //柱を 立てる
            let dir = random(y == 2 ? 4 : 3);
            let px = x; //今のx座標
            let py = y; //今のｙ座標
            switch (dir){
                case 0:
                  py++; //下に倒す
                  break;
                case 1:
                  px--; //左に倒す
                  break;
                case 2:
                  px++; //右に倒す
                  break;
                case 3:
                  py--; //上に倒す
                  break;
            }
            maze[py][px] = 1; //倒れた場所も柱にする
        }
    }
}

let startx;
let starty;

function createStartArea() { //スタート地点
    for(let i = 0; i < 100; i++){
        //外周を避けてランダム
        let x = random(W - 4) + 2;
        let y = random(H - 4) + 2;

        //３×３の中心のマスの選別(通路なら採用)
        if (maze[y][x] ==0) {
            startx = x;
            starty = y;

            //３×３を通路
            for (let dy = -1; dy <= 1; dy++){
                for(let dx = -1; dx <= 1; dx++){
                    maze[y + dy][x + dx] = 0;
                }
            }
            return;
        }
    }
}

const rooms =[]; //部屋の中心座標を保存

function createRoom(num){ //部屋
    for(let i = 0; i < num; i++){

        let x = random(W - 4) + 2;
        let y = random(H - 4) + 2;

        // スタートエリアから2マス以内なら作らない
        if (Math.abs(x - startx) <= 2 && Math.abs(y - starty) <= 2) {
            i--;
            continue;
        }

        //他の部屋とかぶるなら作らない
        if (!canMakeRoom(x, y)){
            i--;
            continue;
        }

        //中心が通路なら作る
        if (maze[y][x] == 0) {
            for(let dy = -1; dy <= 1; dy++){
                for(let dx = -1; dx <= 1; dx++){
                    maze[y + dy][x + dx] = 0;
                }
            }
            rooms.push({x: x, y: y});
        }else{
            i--;
        }
    }
}

function canMakeRoom(x, y){ //部屋が作成できるかを判定

    for(let i = 0; i < rooms.length; i++){

        // 中心同士が4マス以内なら近い
        if(Math.abs(x - rooms[i].x) <= 4 &&Math.abs(y - rooms[i].y) <= 4){
            return false;
        }

    }

    return true;
}

// 宝箱の作成(中身：鍵、ミミック)
const chests = []; //宝箱
let playerKey = 0; //プレイヤーが持っている鍵の数
let playerLife = 3; //ライフ

function createChest(){

    for(let i =0; i < rooms.length; i++){
        chests.push({ 
            x: rooms[i].x, 
            y: rooms[i].y,
            opened: false,
            type: 0
        });
    }
    //ランダムに２個をカギにする
    let keycount = 0;
    while(keycount < 2){
        let n = random(chests.length);
        if(chests[n].type == 0){
            chests[n].type = 1; //鍵
            keycount++;
        }
    }
    //残り３つをミミックにする
    for(let i = 0; i < chests.length; i++){
        if(chests[i].type == 0){
            chests[i].type = 2; //ミミック
        }
    }
}

//壁沿いにゴール地点を作成
let goalx;
let goaly;

function createGoalArea(){ //ゴール地点作成
    let maxDistance = -1;

    // 上下の壁沿い
    for(let x = 2; x < W - 2; x++){

        // 上側
        let distance = Math.abs(x - startx) + Math.abs(1 - starty);

        if(distance > maxDistance){
            maxDistance = distance;
            goalx = x;
            goaly = 1;
        }

        // 下側
        distance = Math.abs(x - startx) + Math.abs((H - 2) - starty);

        if(distance > maxDistance){
            maxDistance = distance;
            goalx = x;
            goaly = H - 2;
        }
    }

    // ゴール前を3×3の広場にする
    for(let dy = -1; dy <= 1; dy++){
        for(let dx = -1; dx <= 1; dx++){
            maze[goaly + dy][goalx + dx] = 0;
        }
    }

    // 外壁に出口を開ける
    if(goaly == 1){ //上壁
        maze[0][goalx] = 0;
    }
    else if(goaly == H - 2){ //下壁
        maze[H - 1][goalx] = 0;
    }
}

//メインルーチン
function tick() {
    player.update();
    repaint();
}

// 描画
function repaint() {
    //背景クリア
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 900, 600);

    //迷路描画
    ctx.translate(0, 0);
    for(let x = 0; x < W; x++) {
        for(let y = 0; y < H; y++) {
            if (maze[y][x] == 0) {
                ctx.drawImage(floorimg, x * size, y * size, size, size); //床の画像描画
            }
            if (maze[y][x] == 1) {
                ctx.drawImage(wallimg, x * size, y * size, size, size); //壁の画像描画
            }
        }
    }

    //宝箱の描画
    for(let i = 0; i < chests.length; i++){
        if(chests[i].opened == false){
        ctx.drawImage(chestimg, chests[i].x * size, chests[i].y * size, size, size);
        }
    }

    player.paint(ctx, size, size, size, size);

    // タイマー表示
    let sec = Math.floor((Date.now() - startTime) / 1000);
    
    // プレイヤーの状態
    ctx.font = "20px sans-serif";
    ctx.fillStyle = "white";
    ctx.fillText("鍵 : " + playerKey + " / 2", 610, 40);
    ctx.fillText("ライフ : " + playerLife, 610, 70);

    ctx.restore();
}

//キー＆マウス押下のイベントハンドラ
function mykeydown(e) {
    // 矢印キーとスペースキーのスクロールを無効化
    if(e.keyCode >= 37 && e.keyCode <= 40 || e.keyCode == 32){
        e.preventDefault();
    }
    keyCode = e.keyCode;
}

function mykeyup(e) {
    keyCode = 0;
}

//キャラクターの移動
const player = new Player(0, 0);//主人公
let keyCode = 0; // 押下されたキー
let timer = NaN; //タイマー
let startTime; //計測開始時刻

//主人公オブジェクトコンストラクタ
function Player(x, y) {
    this.x = x; //x座標
    this.y = y; //y座標
    this.dir = 1; //向き

    this.update = function () {
        let nx = 0; //仮のx方向移動量
        let ny = 0; //仮のy方向移動量
        switch (keyCode) {
            case 37:
                nx = -1;
                this.dir = 2;
                break;
            case 38:
                ny = -1;
                this.dir = 0;
                break;
            case 39:
                nx = +1;
                this.dir = 3;
                break;
            case 40:
                ny = +1;
                this.dir = 1;
                break;

        }
        if (maze[this.y + ny][this.x + nx] == 0 && (nx != 0 || ny != 0)){
            //移動先の座標が通路(0)のとき
            this.x = this.x + nx; //x座標更新
            this.y = this.y + ny; //y座標更新
        }

        if(keyCode == 32){
            for(let i = 0; i < chests.length; i++){
                if(chests[i].opened == false && this.x == chests[i].x && this.y == chests[i].y){
                    chests[i].opened = true;
                    // 宝箱の中身を判定
                    if(chests[i].type == 1){
                        playerKey++;
                        alert("鍵を入手しました！\n現在の鍵：" + playerKey + "本");
                    }else{
                        playerLife--;
                        if(playerLife > 0){
                            alert("ミミックだ！\nライフ残り：" + playerLife);
                        }else{
                            clearInterval(timer);
                            if(confirm("ゲームオーバー\nもう一度遊びますか？")){
                                location.reload();
                            }
                        }
                    }
                    break;
                }
            }
            if(this.x == goalx && this.y == goaly){
                if(playerKey >= 2){
                    let sec = Math.floor((Date.now() - startTime) / 1000);
                    clearInterval(timer);
                    if(confirm("ゲームクリア！\nタイム：" + sec + "秒\n\nもう一度遊びますか？")){
                        location.reload();
                    }
                }else{
                    alert("鍵が足りません！");
                    keyCode = 0;
                }
            }
        }
    };

    this.paint = function (gc, x, y, w, h) {
        let img = document.getElementById("hero" + this.dir);
        //gc.drawImage(img, x, y, w, h); //教科書
        gc.drawImage(img, this.x*size, this.y*size, w, h); // 主人公描画
    };
}