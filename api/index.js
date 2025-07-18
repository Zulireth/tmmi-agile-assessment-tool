// api/index.js (versión final y robusta para serverless)

import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// --- Lógica de Conexión a la Base de Datos Optimizada ---
// Creamos una variable "cacheada" para guardar la conexión
// y no tener que reconectarnos en cada petición si la función está "caliente".
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  // Si no hay conexión cacheada, creamos una nueva.
  try {
    const db = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Nueva conexión a MongoDB Atlas establecida');
    cachedDb = db;
    return db;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    // Lanzamos el error para que la petición falle si no se puede conectar
    throw error;
  }
}

// --- Definir el Modelo de Datos (Schema) ---
const responseSchema = new mongoose.Schema({
    answers: { type: Object, required: true },
    feedback: { type: Object, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Response = mongoose.models.Response || mongoose.model('Response', responseSchema);

// --- Rutas de la API ---
app.get('/api', (req, res) => {
    res.send('API del TMMi Assessment Tool funcionando!');
});

app.post('/api/responses', async (req, res) => {
    try {
        // ¡AQUÍ ESTÁ LA MAGIA!
        // Nos aseguramos de que la conexión esté lista ANTES de continuar.
        await connectToDatabase();

        const newResponse = new Response(req.body);
        await newResponse.save();
        res.status(201).json({ message: 'Respuesta guardada con éxito', data: newResponse });
    } catch (error) {
        // Si connectToDatabase o .save() fallan, el error se captura aquí.
        console.error('Error en el endpoint /api/responses:', error);
        res.status(500).json({ message: 'Error al procesar la respuesta en el servidor', error: error.message });
    }
});

export default app;