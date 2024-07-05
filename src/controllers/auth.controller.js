import bcrypt from "bcrypt";
import Service from "../services/users.service.js";
import jsonWebToken from "jsonwebtoken";

const Controller = () => {


  const login = async (req, res) => {
    const service = Service(req.dbClient);
    const { email, password } = req.body;
    const user = await service.getByEmail(email);
    console.log("esta es informacion de usuario", user)
    console.log("******", user, email);
    console.log(user.password)
    console.log(password)
    if(!user){
      return res.status(404).json({ message: "User not found" });
    }
    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log("hola");
      return res.status(401).json({ message: "Invalid password" });
    }
    const payload = { id: user.id};
    console.log(user.id)
    const token = jsonWebToken.sign(payload, process.env.JWT_SECRET,{
    });
    console.log(res.status(200).json({token, id: user.id}));
    return res.status(200).json({token, id: user.id});
  };
  
  const create = async(req, res) =>{
      const service = Service(req.dbClient);
      const {name, email, password} = req.body;
      
      if (!name || name.trim() === "") {
        return res.status(400).json({ message: "El nombre es obligatorio" });
      }
      if (name.length > 100) {
        return res.status(400).json({ message: "El nombre debe tener máximo 100 caracteres" });
      }
      if (!email || email.trim() === "") {
        return res.status(400).json({ message: "El correo electrónico es obligatorio" });
      }

      if (!validateEmailFormat(email)) {
        return res.status(400).json({ message: "El correo electrónico no tiene un formato válido" });
      }

      if (!password || password.length < 8 || !validatePassword(password)) {
        return res.status(400).json({ message: "La contraseña debe tener al menos 8 caracteres y contener al menos una letra y un carácter especial" });
      }

      const user = await service.getByEmail(email);  
      if(user){
        return res.status(409).json({message: "User already exists"})
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("entro y asigno dia", hashedPassword)
      const newUser = await service.create({name, email, password:  hashedPassword, createdAt: new Date()});
      //delete newUser.password;
      return res.status(201).json(newUser);
  }

  const validateEmailFormat = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
  };

  return {
    login,
    create,
  };

 
};


export default Controller;
