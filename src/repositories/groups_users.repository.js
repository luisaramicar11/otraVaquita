const CREATE=`INSERT INTO usergroup (userid, groupid, createdat) VALUES ($1,$2,NOW()) RETURNING userid, groupid, createdat`;

const Repository=(dbClient)=>{

const create = async (userid, groupid)  => {
  console.log(CREATE)
  const result= await dbClient.query(CREATE, [userid, groupid]);
  console.info(result)
  return result.rows[0];
};

return{
    create
}
}

export default Repository;