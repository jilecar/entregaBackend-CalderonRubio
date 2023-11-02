import http from 'http'
import app from './app.js'

const server = http.createServer(app)

const port = 8080;
server.listen(port, () => { console.log(`Servidor escuchando en http://localhost:${port}`); });