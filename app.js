const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Permite solicitudes desde cualquier origen

// Middleware para manejar el cuerpo de las solicitudes en formato JSON
app.use(express.json());

const tareas = [
    {
        id:1,    
        titulo:"Titulo 1",
        descripcion:"Descripcion 1",
        isComplete:true
    },

    {
        id:2,
        titulo:"Titulo 2",
        descripcion:"Descripcion 2",
        isComplete:false
    }
 ]   ;

app.get('/tareas', (req, res) => {
  res.json(tareas);
});

app.post('/tareas', (req, res) => {
  const nuevaTarea = req.body; // Obtiene los datos del equipo del cuerpo de la solicitud
  //nuevoEquipo.id = Date.now().toString(); // Genera un id único para el nuevo equipo
  tareas.push(nuevaTarea); // Añade el nuevo equipo al array de equipos
  res.status(201).json(nuevaTarea); // Responde con el equipo creado y el código 201 (Creado)
});

app.put('/tareas/:id', (req, res) => {
  const { id } = req.params;  // Obtiene el ID del equipo desde la URL
  const tareaActualizada = req.body;  // Obtiene los datos actualizados del cuerpo de la solicitud

  // Encuentra el equipo en el array por su ID
  const indice = equipos.findIndex(equipo => equipo.id === id);

  if (indice !== -1) {
    tareas[indice] = { ...tareas[indice], ...tareaActualizada };  // Actualiza los datos del equipo
    res.status(200).json(tareas[indice]);  // Responde con el equipo actualizado
  } else {
    res.status(404).json({ error: `Tarea con id ${id} no encontrada` });  // Responde con un error si el equipo no existe
  }
});

app.delete('/tareas/:id', (req, res) => {
  const { id } = req.params;  // Obtiene el ID del equipo desde la URL

  // Encuentra el índice del equipo en el array por su ID
  const indice = tareas.findIndex(tarea => tarea.id === id);

  if (indice !== -1) {
    const tareaEliminada = tareas.splice(indice, 1);  // Elimina el equipo del array
    res.status(200).json({ mensaje: `Tarea con id ${id} eliminada`, equipo: equipoEliminado });
  } else {
    res.status(404).json({ error: `Tarea con id ${id} no encontrada` });  // Responde con un error si el equipo no existe
  }
});

// Iniciar el servidor en el puerto 3004
const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
