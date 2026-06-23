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

function random(v) {
    return Math.floor(Math.random()* v); //０からｖまでの乱数を整数で返す
}

function init() {
    let maze = document.getElementById("maze")
    ctx = maze.getContext("2d");

    createMaze(W, H); //迷路作成
    repaint()

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
    player.paint(ctx, size, size, size, size);

    ctx.restore();
}

//キー＆マウス押下のイベントハンドラ
function mykeydown(e) {
    keyCode = e.keyCode;
}

function mykeyup(e) {
    keyCode = 0;
}

//キャラクターの移動
const player = new Player(1, 1); //主人公
let keyCode = 0; // 押下されたキー
let timer = NaN; //タイマー

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
    };

    this.paint = function (gc, x, y, w, h) {
        let img = document.getElementById("hero" + this.dir);
        //gc.drawImage(img, x, y, w, h); //教科書
        gc.drawImage(img, this.x*size, this.y*size, w, h); // 主人公描画
    };
}