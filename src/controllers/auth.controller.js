import bcrypt from "bcrypt";
import Service from "../services/users.service.js";
import jsonWebToken from "jsonwebtoken";

const Controller = () => {
  const login = async (req, res) => {
    const { email, password } = req.body;
    const service = Service(req.dbClient);

    const user = await service.getByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {

      return res.status(401).json({ message: "Invalid authorization" });
    }
    const payload = {id: user.id};
    const token = jsonWebToken.sign(payload, process.env.JWT_SECRET);
    res.status(200).json(token);
  };
  return {
    login,
  };
};

export default Controller;
