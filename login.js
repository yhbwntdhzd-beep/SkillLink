//=============================
// ログイン
//=============================

function login(){

    const id = document.getElementById("employeeId").value.trim();
    const password = document.getElementById("password").value;

    // Firebaseから取得した社員情報を確認
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // ログインする人を探す
    const user = users.find(function(item){

        return item.id === id && item.password === password;

    });

    // ログイン成功
    if(user){

        // ログイン中のユーザーを保存
        localStorage.setItem(
            "loginUser",
            JSON.stringify(user)
        );

        // 管理者の場合
        if(user.id === "admin"){

            location.href = "admin.html";

        }else{

            // 社員の場合
            location.href = "index.html";

        }

    }else{

        alert("社員番号またはパスワードが違います。");

    }

}
