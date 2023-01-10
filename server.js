import express from "express";
import routerCarrito from "./src/api/Carrito.router.js";
import routerProductos from "./src/api/Productos.router.js";
import routerSession from "./src/routes/routes.js"
import Container from './DAOs/Product.dao.class.js'
import config from './src/routes/connection.js'
//import { Server as Httpserver } from 'http'
import { Server as IOServer } from 'socket.io'
import http from 'http'



const app = express();
//const httpServer = new Httpserver(app)
const httpServer = http.createServer(app)
const io = new IOServer(httpServer)

let prod = new Container('products', config.mysql);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("/public"))
app.use("/", routerSession)
app.use("/api/productos", routerProductos);
app.use("/api/carritos", routerCarrito);
app.set('socketio', io)

io.on('connection', async (socket) => {
    console.log('Usuario con id: ', socket.io, ' se ha conectado')

    let products = await prod.getAll();

    socket.emit('productList', products);

    socket.on('newProduct', async (data) => {
        await prod.createData(data);

        io.socket.emit('productList', products)
    });
    
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
