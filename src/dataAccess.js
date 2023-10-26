//Funciones para leer y escribir los datos en archivos JSON

const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

function readData(file) {
  try {
    const data = fs.readFileSync(file, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeData(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function generateUniqueID(existingData) {
  let id;
  do {
    id = uuidv4();
  } while (existingData.some((item) => item.id === id));
  return id;
}

module.exports = { readData, writeData, generateUniqueID };
