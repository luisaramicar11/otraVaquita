import Service from "../services/groups.service.js";
import jsonWebToken from "jsonwebtoken";
const Controller = () => {
        const getAll = async (req, res)=>{
            const service = Service(req.dbClient);
            const authHeader = req.headers['authorization'].replace("Bearer ", "").trim();
            console.log(authHeader)
                const claims = jsonWebToken.decode(authHeader);
                console.log(claims)
                const  groups = await service.getAll(claims["id"]);
                console.info(groups);
                res.status(200).json(groups);
            }  
            const getById = async (req, res)=>{
                const authHeader = req.headers['authorization'].replace("Bearer ", "").trim();
                console.log(authHeader)
                    const claims = jsonWebToken.decode(authHeader);
                    console.log(claims)
                const service = Service(req.dbClient)
                const  group = await service.getById(claims["id"], req.params.id);
                if(group){
                    res.status(200).json(group);
                }else{
                    res.status(404).end();
                }
            }

            const deleteById = async (req, res)=>{

                const service = Service(req.dbClient)
                const  deleted = await service.deleteById(req.params.id);
                if(deleted){
                    res.status(200).end();
                }else{
                    res.status(404).end();
                }
            }

            const create = async (req, res)=>{
                console.log("llegue al backen")
                const service = Service(req.dbClient)
                const group=req.body;
                const createdGroup=await service.create(group)
                res.status(201).json(createdGroup); 
            }

            const fullUpdateById = async (req, res)=>{
                console.log("llegue a actualizar", req.body)
                const service = Service(req.dbClient)
                const id=req.params.id
                const group={
                    ...req.body,
                    id
                }
                const updateGroup=await service.fullUpdateById(group)
                if(updateGroup){
                    res.status(200).end();
                }else{
                    res.status(404).end();
                }  
            }

            return{
                getAll,
                getById,
                deleteById,
                create,
                fullUpdateById
            }
        }
    


export default Controller;