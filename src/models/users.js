const Pool = require("./../config/db");

const create = (data) => {
  const { id, name, email, position, password, role, otp } = data;
  console.log(data);
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO users(id,name,email,phone_number,password,role,verif,otp) VALUES('${id}','${name}','${email}','${position}','${password}','${role}',0,${otp})`,
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
    Pool.query(`SELECT * FROM users where email='${email}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const verification = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE users SET verif=1 WHERE email='${email}'`,
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

const resetPassword = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE users SET verif=1 WHERE email='${email}'`,
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

module.exports = { create, findEmail, verification, resetPassword };
