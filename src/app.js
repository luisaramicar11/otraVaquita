//libreria que coge los datos del archivo de env para usarlo en la aplicacion manualmente
import "dotenv/config";
import express from 'express';
import cors from 'cors';
import mainRouter from './routers/async.router.js'
import passport from "passport";

//instancia de la aplicacion express
const app=express();
app.use(passport.initialize());

//puerto donde corre
const port=process.env.PORT || 3000;
app.use(cors());
//para manejar los body de json
app.use(express.json())
app.use(mainRouter())

app.listen(port, ()=>{
console.info(`Listen on port: ${port}`)
})