const { Client } = require("pg");
const fs = require("fs");
require("dotenv").config();

//usar variables de entorno

const connectionString = process.env.DATABASE_URL || "";
// Configuración de la base de datos

if (!connectionString) {
  console.error("No se ha encontrado la variable de entorno DATABASE_URL");
  process.exit(1);
}

const client = new Client({
  connectionString,
});

// Cargar el archivo SQL
const addStockTrigger = fs
  .readFileSync("src/DB/add_stock_trigger.sql")
  .toString();

async function run() {
  try {
    await client.connect();
    console.log("Conectado a la base de datos");

    // Ejecutar el SQL del trigger
    await client.query(addStockTrigger);
    console.log("Trigger addStockTrigger ejecutado con éxito");
  } catch (err) {
    console.error("Error al ejecutar el trigger:", err);
  } finally {
    await client.end();
    console.log("Conexión cerrada");
  }
}

run();
