const Pool = require(`../config/db`);

const register = (data) => {
  const { id, fullname, email, telepon, password, role, otp } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO tbl_employee(id, fullname,  email, telepon, password, role, verif, otp) 
          VALUES('${id}','${fullname}','${email}','${telepon}','${password}','${role}',0,'${otp}')`,
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
      `SELECT * FROM tbl_employee where email='${email}'`,
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

const findById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM tbl_employee where id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

module.exports = {
  register,
  findEmail,
  findById,
};
