import Repository from "../repositories/groups_users.repository.js"
import AppError from "../lib/application.error.js" 
const Service = (dbClient) => {
    const repository = Repository(dbClient);
  
    const create = async (userIds, groupId) => {
      const promises = userIds.map(userid => repository.create(userid, groupId));
      return Promise.all(promises); // Espera a que todas las inserciones se completen
    };
  
    return {
      create
    };
  };

export default Service;