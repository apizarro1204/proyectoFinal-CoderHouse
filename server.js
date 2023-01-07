import express from "express";
import routerCarrito from "./src/api/Carrito.router.js";
import routerProductos from "./src/api/Productos.router.js";
import routerSession from "./src/routes/routes.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("/public"))
app.use("/", routerSession)
app.use("/api/productos", routerProductos);
app.use("/api/carritos", routerCarrito);
//app.set('socketio', io)

const PORT = 8081;//agregar process.env.port

const server = app.listen(PORT, () => {
	console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));

//PENDIENTE WEBSOCKET. GUIA DESAFIO 6 Y 7