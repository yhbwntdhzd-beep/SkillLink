// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Firebase設定
const firebaseConfig = {
  apiKey: "AIzaSyDJoeoMPNMbs7gpowDbZSOFsC8fcZt3vVM",
  authDomain: "skilllink-2e8a0.firebaseapp.com",
  projectId: "skilllink-2e8a0",
  storageBucket: "skilllink-2e8a0.firebasestorage.app",
  messagingSenderId: "24144957467",
  appId: "1:24144957467:web:2674c4d3b4450cd330e8be"
};

// Firebase初期化
const app = initializeApp(firebaseConfig);

// Firestore
const db = getFirestore(app);

// 他のファイルで使えるようにする
export { db };
