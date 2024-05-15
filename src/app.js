//libreria que coge los datos del archivo de env para usarlo en la aplicacion manualmente
import "dotenv/config";
import express from 'express';
import cors from 'cors';
import mainRouter from './routers/async.router.js'

//instancia de la aplicacion express
const app=express();

//puerto donde corre
const port=process.env.PORT || 3000;
app.use(cors());
//para manejar los body de json
app.use(express.json())
app.use(mainRouter())

//configurar middleware db

//configurar rutas app



app.listen(port, ()=>{
console.info(`Listen on port: ${port}`)
})