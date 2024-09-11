const express = require('express');
const app = express();

const equipos = [
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
  res.json(equipos);
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});