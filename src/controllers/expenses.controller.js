import Service from "../services/expenses.service.js";

const ExpenseController = () => {
  
  const createExpense = async (req, res) => {
    const service = Service(req.dbClient);
    try {
      const { owneruserid, groupid, description, total, splitBetween, userpaid } = req.body;
      const newExpense = await service.createExpense({ owneruserid, groupid, description, total, userpaid, splitBetween });
      res.status(201).json(newExpense);
    } catch (error) {
      console.error("Error creando el gasto:", error);
      res.status(500).json({ error: "Error creando el gasto" });
    }
  };

  return {
    createExpense,
  };
};

export default ExpenseController;
