import fs from 'fs';
import { v4 as uuidv4 } from 'uuid'; // Cambia la importación de 'uuid' para asignar un alias a v4

function readData(file) {
  try {
    const data = fs.readFileSync(file, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error al leer el archivo:', error);
    return [];
  }
}

function writeData(fileName, data, callback) {
  fs.writeFile(fileName, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('Error al escribir en el archivo:', err);
      if (callback) {
        callback(err);
      }
    } else {
      console.log('Datos escritos correctamente en el archivo:', fileName);
      if (callback) {
        callback(null);
      }
    }
  });
}

function generateUniqueID(existingData) {
  let id;
  do {
    id = uuidv4();
  } while (existingData.some((item) => item.id === id));
  return id;
}

export default { readData, writeData, generateUniqueID };
