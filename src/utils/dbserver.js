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
    await mongoose.connect(process.env.URI, {
    });

    conn.isConnected = true; // Marca como conectado
    console.log("Conectado a la base de datos:", mongoose.connection.name);
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error.message);
  }
}

