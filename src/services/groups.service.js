import Repository from "../repositories/groups.repository.js"
const Service = (dbClient) =>{

    const repository=Repository(dbClient);

    const getAll = async () => {
       return await repository.getAll();
    }
}

export default Service;