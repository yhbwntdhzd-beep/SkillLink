//================================
// Firebase
//================================

import { db } from "./firebase.js";

import {
    doc,
    setDoc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


//================================
// 社員追加
//================================

async function addUser(){

    // 入力値を取得
    const id = document.getElementById("newId").value.trim();

    const name = document.getElementById("newName").value.trim();

    const password = document.getElementById("newPassword").value.trim();


    // 入力チェック
    if(id === "" || name === "" || password === ""){

        alert("社員番号・名前・パスワードをすべて入力してください。");

        return;

    }


    try{

        // Firestoreのusersから社員番号を確認
        const userRef = doc(db, "users", id);

        const snapshot = await getDoc(userRef);


        // すでに存在する場合
        if(snapshot.exists()){

            alert("この社員番号はすでに登録されています。");

            return;

        }


        // Firebaseへ社員情報を保存
        await setDoc(userRef, {

            id: id,

            name: name,

            password: password,

            point: 0

        });


        // 登録成功
        alert("社員を登録しました！");


        // 入力欄を空にする
        document.getElementById("newId").value = "";

        document.getElementById("newName").value = "";

        document.getElementById("newPassword").value = "";


    }catch(error){

        console.error("社員登録エラー:", error);

        alert("社員登録に失敗しました。\nConsoleを確認してください。");

    }

}


//================================
// ボタンに登録処理を設定
//================================

document.getElementById("addUserButton").addEventListener(
    "click",
    addUser
);
