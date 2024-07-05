import Service from "../services/groups_users.service.js";
import jsonWebToken from "jsonwebtoken";
const Controller = () => {
    const create = async (req, res) => {
      const service = Service(req.dbClient);
      const { userIds, groupId } = req.body;
      
      try {
        const createdFriends = await service.create(userIds, groupId);
        res.status(201).json(createdFriends);
      } catch (error) {
        res.status(500).json({ error: 'Error al crear los amigos.' });
      }
    };
  
    return {
      create,
    };
  };


export default Controller;