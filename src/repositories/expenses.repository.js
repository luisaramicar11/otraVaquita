const CREATE_EXPENSE = `INSERT INTO expenses (owneruserid, groupid, description, total, createdat)
VALUES ($1, $2, $3, $4, NOW()) RETURNING id, owneruserid, groupid, description, total, createdat`;

const CREATE_USER_EXPENSE = `INSERT INTO userexpense (userid, expenseid, value, ispaid, createdat, updatedat)
VALUES ($1, $2, $3, $4, NOW(), NOW())  RETURNING id, userid, expenseid, value, ispaid, createdat, updatedat`

const Repository = (dbClient) => {
  const createExpense = async ({owneruserid, groupid, description, total}) => {

      const result = await dbClient.query(CREATE_EXPENSE, [owneruserid, groupid, description, total]);
      return result.rows[0];

  };

  const createUserExpense = async ({userId, expenseId, value, ispaid} ) => {
      const result = await dbClient.query(CREATE_USER_EXPENSE, [userId, expenseId, value, ispaid]);
      return result.rows[0];
  };

  return {
    createExpense,
    createUserExpense
  };
};

export default Repository;
