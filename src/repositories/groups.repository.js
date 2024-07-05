const GET_ALL=`SELECT g.id, g.name, g.color, COUNT(ug.userid) friends 
FROM groups g
LEFT JOIN usergroup ug ON g.id = ug.groupid
WHERE g.owneruserid = $1
GROUP BY ug.groupid,g.id
ORDER BY g.createdat DESC`;
const GET_BY_ID=`SELECT g.id, g.name, g.color, COUNT(ug.userid) friends, g.owneruserid AS ownerGroup
FROM groups g
LEFT JOIN usergroup ug ON g.id = ug.groupid
WHERE g.id = $1
group by ug.groupid,g.id`;
const COUNT_BY_NAME=`SELECT COUNT(*) as count FROM groups WHERE name=$1`;
const DELETE_BY_ID=`DELETE FROM groups WHERE id=$1`;
const CREATE=`INSERT INTO groups (name, color, owneruserid, createdat) VALUES ($1,$2,$3,NOW()) RETURNING name, color, id`;
const FULL_UPDATE_BY_ID=`UPDATE groups SET name=$1, color=$2 WHERE id=$3`;
const COUNT_BY_NAME_NOT_ID=`SELECT COUNT(*) FROM groups WHERE name=$1 and id <> $2`
const Repository=(dbClient)=>{
const getAll= async (ownerUserId)  => {
  const result= await dbClient.query(GET_ALL,[ownerUserId]);
  return result.rows;
};

const getById= async (id)  => {
  console.log(id)
  const result= await dbClient.query(GET_BY_ID,[id]);

  return result.rows[0];
};

const deleteById = async (id)  => {
  const result= await dbClient.query(DELETE_BY_ID,[id]);
  console.info(result)
  return result.rowCount > 0;
};

const create = async ({name, color,  owneruserid})  => {
  console.log(CREATE)
  const result= await dbClient.query(CREATE, [name, color, owneruserid]);
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

const fullUpdateById= async ({id, name, color})  => {
  console.log(FULL_UPDATE_BY_ID)
  const result= await dbClient.query(FULL_UPDATE_BY_ID, [name, color, id]);
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
    deleteById,
    create,
    countByName,
    fullUpdateById,
    countByNameNotId
}
}

export default Repository;