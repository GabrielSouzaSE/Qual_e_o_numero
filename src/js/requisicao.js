/* 
Usei o método que quando a requisição é solicitada eu salvo o status da 
requisição e também seu valor no localStorage do navegador, posteriormente 
no arquivo "script.js", eu recupero este status e valor com localStorage.getItem
*/
const apiUrl = 'https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300'

fetch(apiUrl)
    .then(resposta => {
        localStorage.setItem('status', resposta.status)
        return resposta.json()
    })
    .then(corpo => {
        localStorage.setItem('valor', corpo.value)
    })
    .catch(error => console.log(error))
