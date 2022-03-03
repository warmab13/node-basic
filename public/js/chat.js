const url = (window.location.hostname.includes('localhost'))
            ? 'http://localhost:8080/api/auth/'
            : 'https://restserver-cnode.herokuapp.com/'

const txtUid     = document.querySelector('#txtUid');
const txtMessage = document.querySelector('#txtMessage');
const ulUsers    = document.querySelector('#ulUsers');
const ulMessages = document.querySelector('#ulMessages');
const btnLogout  = document.querySelector('#btnLogout');

let user = null;
let socket = null;

const  validateJWT = async()=>{
    const token = localStorage.getItem('token') || '';

    if( token.length <= 10){
        window.location = 'index.html';
        throw new Error('Token is not present')
    }

    const resp = fetch( url, {
        headers: {
            'x-token': token
        }
    })

    const { user: userDb, token: tokenDb } = await (await resp).json(); 
    console.log(userDb, tokenDb);
    localStorage.setItem('token', tokenDb);
    user = userDb;
    document.title = user.name;

    await connectSocket();
}

const connectSocket = async()=>{
    socket = io({
        'extraHeaders':{
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on('connect', ()=>{
        console.log('Sockets online');
    });

    socket.on('disconnect', ()=>{
        console.log('Sockets offline');
    });

    socket.on('recieve-messages', drawMessages); //Cuando se pasa la funcion sola es que va a recibir todo lo que ya trae retornando el evento del socket. 

    socket.on('active-users', drawUsers);

    socket.on('private-message', (payload)=>{
       console.log("Privado:", payload)
    })
}

const drawUsers = ( users = [] ) =>{
    let usersHtml = '';
    users.forEach( ({ name, uid }) => {
        usersHtml +=`
            <li>
                <p>
                    <h5 class="text-success"> ${name} </h5>
                    <span class="fs-6 text-muted">${ uid }</span>
                </p>
            </li>
        `;
    });

    ulUsers.innerHTML = usersHtml;
}

const drawMessages = ( messages = [] ) =>{
    let messagesHtml = '';
    messages.forEach( ({ name, message }) => {
        messagesHtml +=`
            <li>
                <p>
                    <span class="text-primary"> ${ name } </span>
                    <span >${ message }</span>
                </p>
            </li>
        `;
    });

    ulMessages.innerHTML = messagesHtml;
}

txtMessage.addEventListener('keyup', ({ keyCode })=>{
    const message  = txtMessage.value;
    const uid = txtUid.value;
    if(keyCode!== 13){ return; }
    if(message.length === 0){ return; }

    socket.emit('send-message', {uid, message});

    txtMessage.value = '';
})

const main = async()=>{

    await validateJWT();

}


main();

//const socket = io();