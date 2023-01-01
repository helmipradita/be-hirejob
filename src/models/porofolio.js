const Pool =require ('../config/db')

const selectPorto = () => {
    return Pool.query(`SELECT * FROM tbl_portofolio`);
}

const selectPortoId = (id) => {
    return Pool.query(`SELECT * FROM tbl_portofolio where id ='${id}'`);
}

const insertPorto = (data) => {
    const {id,user_id,repo_link,repo_type,photo,description} = data
    return Pool.query(`INSERT INTO tbl_portofolio(id,user_id,repo_link,repo_type,photo,description)VALUES('${id}','${user_id}','${repo_link}','${repo_type}','${photo}','${description}')`)
}

const updatePorto = (id,data) => {
    const {user_id,repo_link,repo_type,photo,description} = data
    return Pool.query(`UPDATE tbl_portofolio SET id='${id}',user_id='${user_id}',repo_link='${repo_link}',repo_type='${repo_type}',photo='${photo}',description='${description}' WHERE id='${id}'`)
}

const deletePorto = id => {
    return Pool.query(`DELETE FROM tbl_portofolio where id ='${id}'`);
}
 
module.exports = {selectPorto, deletePorto, updatePorto,insertPorto, selectPortoId}