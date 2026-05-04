let answer;
let count;

// ゲーム開始
function gamestart() {
  answer = Math.floor(Math.random() * 100) + 1;
  count = 0;

  document.getElementById("result").textContent = "";
  document.getElementById("count").textContent = "残り回数：10";
  document.getElementById("image").src = "";
  document.getElementById("num").value = "";
}

// 判定
function judge() {
  let num = Number(document.getElementById("num").value);

  // 入力チェック
  if (isNaN(num) || num < 1 || num > 100) {
    document.getElementById("result").textContent = "1〜100の数字を入力してください";
    return;
  }

  count++;

  let distance = Math.abs(answer - num);
  let message = "";
  let img = "";

  if (distance === 0) {
    message = "正解！";
    img = "win.png";
  } else if (distance >= 50) {
    message = "全然違う";
    img = "miss.png";
  } else if (distance >= 20) {
    message = "かなり違う";
    img = "miss.png";
  } else if (distance >= 10) {
    message = "ちょっと違う";
    img = "miss.png";
  } else if (distance >= 5) {
    message = "惜しい！";
    img = "miss.png";
  } else {
    message = "めっちゃ惜しい！";
    img = "miss.png";
  }

   // 表示更新
  document.getElementById("result").textContent = message;
  document.getElementById("count").textContent = "残り回数：" + (10 - count);
  document.getElementById("image").src = img;

  // ゲームオーバー
  if (count >= 10 && distance !== 0) {
    document.getElementById("result").textContent = "ゲームオーバー！正解は " + answer;
    document.getElementById("image").src = "lose.png";
  }
}