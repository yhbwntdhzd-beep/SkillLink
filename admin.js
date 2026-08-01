//=============================
// 社員追加
//=============================

function addUser(){

    // 入力値取得
    const id = document.getElementById("newId").value.trim();
    const name = document.getElementById("newName").value.trim();
    const password = document.getElementById("newPassword").value.trim();

    // 入力チェック
    if(id === "" || name === "" || password === ""){

        alert("すべて入力してください。");
        return;

    }

    // 保存済み社員取得
    let users = JSON.parse(localStorage.getItem("users"));

    if(users == null){

        users = [];

    }

    // 社員番号重複チェック
    const exists = users.find(function(user){

        return user.id === id;

    });

    if(exists){

        alert("この社員番号は既に登録されています。");
        return;

    }

    // 新しい社員
    const newUser = {

        id: id,
        name: name,
        password: password

    };

    users.push(newUser);

    // 保存
    localStorage.setItem("users", JSON.stringify(users));

    alert("社員を登録しました！");

    // 入力欄クリア
    document.getElementById("newId").value="";
    document.getElementById("newName").value="";
    document.getElementById("newPassword").value="";

}