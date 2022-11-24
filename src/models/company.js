const Pool = require(`../config/db`);

const selectData = () => Pool.query(`SELECT * FROM company`);

const insertData = (data) => {
  const { nama } = data;
  return Pool.query(`INSERT INTO company(nama) VALUES('${nama}')`);
};

const deleteData = (id) => Pool.query(`DELETE FROM company WHERE id ='${id}'`);

const updateData = (id, data) => {
  const { nama } = data;
  return Pool.query(`UPDATE company SET nama ='${nama}' WHERE id=${id}`);
};

module.exports = { selectData, insertData, deleteData, updateData };
