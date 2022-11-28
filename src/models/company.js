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

const update = (
  {
    nama_perusahaan,
    bidang,
    kota,
    deskripsi,
    email,
    instagram,
    telepon,
    linkedin,
  },
  id
) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      // 'UPDATE tbl_company SET full_name = COALESCE($1, full_name), corps_name = COALESCE($2, corps_name), position = COALESCE($3, position), hp = COALESCE($4, hp), corps_description = COALESCE($5, corps_description), instagram = COALESCE($6, instagram), linkedin = COALESCE($7, linkedin), address = COALESCE($8, address) WHERE id = $9',
      'UPDATE tbl_company SET nama_perusahaan = $1, bidang = $2, kota = $3, deskripsi = $4,  email = $5, instagram = $6, telepon = $7, linkedin = $8 WHERE id = $9;',
      [
        nama_perusahaan,
        bidang,
        kota,
        deskripsi,
        email,
        instagram,
        telepon,
        linkedin,
        id,
      ],
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );
  });
};

module.exports = {
  register,
  findEmail,
  setHire,
  update,
};
