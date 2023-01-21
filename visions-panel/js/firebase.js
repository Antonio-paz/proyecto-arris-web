import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import {getFirestore, collection, addDoc, deleteDoc, doc, onSnapshot} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";



const firebaseConfig = {
    apiKey: "AIzaSyCkzbm00FoFX_5ELsVQWBFmZm61OS78gmg",
    authDomain: "visions-demo.firebaseapp.com",
    projectId: "visions-demo",
    storageBucket: "visions-demo.appspot.com",
    messagingSenderId: "704817093511",
    appId: "1:704817093511:web:f2d95f1e4905ef52eb1122",
    measurementId: "G-TEBRY5516K"
};


const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app)


export const loginInFirebase = (email, password) => signInWithEmailAndPassword(auth, email, password)
export const logout = () => signOut(auth)
export const sendEmail = (email) => sendPasswordResetEmail(auth, email)
export const isUserLogged = () => onAuthStateChanged(auth, (user) => {
    if(user.email != null){
        window.location = "noticias.html"
    }else{
        window.location = "login.html"
    }
})
export const ongetNews = (collectionNews, callback) => onSnapshot(collection(db, collectionNews), callback);
export const deleteNew = (collectionNews, id) => deleteDoc(doc(db, collectionNews, id));

export const createNew = (dbNew, titleNew, contentNew, urlImageNew) => {
    addDoc(collection(db, dbNew), {
        title: titleNew,
        description:contentNew,
        url: urlImageNew
    }).then(() => {
        notification.style.display = "block"
        setTimeout(() => {
            sendNotification(toask, progress)
        }, 40);
    }).catch(() => {
        alert('error en la tarea')
    });
}
export const createNewHomeWork = (studentDb, matter, homeWork, points, date, Completed) => {
    addDoc(collection(db, studentDb), {
        matter: matter,
        homeWork: homeWork,
        points: points,
        Completed: Completed,
        date: date
    }).then(() => {
        notification.style.display = "block"
       setTimeout(() => {
           sendNotification(toask, progress)
       }, 40);
    }).catch(() => {
        alert('error en la tarea')
    });
}

const notification = document.getElementById('notification')
const toask = document.querySelector(".notification")
const progress = document.querySelector(".notification__progress")
const closeIcon = document.querySelector(".close")

function sendNotification(toask, progress) {
    toask.classList.add("active")
    progress.classList.add("active")
    setTimeout(() => {
        toask.classList.remove("active")
        progress.classList.remove("active")
        notification.style.display = "none"
    }, 5000);
}

//closeIcon.addEventListener('click', () => {
//    toask.classList.remove("active")
//})