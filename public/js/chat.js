const url = (window.location.hostname.includes('localhost'))
            ? 'http://localhost:8080/api/auth/'
            : 'https://restserver-cnode.herokuapp.com/'

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
    const socket = io({
        'extraHeaders':{
            'x-token': localStorage.getItem('token')
        }
    });
}

const main = async()=>{

    await validateJWT();

}


main();

//const socket = io();