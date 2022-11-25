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

const setHire = ({
  id,
  tujuan,
  company_nama,
  company_email,
  company_telepon,
  deskripsi,
  company_id,
  employee_id,
}) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      'INSERT INTO tbl_hire(id, tujuan, company_nama, company_email, company_telepon, deskripsi, company_id, employee_id)VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
      [
        id,
        tujuan,
        company_nama,
        company_email,
        company_telepon,
        deskripsi,
        company_id,
        employee_id,
      ],
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      }
    );
  });
};

module.exports = {
  register,
  findEmail,
  setHire,
};
