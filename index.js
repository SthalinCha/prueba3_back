import express from "express";
import cors from "cors"; // Importa CORS
import { EnrutadorCliente } from "./routes/clienteRouter.js";
import { Cliente } from "./models/cliente.js";
import connectDB from "./models/db.js";

const app = express();
const PORT = 4000;

// Conexión a la base de datos
connectDB();

// Configurar middleware
app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json()); // Parseo de JSON en el body de las solicitudes

// Rutas

app.use("/api/clientes", EnrutadorCliente(Cliente));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
