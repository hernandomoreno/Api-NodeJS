const express = require('express');
const app = express();

app.use(express.json());

const estudiantes = [
    {id: 1, nombre: 'Juan', edad: 36, sexo: 'M'},
    {id: 2, nombre: 'Luna', edad: 49, sexo: 'F'},
    {id: 3, nombre: 'Pedro', edad: 25, sexo: true}
]; 

//Ruta o uri o endpoint principal, es la raiz del sitio
// función callback
app.get('/',(req, res) =>{
    res.send("Bienvenido a Node js appi");
});

//Ruta o uri para mostrar el arreglo con los estudiantes
app.get('/api/estudiantes', (req, res) => {
    res.send(estudiantes); 
});

//Ruta para buscar o recuperar o extraer de un estudiante por esto se usa get
app.get('/api/estudiantes/:id', (req, res) => {
    const estud = estudiantes.find(c => c.id === parseInt(req.params.id));
    if(!estud) 
        return res.status(404).send("Estudiante no encontrado");
    else
        res.send(estud);
});

//En esta ruta vamos a agregar un elemento por esto usamos post
app.post('/api/estudiantes',(req, res) => {
    const estud = {
        id: estudiantes.length + 1,
        nombre: req.body.nombre,
        edad: parseInt(req.body.edad),
        sexo: (req.body.sexo)
    };
    estudiantes.push(estud);
    res.send(estud) 
});

//En esta ruta eliminamos un registro del arreglo
app.delete('/api/estudiantes/:id', (req, res) => {
    const estud = estudiantes.find(c => c.id === parseInt(req.params.id));
    if(!estud) 
        return res.status(404).send("Estudiante no encontrado");
    else{
        const index = estudiantes.indexOf(estud); //indexOf encuentra la posición de un elemento de un arreglo
        estudiantes.splice(index,1);
        res.send(estud);
    }
});

const port = process.env.port || 3000;
app.listen(port, () => console.log(`EScuchando en el puerto ${port}`));



