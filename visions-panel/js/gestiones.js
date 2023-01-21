import {ongetNews, deleteNew} from './firebase.js'

const quoteTableContainer = document.getElementById('quote-container')

window.addEventListener('load', (e) => {
    e.preventDefault()
    const db = 'citas'

    ongetNews(db, (querySnapshot) => {
        let html = ""
    
        querySnapshot.forEach((doc) => {
            const quote = doc.data()
            const date = quote.date.toDate().toLocaleString();
            html += `
            <tr>
                        <td>${quote.name}</td>
                        <td>${quote.lastName}</td>
                        <td>${quote.telephone}</td>
                        <td>${date}</td>
                        <td data-id="${quote.call}" class="text-quote">${quote.call}</td>
                        <td>${quote.optionQuote}</td>
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