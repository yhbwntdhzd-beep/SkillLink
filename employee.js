const loginUser =
JSON.parse(localStorage.getItem("loginUser"));

if(loginUser == null){

location.href="login.html";

}

if(loginUser.id != "admin"){

alert("管理者のみ利用できます。");

location.href="index.html";

}

// 保存されている社員一覧を取得
let users = JSON.parse(localStorage.getItem("users"));

const tbody = document.getElementById("employeeList");

// データが無ければ終了
if(users == null){

    tbody.innerHTML =
    "<tr><td colspan='3'>社員が登録されていません。</td></tr>";

}else{

    users.forEach(function(user){

        // 社員ごとのポイント取得
        let point = localStorage.getItem("point_" + user.id);

        if(point == null){

            point = 0;

        }

        tbody.innerHTML += `

        <tr>

        <td>${user.id}</td>

        <td>${user.name}</td>

        <td>${point} pt</td>

        </tr>

        `;

    });

}