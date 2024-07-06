import Service from "../services/users.service.js";
import jsonWebToken from "jsonwebtoken";
const Controller = () => {
    const getAllUsers = async (req, res)=>{
        const service = Service(req.dbClient);
        const authHeader = req.headers['authorization'].replace("Bearer ", "").trim();
        console.log(authHeader)
        const claims = jsonWebToken.decode(authHeader);
        console.log(claims)
        const  users = await service.getAllUsers(claims["id"]);
        console.info(users);
        res.status(200).json(users);
        }  
        const getAll = async (req, res)=>{
            const service = Service(req.dbClient);
            const groupId = req.query.groupId || 0;
                const  users = await service.getAll(groupId);
                console.info(users);
                res.status(200).json(users);
            }  
            const getById = async (req, res)=>{

                const service = Service(req.dbClient)
                const  user = await service.getById(req.params.id);
                if(user){
                    res.status(200).json(user);
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
                const service = Service(req.dbClient)
                const user=req.body;
                user["createdAt"]=new Date()
                const createdUser=await service.create(user)
                res.status(201).json(createdUser); 
            }

            const fullUpdateById = async (req, res)=>{
                const service = Service(req.dbClient)
                const id=req.params.id
                const user={
                    ...req.body,
                    id
                }
                const updateUser=await service.fullUpdateById(user)
                if(updateUser){
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
                fullUpdateById,
                getAllUsers
            }
        }
    


export default Controller;