// 変数の初期化
let untyped = '';
let typed = '';
let score ='0';
let typeMiss = '0';
let wordCount = '0';

 // 必要なHTML要素の取得
 const untypedfield = document.getElementById('untyped');
 const typedfield = document.getElementById('typed');
 const wrap = document.getElementById('wrap');
 const start = document.getElementById('start');

// 複数のテキストを格納する配列
const textLists = [
  'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
];

// ランダムなテキストを表示
const createText = () => {
  // 正タイプした文字列をクリアして、
  typed = '';
  // 正タイプの格納先typedfieldにクリアしたTypedを代入。つまり、クリアになる。
  typedfield.textContent = typed;
  // 配列のインデックス数からランダムな数値を生成する
 let random = Math.floor(Math.random()* textLists.length);
  // 配列textListsのn番目をuntypedに代入する
  untyped = textLists[random];
  // 変数untypedを定数untypedfieldのtextContentプロパティに代入する→画面に表示される
  untypedfield.textContent = untyped;
};
// 関数の実行
createText();

// 正タイピングした文字数
const wordCountLabel = document.getElementById('wordCount');

// キー入力の判定。入力があったらログをe.keyに代入
const keyPress = e => {
  // 誤タイプの場合
  if(e.key !== untyped.substring(0, 1)) {
    wrap.classList.add('mistyped');
    // 100ms後に背景色を元に戻す
    setTimeout(() =>{
      wrap.classList.remove('mistyped');
    },100);
    return;
  }
  // 正タイプの場合
  // スコアのインクリメント
    score++;
    wrap.classList.remove('mistyped');
  // 正しくタイピングできた文字数カウントインクリメント
    wordCount++;
    wordCountLabel.textContent = wordCount;
  // 変数untypedの先頭文字を取得し、変数typedの末尾に追加する
  typed += untyped.substring(0, 1);
  // 変数untypedに2文字目以降の文字列を再代入する（変数untypedの先頭文字を削除する）
  untyped = untyped.substring(1);
  // 定数typedfieldのtextContentプロパティに変数typedを代入する
  typedfield.textContent = typed;
  // 定数untypedfieldのtextContentプロパティに変数untypedを代入する
  untypedfield.textContent = untyped;
  // テキストがなくなったら新しいテキストを表示
  if(untyped === '') {
    createText();
  }
};

// タイピングスキルのランクを判定
const rankCheck = score => {
     // スコアの値を返す
  return `${score}文字打てました!`;
};

// ゲームを終了
const gameOver = id => {
  clearInterval(id);

  console.log('ゲーム終了!');
  const result = confirm(rankCheck(score));
};

// カウントダウンタイマー
const timer = () => {

  // タイマー部分のHTML要素（p要素）を取得する
  let time = count.textContent;

  const id = setInterval(() => {
    // カウントダウンする
    time--;
    count.textContent = time;

    // カウントが0になったらタイマーを停止する
    if(time <= 0) {
      gameOver(id);
    }
  }, 1000);
};

// キーボードのイベント処理
// document.addEventListener('keypress',keyPress);

// ゲームスタート時の処理
start.addEventListener('click', () => {

  // カウントダウンタイマーを開始する
  timer();

  // ランダムなテキストを表示する
  createText();

  // 「スタート」ボタンを非表示にする
  start.style.display = 'none';

  // キーボードのイベント処理
  document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = 'スタートボタンで開始';


