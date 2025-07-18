// Cargar las variables de entorno del archivo .env
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Inicializar la aplicación Express
const app = express();
const PORT = process.env.PORT || 3001; // Usar el puerto 3001 como predeterminado

// --- Middlewares ---
// Habilitar CORS para permitir peticiones desde tu frontend
app.use(cors());
// Permitir que Express entienda JSON en el cuerpo de las peticiones
app.use(express.json());

// --- Conexión a la Base de Datos (MongoDB) ---
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch((error) => console.error('Error al conectar a MongoDB:', error));

// --- Definir el Modelo de Datos (Schema) ---
// Esto le dice a MongoDB cómo deben lucir los datos de las respuestas
const responseSchema = new mongoose.Schema({
    answers: { type: Object, required: true }, // Las respuestas del usuario
    feedback: { type: Object, required: true }, // El feedback generado
    createdAt: { type: Date, default: Date.now } // La fecha de creación
});

const Response = mongoose.model('Response', responseSchema);

// --- Definir las Rutas de la API ---
// Ruta principal para verificar que el servidor funciona
app.get('/api', (req, res) => {
    res.send('API del TMMi Assessment Tool funcionando!');
});

// Ruta para guardar una nueva respuesta de encuesta
app.post('/api/responses', async (req, res) => {
    try {
        // El cuerpo de la petición (req.body) debe contener los datos de la encuesta
        const newResponse = new Response(req.body);
        await newResponse.save(); // Guardar en la base de datos
        res.status(201).json({ message: 'Respuesta guardada con éxito', data: newResponse });
    } catch (error) {
        res.status(400).json({ message: 'Error al guardar la respuesta', error: error.message });
    }
});

// --- Iniciar el Servidor ---
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});