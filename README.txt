Autor: Jimmy Leandro Calderon Rubio
Descripción: Proyecto desarrollado para la clase de Backend en CoderHouse, en el cual se implementa un Servidor basado en Node.Js y Express
que escucha en el puerto 8080 y dispone de dos rutas: "/products" y "/carts".

La implementación consta de:

-'app.js':
Archivo principal, en el cual se crea la instacia de Express, se montan los enrutadores, se define el puerto en el que se escucha,
e iniciamos el servidor.

-'products.js':
* Importamos el módulo express para crear un enrutador.
* Creamos un enrutador de productos con express.Router().
* Importamos el módulo dataAccess para acceder a los datos.
* Definimos rutas para productos dentro del enrutador.
* En la ruta para listar productos, leemos los datos de productos usando dataAccess.readData() y respondemos con los productos en formato JSON.
* En la ruta para obtener un producto por ID, leemos los datos, buscamos el producto por ID y respondemos con el producto si lo encontramos, 
o con un mensaje de error si no.
* Exportamos el enrutador productsRouter para usarlo en app.js

-'carts.js':
* Similar a products.js, aquí creamos un enrutador para las rutas relacionadas con los carritos.
* En la ruta para crear un carrito, leemos los datos de los carritos, generamos un ID único utilizando dataAccess.generateUniqueID(),
creamos un nuevo carrito vacío y lo guardamos en los datos. Luego, respondemos con el carrito creado y el código de estado 201 (creado).
* Exportamos el enrutador cartsRouter para usarlo en app.js

-'dataAccess.js'
* Importamos el módulo fs para trabajar con el sistema de archivos y uuid para generar IDs únicos.
* Definimos tres funciones:
   * readData(file): Lee y analiza un archivo JSON especificado y devuelve sus datos como un objeto JavaScript.
   * writeData(file, data): Escribe datos en un archivo JSON especificado después de convertirlos a formato JSON.
   * generateUniqueID(existingData): Genera un ID único para su uso en productos o carritos. Asegura que el ID sea único entre los datos existentes.
* Exportamos estas funciones para que puedan ser utilizadas en otros módulos.