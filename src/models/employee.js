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

const setExperience = ({
  posisi,
  nama_perusahaan,
  bulan_tahun,
  deskripsi,
  employee_id,
}) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      "INSERT INTO tbl_experience( posisi,nama_perusahaan,bulan_tahun,deskripsi,employee_id) VALUES ($1,$2,$3,$4,$5)",
      [posisi, nama_perusahaan, bulan_tahun, deskripsi, employee_id],
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

const setSkill = ({ name, user_id }) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      "INSERT INTO tbl_skill(user_id, name) VALUES ($2, $1)",
      [name, user_id],
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

const verification = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_employee SET verif=1 WHERE email='${email}'`,
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

const changePassword = (email, password) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE users SET password='${password}' WHERE email='${email}'`,
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

module.exports = {
  register,
  findEmail,
  findById,
  setExperience,
  setSkill,
  verification,
  changePassword,
};
