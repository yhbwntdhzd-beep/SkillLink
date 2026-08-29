//=============================
// Firebase
//=============================

import { db } from "./firebase.js";

import {
    doc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


//=============================
// 管理者チェック
//=============================

const loginUser =
    JSON.parse(localStorage.getItem("loginUser"));

if(loginUser == null){

    location.href = "login.html";

}

if(loginUser && loginUser.id != "admin"){

    alert("管理者のみ利用できます。");

    location.href = "index.html";

}


//=============================
// 社員追加
//=============================

async function addUser(){

    // 入力値取得
    const id =
        document.getElementById("newId").value.trim();

    const name =
        document.getElementById("newName").value.trim();

    const password =
        document.getElementById("newPassword").value.trim();


    //=============================
    // 入力チェック
    //=============================

    if(id === "" || name === "" || password === ""){

        alert("すべて入力してください。");

        return;

    }


    //=============================
    // Firebaseから社員番号を検索
    //=============================

    try{

        const userRef = doc(db, "users", id);

        const snapshot = await getDoc(userRef);


        // すでに登録されている場合
        if(snapshot.exists()){

            alert("この社員番号は既に登録されています。");

            return;

        }


        //=============================
        // Firebaseへ社員情報を保存
        //=============================

        await setDoc(userRef, {

            id: id,

            name: name,

            password: password,

            point: 0

        });


        //=============================
        // 登録成功
        //=============================

        alert("社員を登録しました！");


        // 入力欄を空にする
        document.getElementById("newId").value = "";

        document.getElementById("newName").value = "";

        document.getElementById("newPassword").value = "";


    }catch(error){

        console.error(error);

        alert(
            "社員登録に失敗しました。\n" +
            "Firebaseの設定を確認してください。"
        );

    }

}


//=============================
// ボタンからaddUserを使えるようにする
//=============================

window.addUser = addUser;
