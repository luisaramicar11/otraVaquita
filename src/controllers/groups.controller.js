import Service from "../services/groups.service.js"
const Controller = () => {
        const getAll = async (req, res, next)=>{
            const service = Service(req.dbClient)
            const  groups = await service.getAll();
            console.info(groups);
            res.status(200).json(groups);
            next();
        }

        const getById = async (req, res, next)=>{

            const service = Service(req.dbClient)
            const  group = await service.getById(req.params.id);
            if(group){
                res.status(200).json(group);
            }else{
                res.status(404).end();
            }
            next();
        }

        return{
            getAll,
            getById

        }
    }
    


export default Controller;