let numbers = [];
let positions = [];
let running = false;
let startTime;
let gridCols = 6; // 横6列
let gridRows = 4; // 縦4行
let cellWidth = 120; // 座席の幅を広げる
let cellHeight = 60; // 座席の高さを低くする

function setup() {
  createCanvas(800, 500); // キャンバスサイズを調整
  textAlign(CENTER, CENTER);
  textSize(24);

  // 初期の数字を設定
  for (let i = 1; i <= 24; i++) {
    numbers.push(i);
  }

  // 座席の位置を設定
  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      positions.push({
        x: 50 + col * cellWidth,
        y: 150 + row * cellHeight
      });
    }
  }
}

function draw() {
  background(240);

  // 黒板を表示
  fill(0, 100, 0);
  rect(50, 20, width - 100, 100);
  fill(255);
  text("黒板", width / 2, 70);

  // 座席を表示
  for (let i = 0; i < positions.length; i++) {
    let pos = positions[i];
    fill(200);
    rect(pos.x, pos.y, cellWidth - 10, cellHeight - 10, 10);
    fill(0);
    if (running) {
      // ランダムな数字を描画
      text(floor(random(1, 25)), pos.x + (cellWidth - 10) / 2, pos.y + (cellHeight - 10) / 2);
    } else {
      // 確定した数字を描画
      text(numbers[i], pos.x + (cellWidth - 10) / 2, pos.y + (cellHeight - 10) / 2);
    }
  }

  // ランダム化を終了するタイミング
  if (running && millis() - startTime >= 3000) {
    running = false;
    shuffle(numbers, true); // ランダムにシャッフル
    
    //1番を意図的に先生の目の前にする
    //print(numbers[2])
    for(let j=0;j<24;j++){
      if(numbers[j]==1){
        //print("はいった");
        let k=numbers[2];
        numbers[2]=1;
        numbers[j]=k;
      }
    }
  }

  // ボタンを描画
  drawButton();
}

function mousePressed() {
  // ボタン位置確認
  if (mouseX >= width / 2 - 50 && mouseX <= width / 2 + 50 && mouseY >= height - 70 && mouseY <= height - 30) {
    startRandomization();
  }
}

function startRandomization() {
  running = true;
  startTime = millis();
}

function drawButton() {
  fill(100, 200, 100);
  rect(width / 2 - 50, height - 70, 100, 40, 10);
  fill(0);
  text("スタート", width / 2, height - 50);
}
