import {ongetNews, deleteNew} from './firebase.js'

const quoteTableContainer = document.getElementById('quote-container')

window.addEventListener('load', (e) => {
    e.preventDefault()
    const db = 'absence'

    ongetNews(db, (querySnapshot) => {
        let html = ""
    
        querySnapshot.forEach((doc) => {
            const absence = doc.data()
            const date = absence.absence.toDate().toLocaleString();
            html += `
            <tr>
                <td>${absence.studentName}</td>
                <td>${absence.carrier}</td>
                <td>${absence.motivo}</td>
                <td>${date}</td>
                <td><button data-id="${doc.id}" class="btn-delete table-delete">Borrar</button></td>
            </tr>
            `
        });
    
        quoteTableContainer.innerHTML = html;
    
        const buttonsDelete = quoteTableContainer.querySelectorAll(".btn-delete");
    
        buttonsDelete.forEach((btn) => {
            btn.addEventListener("click", ({ target: { dataset } }) => {
                deleteNew(db, dataset.id)
            });
        });
    })
})