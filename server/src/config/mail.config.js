import { createTransport } from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const mail = {
    user: process.env.EMAIL_ADMIN,
    pass: process.env.PASS_ADMIN
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
            subject: 'Te damos la Bienvenida!',
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

export async function sendOrderMail(email){
    try{
        await transporter.sendMail({
            from: "Muchas gracias por su compra",
            to: user.username,
            subject: 'Nuevo pedido',
            html: `<head>
            <link rel="stylesheet" href="./style.css">
            </head>
       
            <div id="email___content">
            <h2>Hola ${email}</h2>
            <p>Felicidades!!</p>
            <p>Haz realizado tu primera compra</p>
            </div>`
        })
    }catch(error){
        console.log('Algo salio mal', error)
    }
}

export default { sendEmail, sendOrderMail}
