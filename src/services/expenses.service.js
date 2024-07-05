import Repository from "../repositories/expenses.repository.js";
const Service = (dbClient) => {
  const repository = Repository(dbClient);

  const createExpense = async ({ owneruserid, groupid, description, total, userpaid, splitBetween }) => {
    let createdExpense;

      // Crear el gasto principal
      createdExpense = await repository.createExpense({ owneruserid, groupid, description, total });

      // Verificar que se haya creado el gasto principal
      if (!createdExpense) {
        throw new Error('No se pudo crear el gasto principal');
      }

      // Crear los registros en userexpense para cada usuario involucrado
      const userExpensesPromises = splitBetween.map(async (user) => {
        console.log("el user es")
        console.log(user);
        const userExpense = await repository.createUserExpense({
          userId: user,
          expenseId: createdExpense.id,
          value: total/splitBetween.length,
          ispaid: user.userId === userpaid,
        });

        if (!userExpense) {
          throw new Error(`No se pudo crear el gasto para el usuario ${user.userId}`);
        }

        return userExpense;
      });

      // Esperar a que se completen todas las operaciones de usuario
      await Promise.all(userExpensesPromises);

      return createdExpense;
  };

  return {
    createExpense,
  };
};

export default Service;

