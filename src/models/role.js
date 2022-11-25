const Pool = require(`../config/db`);

const selectData = () => Pool.query(`SELECT * FROM roles`);

const insertData = (data) => {
  const { nama } = data;
  return Pool.query(`INSERT INTO roles(nama) VALUES('${nama}')`);
};

const deleteData = (id) => Pool.query(`DELETE FROM roles WHERE id ='${id}'`);

const updateData = (id, data) => {
  const { nama } = data;
  return Pool.query(`UPDATE roles SET nama ='${nama}' WHERE id=${id}`);
};

module.exports = { selectData, insertData, deleteData, updateData };
