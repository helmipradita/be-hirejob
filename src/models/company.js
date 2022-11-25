const Pool = require(`../config/db`);

const register = (data) => {
  const {
    id,
    fullname,
    email,
    nama_perusahaan,
    jabatan,
    telepon,
    password,
    role,
    otp,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_company(id, fullname,  email, nama_perusahaan, jabatan, telepon, password, role, verif, otp) 
          VALUES('${id}','${fullname}','${email}','${nama_perusahaan}','${jabatan}','${telepon}','${password}','${role}',0,'${otp}')`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM tbl_company where email='${email}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const selectData = () => Pool.query(`SELECT * FROM tbl_company`);

const insertData = (data) => {
  const { nama } = data;
  return Pool.query(`INSERT INTO tbl_company(nama) VALUES('${nama}')`);
};

const deleteData = (id) =>
  Pool.query(`DELETE FROM tbl_company WHERE id ='${id}'`);

const updateData = (id, data) => {
  const { nama } = data;
  return Pool.query(`UPDATE tbl_company SET nama ='${nama}' WHERE id=${id}`);
};

module.exports = {
  register,
  findEmail,
  selectData,
  insertData,
  deleteData,
  updateData,
};
