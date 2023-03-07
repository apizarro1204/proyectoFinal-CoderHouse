import express from "express";
import routerCarrito from "./src/api/Carrito.router.js";
import routerProductos from "./src/api/Productos.router.js";
import routerSession from "./src/routes/routes.js"
import routerChat from './src/api/Chat.router.js'
import routerOrder from "./src/api/Order.router.js";
import config from './src/routes/connection.js'
import { Server as IOServer } from 'socket.io'
import http from 'http'
import yargs from 'yargs';
import ChatModel from './src/DAOs/Chat.dao.class.js'

const messages = new ChatModel();

const app = express();
const httpServer = http.createServer(app)
const io = new IOServer(httpServer)

app.set('socketio', io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("/public"))
app.use("/aux", routerSession)
app.use("/chat", routerChat)
app.use("/api/productos", routerProductos);
app.use("/api/carritos", routerCarrito);
app.use('/order', routerOrder)

app.set('view engine', 'ejs');
app.set('views', '/views')


io.on('connection', async (socket) => {
    console.log('Usuario se ha conectado')

    socket.emit('messages', await messages.getAll())

    socket.on('sendMessage', async (msg) =>{
        console.log(msg)
        let response = await messages.saveMsg(msg)
        console.log(response)
    })    
})


const PORT = parseInt(process.argv[2]) || 8080

const args = yargs(process.argv.slice(2)).alias({
	m: "modo",
	p: "puerto",
	d: "debug",
}).default({
	modo: "prod",
	puerto: 8080,
	debug: false
}).argv;

const server = httpServer.listen(PORT, () => {
	console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
