import {ongetNews, deleteNew} from './firebase.js'

const quoteTableContainer = document.getElementById('quote-container')

window.addEventListener('load', (e) => {
    e.preventDefault()
    const db = 'meets'

    ongetNews(db, (querySnapshot) => {
        let html = ""
    
        querySnapshot.forEach((doc) => {
            const meet = doc.data()
            const date = meet.date.toDate().toLocaleString();
            html += `
            <tr>
                    <td>${meet.fullName}</td>
                    <td>${meet.telephone}</td>
                    <td>${meet.levelAcademic}</td>
                    <td>${meet.matter}</td>
                    <td>${date}</td>
                    <td data-id="${meet.call}" class="text-quote">${meet.call}</td>
                    <td>${meet.optionMeet}</td>
                    <td><button data-id="${doc.id}" class="btn-delete table-delete">Borrar</button></td>
            </tr>
            `
        });
    
        quoteTableContainer.innerHTML = html;
    
        const buttonsDelete = quoteTableContainer.querySelectorAll(".btn-delete");
        const textQuote = quoteTableContainer.querySelectorAll(".text-quote");
    
        buttonsDelete.forEach((btn) => {
            btn.addEventListener("click", ({ target: { dataset } }) => {
                deleteNew(db, dataset.id)
            });
        });

        textQuote.forEach((text) => {
            if (text.dataset.id == "true"){
              text.className += " greend-text"
            }else{
              text.className += " red-text"
            }
        })
    })
})