const url = (window.location.hostname.includes('localhost'))
            ? 'http://localhost:8080/api/auth/'
            : 'https://restserver-cnode.herokuapp.com/'

const form = document.querySelector('form');

form.addEventListener('submit', ev =>{
    ev.preventDefault();
    let formData = {};

    //Como el boton no tiene name, es el que toma y agrega en un objeto el valor de cada input
    for(let el of form.elements){
        if(el.name.length > 0)
            formData[el.name] = el.value
    }
    formData = {
        email:"alonsosalcido13@gmail.com",
        password: "Humandesire.13"
    }
    console.log("Formdata", formData)

    fetch(url + 'loginhh', {
        method: 'POST',
        body: JSON.stringify( formData ),
        headers:{ 'Content-Type': 'application/json' }
    })
    .then( resp => resp.json() )
    .then( ({ msg, token }) =>{
        if( msg !== 'Login ok' ){
            return console.error( msg );
        }
        console.log(token)
        let tok = token
        localStorage.setItem('token', tok);
        localStorage.setItem('cosa', "Cosadrsion");
        location.replace('chat.html');
    })
    .catch( err =>{
        console.log(err)
    })
})

function handleCredentialResponse(response) {
    //Google Token: ID_TOKEN
    console.log("id_token", response.credential);

    const body = { id_token: response.credential }

    fetch(url + 'gsignin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(resp => resp.json())
        .then(({token}) => {
            console.log(token)
            localStorage.setItem('token', token)
            window.location = 'chat.html'
        }).catch(console.warn)
}

const button = document.getElementById('google_signout')

button.onclick = () => {
    console.log(google.accounts.id)
    google.accounts.id.disableAutoSelect()

    google.accounts.id.revoke(localStorage.getItem('email'), done => {
        localStorage.clear();
        location.reload();
    })
}