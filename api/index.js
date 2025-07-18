// api/index.js (versión corregida con sintaxis 'import')

import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Cargar las variables de entorno
dotenv.config();

// Inicializar la aplicación Express
const app = express();
const PORT = process.env.PORT || 3001;

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- Conexión a la Base de Datos ---
// Verificamos si ya hay una conexión para evitar múltiples conexiones en el entorno serverless
if (mongoose.connection.readyState !== 1) {
  mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch((error) => console.error('Error al conectar a MongoDB:', error));
}

// --- Definir el Modelo de Datos (Schema) ---
// Es importante definir el schema fuera de la función de la petición
// para que no se recompile cada vez.
const responseSchema = new mongoose.Schema({
    answers: { type: Object, required: true },
    feedback: { type: Object, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Usamos mongoose.models para evitar que el modelo se recompile en cada invocación de la función
const Response = mongoose.models.Response || mongoose.model('Response', responseSchema);

// --- Definir las Rutas de la API ---
app.get('/api', (req, res) => {
    res.send('API del TMMi Assessment Tool funcionando!');
});

app.post('/api/responses', async (req, res) => {
    try {
        const newResponse = new Response(req.body);
        await newResponse.save();
        res.status(201).json({ message: 'Respuesta guardada con éxito', data: newResponse });
    } catch (error) {
        res.status(400).json({ message: 'Error al guardar la respuesta', error: error.message });
    }
});

// --- Exportar la app para Vercel ---
// Vercel usará esta exportación para manejar las peticiones
export default app;