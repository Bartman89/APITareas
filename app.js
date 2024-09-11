const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Permite solicitudes desde cualquier origen
app.use(express.json());

const tareas = [
    { id: "1", titulo: "Titulo 1", descripcion: "Descripcion 1", isComplete: true },
    { id: "2", titulo: "Titulo 2", descripcion: "Descripcion 2", isComplete: false }
];

app.get('/tareas', (req, res) => {
  res.json(tareas);
});

app.post('/tareas', (req, res) => {
  const nuevaTarea = req.body; // Obtiene los datos del Tarea del cuerpo de la solicitud
  //nuevaTarea.id = Date.now().toString(); // Genera un id único para el nuevo Tarea
  tareas.push(nuevaTarea); // Añade el nuevo Tarea al array de tareas
  res.status(201).json(nuevaTarea); // Responde con el Tarea creado y el código 201 (Creado)
});

app.put('/tareas/:id', (req, res) => {
  const { id } = req.params;  // Obtiene el ID del Tarea desde la URL
  const tareaActualizada = req.body;  // Obtiene los datos actualizados del cuerpo de la solicitud

  // Encuentra el Tarea en el array por su ID
  const indice = tareas.findIndex(Tarea => Tarea.id === id);

  if (indice !== -1) {
    tareas[indice] = { ...tareas[indice], ...tareaActualizada };  // Actualiza los datos del Tarea
    res.status(200).json(tareas[indice]);  // Responde con el Tarea actualizado
  } else {
    res.status(404).json({ error: `Tarea con id ${id} no encontrada` });  // Responde con un error si el Tarea no existe
  }
});

app.delete('/tareas/:id', (req, res) => {
  const { id } = req.params;  // Obtiene el ID del Tarea desde la URL

  // Encuentra el índice del Tarea en el array por su ID
  const indice = tareas.findIndex(Tarea => Tarea.id === id);

  if (indice !== -1) {
    const TareaEliminado = tareas.splice(indice, 1);  // Elimina el Tarea del array
    res.status(200).json({ mensaje: `Tarea con id ${id} eliminado`, Tarea: TareaEliminado });
  } else {
    res.status(404).json({ error: `Tarea con id ${id} no encontrada` });  // Responde con un error si el Tarea no existe
  }
});

// Iniciar el servidor en el puerto 3004
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
