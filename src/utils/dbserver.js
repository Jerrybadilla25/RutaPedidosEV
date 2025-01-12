import mongoose from "mongoose";



const conn = {
  isConnected: false,
};

export async function connectDB() {
  // Si ya está conectado, no es necesario reconectar
  if (conn.isConnected) {
    console.log("Ya está conectado a la base de datos.");
    return;
  }

  try {
    // Conectando a la base de datos
    await mongoose.connect(process.env.MONGO, {
    });

    conn.isConnected = true; // Marca como conectado
    console.log("Conectado a la base de datos:", mongoose.connection.name);
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error.message);
  }
}

/*
import { connect, connection } from "mongoose"
//import mongoose from "mongoose"; 

const URI1 = "mongodb://192.168.0.162:27017/PedidosEG";

const conn = {
  isConnected: false,
};

export async function connectDB() {
  if (conn.isConnected) {
    console.log("Ya está conectado a la base de datos.");
    return;
  }

  try {
    const db = await connect(URI1);
    conn.isConnected = true; // Marcar como conectado
    console.log("Conectado a la base de datos:", db.connection.db.databaseName);
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error.message);
  }
}

connection.on("connected", () => {
  console.log("MongoDB está corriendo");
});

connection.on("error", (err) => {
  console.error("Error de conexión a MongoDB:", err);
});
*/