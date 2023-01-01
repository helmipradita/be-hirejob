const Pool =require ('../config/db')

const selectPorto = () => {
    return Pool.query(`SELECT * FROM portofolio`);
}

const selectPortoId = (id) => {
    return Pool.query(`SELECT * FROM portofolio where id ='${id}'`);
}

const insertPorto = (id,user_id,repo_link,repo_type,photo,description) => {
    return Pool.query(`INSERT INTO portofolio(id,user_id,repo_link,repo_type,photo,create_at,description) VALUES ('${id}','${user_id}','${repo_link}','${repo_type}','${photo}',NOW(),'${description}'`);

}

const updatePorto = (id,user_id,repo_link,repo_type,photo,create_at,description) => {
    return Pool.query(`UPDATE portofolio SET id='${id}',user_id='${user_id}',repo_link='${repo_link}',repo_type='${repo_type}',photo='${photo}',create_at='${create_at}',description=${description} WHERE id='${id}'`);
}

const deletePorto = id => {
    return Pool.query(`DELETE FROM portofolio where id ='${id}'`);
}
 
module.exports = {selectPorto, deletePorto, updatePorto,insertPorto, selectPortoId}