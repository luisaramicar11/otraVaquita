import Service from "../services/groups.service.js"
const Controller = () => {
        const getAll = async (req, res, next)=>{
            const service = Service(req.dbClient)
            const  groups = await service.getAll();
            console.info(groups);
            res.status(200).json(groups);
            next();
        }
        return{
            getAll,
        }
    }
    


export default Controller;