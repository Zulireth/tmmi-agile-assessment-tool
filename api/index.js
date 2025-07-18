// api/index.js (versión final sin dotenv)

// NO necesitamos dotenv en producción. Vercel inyecta las variables directamente.
// import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// dotenv.config(); // <- Esta línea se elimina.

const app = express();
app.use(cors());
app.use(express.json());

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  try {
    const db = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    cachedDb = db;
    return db;
  } catch (error) {
    console.error('Error fatal al conectar a la base de datos:', error);
    throw error;
  }
}

const responseSchema = new mongoose.Schema({
    answers: { type: Object, required: true },
    feedback: { type: Object, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Response = mongoose.models.Response || mongoose.model('Response', responseSchema);

app.post('/api/responses', async (req, res) => {
    try {
        await connectToDatabase();
        const newResponse = new Response(req.body);
        await newResponse.save();
        res.status(201).json({ message: 'Respuesta guardada con éxito' });
    } catch (error) {
        console.error('Error en el endpoint /api/responses:', error.message);
        res.status(500).json({ message: 'Error al procesar la respuesta en el servidor' });
    }
});

export default app;