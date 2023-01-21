import {loginInFirebase, isUserLogged} from './firebase.js'

// ----------> variables and constants <------------------
const loginBtn = document.getElementById('loginBtn')
const email = document.getElementById('email-input')
const password = document.getElementById('passwordInput')
const notification = document.getElementById('notification')
const toask = document.querySelector(".notification")
const progress = document.querySelector(".notification__progress")
const closeIcon = document.querySelector(".close")

// ----------> functions <------------------
function sendNotification(toask, progress) {
    toask.classList.add("active")
    progress.classList.add("active")
    setTimeout(() => {
        toask.classList.remove("active")
        progress.classList.remove("active")
    }, 5000);
}

function loginFunc(email, password) {
        loginInFirebase(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if(user != null){
                window.location = "noticias.html"
            }else{
                window.location = "login.html"
            }
        }).catch(() => {
            sendNotification(toask, progress)
        })
}

// ----------> events <------------------
closeIcon.addEventListener('click', () => {
    toask.classList.remove("active")
})

loginBtn.addEventListener('click', (e) => {
    notification.style.display = "block"
    loginFunc(email.value, password.value)
    email.value = ""
    password.value = ""
})