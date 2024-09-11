const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Permite solicitudes desde cualquier origen
app.use(express.json());

const tareas = [
    { id: "1", titulo: "Titulo 1", descripcion: "Descripcion 1", isComplete: true },
    { id: "2", titulo: "Titulo 2", descripcion: "Descripcion 2", isComplete: false }
];

// Obtener todas las tareas
app.get('/tareas', (req, res) => {
  res.json(tareas);
});

// Obtener una tarea por ID
app.get('/tareas/:id', (req, res) => {
  const id = parseInt(req.params.id);  // Convierte el parámetro ID a número
  const tarea = tareas.find(t => t.id === id);  // Busca la tarea por ID

  if (tarea) {
    res.json(tarea);  // Responde con la tarea encontrada
  } else {
    res.status(404).json({ error: `Tarea con id ${id} no encontrada` });
  }
});

// Crear una nueva tarea
app.post('/tareas', (req, res) => {
  const nuevaTarea = req.body;
  nuevaTarea.id = Date.now();  // Genera un ID único para la nueva tarea
  tareas.push(nuevaTarea);  // Añade la nueva tarea al array de tareas
  res.status(201).json(nuevaTarea);
});

// Actualizar una tarea por ID
app.put('/tareas/:id', (req, res) => {
  const id = parseInt(req.params.id);  // Convierte el ID a número
  const tareaActualizada = req.body;  // Obtiene los datos actualizados

  const indice = tareas.findIndex(t => t.id === id);

  if (indice !== -1) {
    tareas[indice] = { ...tareas[indice], ...tareaActualizada };  // Actualiza la tarea
    res.status(200).json(tareas[indice]);  // Responde con la tarea actualizada
  } else {
    res.status(404).json({ error: `Tarea con id ${id} no encontrada` });
  }
});

// Eliminar una tarea por ID
app.delete('/tareas/:id', (req, res) => {
  const id = parseInt(req.params.id);  // Convierte el ID a número
  const indice = tareas.findIndex(t => t.id === id);

  if (indice !== -1) {
    const tareaEliminada = tareas.splice(indice, 1);  // Elimina la tarea del array
    res.status(200).json({ mensaje: `Tarea con id ${id} eliminada`, tarea: tareaEliminada });
  } else {
    res.status(404).json({ error: `Tarea con id ${id} no encontrada` });
  }
});

// Iniciar el servidor en el puerto 3004
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
