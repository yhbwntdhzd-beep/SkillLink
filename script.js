//==============================
// ログイン確認
//==============================

const loginUser = JSON.parse(localStorage.getItem("loginUser"));

// 社員ごとの保存キー
const pointKey = "point_" + loginUser.id;
const historyKey = "history_" + loginUser.id;

if(
!loginUser &&
!location.pathname.includes("login.html")
){

location.href="login.html";

}


// 保存されているポイントを取得
let point = localStorage.getItem(pointKey);

// 初めて利用する場合
if (point === null) {
    point = 0;
} else {
    point = Number(point);
}

// ポイント表示を更新する関数

function updatePoint(){

    const pointElement = document.getElementById("point");

    // pointがあるページだけ表示する
    if(pointElement){

        pointElement.innerHTML = point + " pt";

    }

localStorage.setItem(pointKey, point);

    drawStamp();

}

function drawStamp(){

    let card = document.getElementById("stampCard");

    if(!card){
        return;
    }

    card.innerHTML = "";

    // 現在何枚目か
    let page = Math.floor(point / 10) + 1;

    // 現在のカード内のポイント
    let stampCount = point % 10;

    // 10ptぴったりなら1枚完成
    if(point > 0 && point % 10 == 0){

        page = point / 10;

        stampCount = 10;

    }

const cardNumber = document.getElementById("cardNumber");

if(cardNumber){

    cardNumber.innerHTML =
    "スタンプカード " + page + "枚目";

}

    for(let i=1;i<=10;i++){

        let stamp=document.createElement("div");

        stamp.classList.add("stamp");

        if(i<=stampCount){

            stamp.innerHTML="🔩";

        }else{

            stamp.innerHTML="⚪";

            stamp.classList.add("empty");

        }

        card.appendChild(stamp);

    }

}

// 最初に表示
updatePoint();

// ポイント追加
function addPoint(value){

    point += value;

 localStorage.setItem(pointKey, point);

    updatePoint();

}

// リセット

function resetPoint(){

    const result = confirm("本当にポイントをリセットしますか？");

    if(result){

        // ポイントだけリセット
        point = 0;

 localStorage.setItem(pointKey, point);

        // 表示を更新
        updatePoint();

        alert("ポイントをリセットしました。");

    }

}

function registerMeal(){

const name=document.getElementById("mealName").value;

const memo=document.getElementById("mealMemo").value;

if(name==""){

alert("誰と行ったか入力してください。");

return;

}

addPoint(1);

alert("登録しました！");

document.getElementById("mealName").value="";

document.getElementById("mealMemo").value="";

}
function registerEvent(){

const name=document.getElementById("eventName").value;

if(name==""){

alert("イベント名を入力してください。");

return;

}

addPoint(2);

alert("登録しました！");

document.getElementById("eventName").value="";

document.getElementById("eventMemo").value="";

}
function registerFailure(){

const name=document.getElementById("failureName").value;

if(name==""){

alert("内容を入力してください。");

return;

}

addPoint(3);

alert("登録しました！");

document.getElementById("failureName").value="";

document.getElementById("failureMemo").value="";

}

//============================
// 活動データ
//============================

const activityData = {

communication: [

{
name:"上司・部下とご飯",
point:1,
required:"誰と食べましたか？",
optional:"話した内容"
},

{
name:"社内イベント参加",
point:2,
required:"イベント名",
optional:"内容"
},

{
name:"失敗事例共有",
point:3,
required:"共有した内容",
optional:"学んだこと"
}

],

technology:[

{
name:"スキルツリー更新",
point:1,
required:"更新内容",
optional:"詳細"
},

{
name:"従業員ノートの記入",
point:3,
required:"記入したテーマ",
optional:"詳細"
},

{
name:"資料の標準化",
point:5,
required:"資料名",
optional:"更新内容"
}

],

growth:[

{
name:"社内研修受講",
point:1,
required:"研修名",
optional:"学んだこと"
},

{
name:"社内検定合格",
point:3,
required:"検定名",
optional:"感想"
},

{
name:"資格取得",
point:5,
required:"資格名",
optional:"感想"
}

],

contribution:[

{
name:"アメーバレベル1達成",
point:1,
required:"達成日",
optional:"コメント"
},

{
name:"アメーバレベル2達成",
point:2,
required:"達成日",
optional:"コメント"
},

{
name:"アメーバレベル3達成",
point:3,
required:"達成日",
optional:"コメント"
}

]

};

//============================
// カテゴリー取得
//============================

const params=new URLSearchParams(location.search);

const category=params.get("category");

if(category){

createForm(category);

}

function createForm(category){

const list=activityData[category];

const select=document.getElementById("activity");

const title=document.getElementById("categoryTitle");

if(!select) return;

if(category=="communication"){

title.innerHTML="コミュニケーション";

}

if(category=="technology"){

title.innerHTML="技術継承";

}

if(category=="growth"){

title.innerHTML="自己成長";

}

if(category=="contribution"){

title.innerHTML="組織貢献";

}

list.forEach(function(item,index){

const option=document.createElement("option");

option.value=index;

option.text=item.name;

select.appendChild(option);

});

changeLabel();

}

function changeLabel(){

const params=new URLSearchParams(location.search);

const category=params.get("category");

const list=activityData[category];

const index=document.getElementById("activity").value;

document.getElementById("requiredLabel").innerHTML=list[index].required;

document.getElementById("optionalLabel").innerHTML=list[index].optional;

}

//============================
// 登録処理
//============================


function registerActivity(){

    // カテゴリー取得
    const params = new URLSearchParams(location.search);
    const category = params.get("category");

    // 活動一覧
    const list = activityData[category];

    // 選択された活動
    const index = document.getElementById("activity").value;
    const activity = list[index];

    // 入力内容
    const required = document.getElementById("requiredInput").value.trim();
    const optional = document.getElementById("optionalInput").value.trim();

    // 必須入力チェック
    if(required === ""){

        alert("必須項目を入力してください。");
        return;

    }

    // ポイント加算
    addPoint(activity.point);

    // 保存するデータ
    const record = {

        date: new Date().toLocaleString(),

        category: category,

        activity: activity.name,

        point: activity.point,

        required: required,

        optional: optional

    };

    // 保存済み履歴を取得
    let history = JSON.parse(localStorage.getItem(historyKey));

    // 初回利用時
    if(history === null){

        history = [];

    }

    // 履歴へ追加
    history.push(record);

    // LocalStorageへ保存
localStorage.setItem(historyKey, JSON.stringify(history));

// 保存できたか確認
console.log("保存成功");
console.log(localStorage.getItem("history"));

    // 入力欄を空にする
    document.getElementById("requiredInput").value = "";
    document.getElementById("optionalInput").value = "";

    alert("登録しました！");

}

//============================
// 履歴表示
//============================

function loadHistory(){

    const historyDiv = document.getElementById("historyList");

    if(!historyDiv){
        return;
    }

    historyDiv.innerHTML = "";

 let history = JSON.parse(localStorage.getItem(historyKey));

    if(history == null){

        historyDiv.innerHTML = "<p>まだ履歴はありません。</p>";

        return;
    }

    const historyCopy = [...history];

    historyCopy.reverse().forEach(function(item){

    
        // カテゴリー名を日本語へ変換
let categoryName = "";

switch(item.category){

    case "communication":
        categoryName = "コミュニケーション";
        break;

    case "technology":
        categoryName = "技術継承";
        break;

    case "growth":
        categoryName = "自己成長";
        break;

    case "contribution":
        categoryName = "組織貢献";
        break;

    default:
        categoryName = item.category;

}

        historyDiv.innerHTML += `

        <div class="historyCard">

        <p><strong>${item.date}</strong></p>

        <p>カテゴリー：${categoryName}</p>

        <p>活動：${item.activity}</p>

        <p>ポイント：+${item.point}</p>

        <hr>

        </div>

        `;

    });

}

loadHistory();

const userName=document.getElementById("userName");

if(userName && loginUser){

userName.innerHTML="ようこそ "+loginUser.name+" さん";

}

function logout(){

localStorage.removeItem("loginUser");

location.href="login.html";

}