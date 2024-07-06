const CREATE_EXPENSE = `INSERT INTO expenses (owneruserid, groupid, description, total, createdat)
VALUES ($1, $2, $3, $4, NOW()) RETURNING id, owneruserid, groupid, description, total, createdat`;

const CREATE_USER_EXPENSE = `INSERT INTO userexpense (userid, expenseid, value, ispaid, createdat, updatedat)
VALUES ($1, $2, $3, $4, NOW(), NOW())  RETURNING id, userid, expenseid, value, ispaid, createdat, updatedat`;

const GET_EXPENSE_DETAILS = `SELECT
	e.id,
    e.description AS description,
    e.total AS amount_paid,
	MAX(CASE WHEN ue.ispaid THEN us.name END) AS paid_by,
    count(*) as members
FROM expenses e
INNER JOIN userexpense ue ON e.id = ue.expenseid  
INNER JOIN users us ON ue.userid = us.id
WHERE e.groupid = $1
GROUP BY e.id, e.description, e.total
order by id desc`;

const Repository = (dbClient) => {
  const createExpense = async ({owneruserid, groupid, description, total}) => {
      const result = await dbClient.query(CREATE_EXPENSE, [owneruserid, groupid, description, total]);
      return result.rows[0];
  };

  const createUserExpense = async ({userId, expenseId, value, ispaid} ) => {
      const result = await dbClient.query(CREATE_USER_EXPENSE, [userId, expenseId, value, ispaid]);
      console.log(ispaid);
      return result.rows[0];
  };

  const getExpenseDetails = async (groupId) => {
    const queries = await dbClient.query(GET_EXPENSE_DETAILS, [groupId]);
    return queries.rows;
  };

  return {
    createExpense,
    createUserExpense,
    getExpenseDetails
  };
};

export default Repository;
