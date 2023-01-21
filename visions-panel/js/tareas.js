import {createNewHomeWork, ongetNews, deleteNew} from './firebase.js'

const estudentDb = document.getElementById('estudianteDb')
const matter = document.getElementById('materia')
const homeWork = document.getElementById('nombreTarea')
const points = document.getElementById('puntos')
const date = document.getElementById('fecha')
const Completed = false
const sectionNews = document.getElementById('adminNews')
const newsContainer = document.getElementById('news-container')
const createHomeWorkBtn = document.getElementById('crearTarea')
const searchStudentBtn = document.getElementById('search-btn')


createHomeWorkBtn.addEventListener('click', (e) => {
    e.preventDefault()
    createNewHomeWork(estudentDb.value, matter.value, homeWork.value, points.value, date.value, Completed)
    estudentDb.value = ""
    matter.value = ""
    homeWork.value = ""
    points.value = ""
    date.value = ""
})

searchStudentBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    sectionNews.style.display = "flex"
    
    const dataNews = document.getElementById('search-new')

    ongetNews(dataNews.value, (querySnapshot) => {
        let html = ""

        querySnapshot.forEach((doc) => {
            const task = doc.data()

            html += `
            <div class="container-news-tarjeta">
                    <div class="container-news-tarjeta-titles">
                        <div class="titles">
                            <img src="./images/noticias-icon.svg" alt="icono de tarjetas">
                            <h3>${task.homeWork}</h3>
                        </div>
                        <p>${task.isCompleted}</p>
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
