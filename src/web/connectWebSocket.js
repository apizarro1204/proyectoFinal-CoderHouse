import Container from '../DAOs/Product.dao.class.js'
import config from '../routes/connection.js'

let prod = new Container('products', config.mysql);

io.on('connection', async (socket) => {
    console.log('Usuario con id: ', socket.io, ' se ha conectado')

    let products = await prod.getAll();

    socket.emit('productList', products);

    socket.on('newProduct', async (data) => {
        await prod.createData(data);

        io.socket.emit('productList', products)
    });
    
})

