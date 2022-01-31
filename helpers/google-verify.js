const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.G_CLIENT_ID);

async function googleVerify( token = '' ){
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.G_CLIENT_ID
    });
    const { name, picture, email } = ticket.getPayload();

    return {
        name,
        img: picture,
        email
    }
}

module.exports = {
    googleVerify
}