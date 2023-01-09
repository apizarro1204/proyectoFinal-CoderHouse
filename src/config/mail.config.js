import { createTransport } from 'nodemailer'

const mail = {
    user: 'coderhousealexis@gmail.com',
    pass: 'lcjooprkiyswvnbb'
}

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: mail.user,
        pass: mail.pass
    }
});

export async function sendEmail(email, name){
    try {
        await transporter.sendMail({
            from: `Registros CoderHouse <${mail.user}>`,
            to: email,
            subject: 'Mail de prueba node.js',
            text: 'Te doy la bienvenida',
            html: `<head>
            <link rel="stylesheet" href="./style.css">
            </head>
       
            <div id="email___content">
            <h2>Hola ${name}</h2>
            <p>Felicidades!!</p>
            <p>Te has registrado al proyecto final de CoderHouse</p>
            </div>`
           })

    } catch (error) {
        console.log('Algo salio mal ', error);

    }

}


export default { sendEmail }