//=============================
// 初回だけ管理者を作成
//=============================

let users = JSON.parse(localStorage.getItem("users"));

if(users == null){

    users = [

        {
            id:"admin",
            password:"admin",
            name:"管理者"
        }

    ];

    localStorage.setItem("users",JSON.stringify(users));

}

//=============================
// ログイン
//=============================

function login(){

    const id = document.getElementById("employeeId").value;
    const password = document.getElementById("password").value;

    users = JSON.parse(localStorage.getItem("users"));

    const user = users.find(function(item){

        return item.id===id && item.password===password;

    });

    if(user){

        localStorage.setItem("loginUser",JSON.stringify(user));

        location.href="index.html";

    }else{

        alert("社員番号またはパスワードが違います。");

    }

}