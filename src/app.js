import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import path from 'path';

import productsRouter from './products.js';
import dataAccess from './dataAccess.js';
import { __dirname } from './utils.js'; 
import indexRouter from './routers/index.router.js'
import { error } from 'console';

const app = express();
const server = http.createServer(app);
const io = new Server(server); // Crea un servidor de Socket.io utilizando la clase 'Server'

// Configura Handlebars como motor de plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, './views'));
app.set('view engine','handlebars')
app.set('layoutsDir', './views/layouts');


app.use(express.json());
app.use('/api/products', productsRouter);
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'../public')))
app.use('/',indexRouter)

app.use((error, req, res, next)=>{
    const message=`Ocurrio un error:${error.message}`;
    console.error(message)
    res.status(500).json({message})
})

// Ruta para la vista "home"
app.get('/', (req, res) => {
    const products = dataAccess.readData('./productos.json');
    res.render('home', { products });
});

// Configura el servidor de WebSocket para la vista "realTimeProducts"
io.on('connection', (socket) => {
    console.log('Cliente conectado a través de WebSocket');
    socket.on('updateProducts', () => {
        // Envía la lista actualizada de productos a través del socket
        const products = dataAccess.readData(path.join(__dirname, './productos.json'));;
        socket.emit('productsUpdated', products);
    });
});

// Ruta para el manejo de productos (creación y eliminación)
app.post('/realtimeproducts', (req, res) => {
    const products = dataAccess.readData('productos.json');
    const action = req.body.action;
    if (action === 'create') {
        // Creación de productos
        const newProduct = {
            id: dataAccess.generateUniqueID(products), //Generación de ID único
            title: req.body.title,
            description: req.body.description,
            code: req.body.code,
            price: parseFloat(req.body.price),
            status: req.body.status === 'true', // Convierte el campo status a booleano
            stock: parseInt(req.body.stock),
            category: req.body.category,
            thumbnails: req.body.thumbnails || [],
        };
        products.push(newProduct); // Agrega el nuevo producto a la lista
        dataAccess.writeData('./productos.json', products); // Guarda la lista actualizada en el archivo JSON
    
    } else if (action === 'delete') {
        // Eliminación de productos
        const productIdToDelete = req.body.productId; // Obtiene el ID del producto a eliminar
        const productIndex = products.findIndex((p) => p.id === productIdToDelete);
        if (productIndex !== -1) {
            products.splice(productIndex, 1); // Elimina el producto de la lista
            dataAccess.writeData('./productos.json', products); // Guarda la lista actualizada en el archivo JSON
        }
    }

    // Emite un evento para actualizar la vista en tiempo real
    io.emit('updateProducts');
    res.redirect('/realtimeproducts');
});

const port = 8080;
server.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

export default app;
