//Archivo principal que inicia el servidor Express
const express = require('express');
const app = express();
const productsRouter = require('./products');
const cartsRouter = require('./carts');

app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const port = 8080;
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});