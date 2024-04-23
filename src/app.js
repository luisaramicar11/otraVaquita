import express from 'express';
import cors from 'cors';
//instancia de la aplicacion express
const app=express();
//puerto donde corre
const port=process.env.PORT || 3000;
//para manejar los body de json
app.use(express.json())

//configurar middleware db

//configurar rutas app

//configurar rutas app
app.listen(port, ()=>{
console.info(`Listen on port: ${port}`)
})