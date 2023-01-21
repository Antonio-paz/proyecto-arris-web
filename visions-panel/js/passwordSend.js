import {sendEmail} from './firebase.js'

// -------------> variables and constans <------------
const email = document.getElementById('email-password')
const sendMessageBtn = document.getElementById('sedMessage')
const notification = document.getElementById('notification')
const succesNoti = document.getElementById('succesNotification')
const succes = document.querySelector(".succes")
const progresSucces = document.querySelector(".succes__progress")
const closeSucces = document.querySelector(".close-succes")
const toask = document.querySelector(".notification")
const progress = document.querySelector(".notification__progress")
const closeIcon = document.querySelector(".close")
// -------------> functions <------------
function errorNotification(toask, progress) {
   toask.classList.add("active")
   progress.classList.add("active")

   setTimeout(() => {
      toask.classList.remove("active")
      progress.classList.remove("active")
   }, 5000);
}
closeIcon.addEventListener('click', () => {
   toask.classList.remove("active")
})
function succesNotification(succes, progress) {
   succes.classList.add("active")
   progress.classList.add("active")

   setTimeout(() => {
      succes.classList.remove("active")
      progress.classList.remove("active")
   }, 5000);
}
closeSucces.addEventListener('click', () => {
   succes.classList.remove("active")
})
function senEamilPassword(email) {
   sendEmail(email)
      .then(() => {
         succesNotification(succes, progresSucces)
         succesNoti.style.display = "block"
      }).catch(() => {
         errorNotification(toask, progress)
         notification.style.display = "block"
      })
}
// -------------> events <------------
sendMessageBtn.addEventListener('click', (e) => {
      senEamilPassword(email.value)
      email.value = ""
})