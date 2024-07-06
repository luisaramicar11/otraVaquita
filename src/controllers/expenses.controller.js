import Service from "../services/expenses.service.js";
import jsonWebToken from "jsonwebtoken";
const ExpenseController = () => {
  
  const createExpense = async (req, res) => {
    const service = Service(req.dbClient);
    try {
      const authHeader = req.headers['authorization'].replace("Bearer ", "").trim();
      console.log(authHeader)
      const claims = jsonWebToken.decode(authHeader);
      console.log(claims)
      let owneruserid = claims["id"]
      let groupid = req.params.id
      const {  description, total, splitBetween, userpaid } = req.body;
      const newExpense = await service.createExpense({ owneruserid, groupid, description, total, userpaid, splitBetween });
      res.status(201).json(newExpense);
    } catch (error) {
      console.error("Error creando el gasto:", error);
      res.status(500).json({ error: "Error creando el gasto" });
    }
  };

  const getExpenseDetails = async (req, res) => {
    const service = Service(req.dbClient);
    const groupId = req.params.id;

    try {
      const expenseDetails = await service.getExpenseDetails(groupId);
      res.json(expenseDetails);
    } catch (error) {
      console.error("Error obteniendo detalles del gasto:", error);
      res.status(500).json({ error: "Error obteniendo detalles del gasto" });
    }
  };

  return {
    createExpense,
    getExpenseDetails
  };
};

export default ExpenseController;
