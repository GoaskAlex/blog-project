// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FBASE_KEY,
  authDomain: "mernblog-7380c.firebaseapp.com",
  projectId: "mernblog-7380c",
  storageBucket: "mernblog-7380c.appspot.com",
  messagingSenderId: "329944880900",
  appId: "1:329944880900:web:7f42e482167db693852251",
  measurementId: "G-GGSCVPNEWH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

