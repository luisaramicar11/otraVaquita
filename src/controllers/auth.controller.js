import bcrypt from "bcrypt";
import Service from "../services/users.service.js";
import jsonWebToken from "jsonwebtoken";

const Controller = () => {


  const login = async (req, res) => {
    const service = Service(req.dbClient);
    const { email, password } = req.body;
    const user = await service.getByEmail(email);
    console.log("******", user, email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log("hola");
      return res.status(401).json({ message: "Invalid authorization" });
    }
    const payload = { id: user.id };
    const token = jsonWebToken.sign(payload, process.env.JWT_SECRET,{
      expiresIn: "1h"
    });
    return res.status(200).json({token});
  };
  
  const create = async(req, res) =>{
      const service = Service(req.dbClient);
      const {name, email, password} = req.body;
      
      const user = await service.getByEmail(email);  

      if(user){
        return res.status(409).json({message: "User already exists"})
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await service.create({name, email, password:  hashedPassword, createdAt: new Date()});
      delete newUser.password;
      return res.status(201).json(newUser);

  }

  return {
    login,
    create,
  };
};

export default Controller;
