const GET_ALL=`SELECT id, name, email, password FROM users`;
const GET_BY_ID=`${GET_ALL} WHERE id= $1`;
const GET_BY_EMAIL=`${GET_ALL} WHERE email= $1`;
const COUNT_BY_NAME=`SELECT COUNT(*) as count FROM users WHERE name=$1`;
const DELETE_BY_ID=`DELETE FROM users WHERE id=$1`;
const CREATE=`INSERT INTO users (name, email, password, createdAt) VALUES ($1,$2,$3,$4) RETURNING id, name, email,  password, createdAt`;
const FULL_UPDATE_BY_ID=`UPDATE users SET name=$1, email=$2, password=$3 WHERE id=$4`;
const COUNT_BY_NAME_NOT_ID=`SELECT COUNT(*) FROM users WHERE name=$1 and id <> $2`;

const Repository=(dbClient)=>{
const getAll= async ()  => {
  const result= await dbClient.query(GET_ALL);
  return result.rows;
};

const getById= async (id)  => {
  const result= await dbClient.query(GET_BY_ID,[id]);
  return result.rows[0];
};

const getByEmail= async (email)  => {
  const result= await dbClient.query(GET_BY_EMAIL,[email]);
  console.log(result);
  return result.rows[0];
};

const deleteById = async (id)  => {
  const result= await dbClient.query(DELETE_BY_ID,[id]);
  console.info(result)
  return result.rowCount > 0;
};

const create = async ({name, email, password, createdAt})  => {
  const result= await dbClient.query(CREATE, [name, email, password, createdAt]);
  console.info(result)
  return result.rows[0];
};

const countByName= async (name)  => {
  const result= await dbClient.query(COUNT_BY_NAME,[name]);
  const count=parseInt(result.rows[0].count)
  if(isNaN(count)){
    throw "Invalid countByName result is NaN"
  }
  return count;
};

const fullUpdateById= async ({name, email, password, id})  => {
  const result= await dbClient.query(FULL_UPDATE_BY_ID, [name, email, password, id]);
  return result.rowCount > 0;
};

const countByNameNotId= async (name, id)  => {
  const result= await dbClient.query(COUNT_BY_NAME_NOT_ID,[name, id]);
  const count=parseInt(result.rows[0].count)
  if(isNaN(count)){
    throw "Invalid countByName result is NaN"
  }
  return count;
};

return{
    getAll,
    getById,
    getByEmail,
    deleteById,
    create,
    countByName,
    fullUpdateById,
    countByNameNotId
}
}

export default Repository;