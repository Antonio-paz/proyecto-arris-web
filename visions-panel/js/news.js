import {logout, ongetNews, deleteNew, createNew} from './firebase.js'
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-storage.js";

const logoutBtn = document.getElementById('salir')
//search news
const sectionNews = document.getElementById('adminNews')
const searchBtn = document.getElementById('search-btn')
const newsContainer = document.getElementById('news-container')
//create new and selection image
const nameBox = document.getElementById('nameBox')
const extLab = document.getElementById('extLab')
const progLab = document.getElementById('upProgress')
const selectionBtn = document.getElementById('selectionBtn')
const createBtn = document.getElementById('createBtn')
const dbNew = document.getElementById('db')
const titleNew = document.getElementById('titulo')
const contentNew = document.getElementById('contenido')


var files = []
var reader = new FileReader()

var input = document.createElement('input')
input.type = 'file'

input.onchange = e => {
    files = e.target.files;

    var extention = GetFileExt(files[0]);
    var name = GetFileName(files[0]);

    nameBox.value = name;
    extLab.innerHTML = extention;

    reader.readAsDataURL(files[0]);
}

// functions onchange
function GetFileExt(file){
    var temp = file.name.split('.');
    var ext = temp.slice((temp.length-1),(temp.length))
    return '.' + ext[0]
}

function GetFileName(file){
    var temp = file.name.split('.');
    var fname = temp.slice(0, -1).join('.');

    return fname
}

// upload process 
async function UploadProcess(){
    var ImgToUpload = files[0];
    var ImgName = nameBox.value + extLab.innerHTML;

    const storage = getStorage();
    const storageRef = ref(storage, "Noticias/"+ImgName);
    const uploadTask = uploadBytesResumable(storageRef, ImgToUpload);

    uploadTask.on('state-changed', (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progLab.innerHTML = "Subiendo "+ progress + "%";
    },
    (error) => {
        alert('error al subir la imagen')
    },
    () => {
        getDownloadURL(uploadTask.snapshot.ref).then((dowloadUrl) => {
            createNewFunction(dowloadUrl)
        })
    });//fin de uploadTask
}

export const cleanForm = () => {
    dbNew.value = ""
    titleNew.value = ""
    contentNew.value = ""
    progLab.value = ""
    nameBox.value = ""
}

function createNewFunction(urlImageNew){
    createNew(dbNew.value, titleNew.value, contentNew.value, urlImageNew)
}

selectionBtn.addEventListener('click', (e) => {
    e.preventDefault()
    input.click()
})

createBtn.addEventListener('click', () => {
    UploadProcess()
})


logoutBtn.addEventListener('click', (e) =>{
    e.preventDefault()
    logout()
    .then(() => {
        window.location = "login.html"
    }).catch(() => {
        alert('error al salir de la session')
    });
})

searchBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    sectionNews.style.display = "flex"
    
    const dataNews = document.getElementById('search-new')

    ongetNews(dataNews.value, (querySnapshot) => {
        let html = ""

        querySnapshot.forEach((doc) => {
            const news = doc.data()

            html += `
            <div class="container-news-tarjeta">
                <div class="container-news-tarjeta-titles">
                    <div class="titles">
                        <img src="./images/noticias-icon.svg" alt="icono de tarjetas">
                        <h3>${news.title}</h3>
                    </div>
                    <p>Quiere eliminar esta noticia?</p>
                </div>
                <div class="buttons">
                    <button data-id="${doc.id}" class="delete btn-delete">
                        <img src="./images/trash.svg" alt="boton eliminar">
                    </button> 
                </div>
            </div>
            <br> 
        `
        });

        newsContainer.innerHTML = html;

        const buttonsDelete = newsContainer.querySelectorAll(".btn-delete");

        buttonsDelete.forEach((btn) => {
            btn.addEventListener("click", ({ target: { dataset } }) => {
                deleteNew(dataNews.value, dataset.id)
            });
        });
    })
})
