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


const selectDataEmployee = ({limit,offset,sort,sortBy,search}) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT tbl_company.id,tbl_company.fullname,tbl_company.email,tbl_company.nama_perusahaan,tbl_company.jabatan,tbl_company.telepon,tbl_company.password,tbl_company.bidang,tbl_company.kota,tbl_company.deskripsi,tbl_company.instagram,tbl_company.linkedin,tbl_company.role,tbl_company.verif,tbl_company.otp FROM tbl_company WHERE (tbl_company.fullname) ILIKE ('%${search}%') ORDER BY tbl_company.${sortBy} ${sort} LIMIT ${limit} OFFSET ${offset}`,
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


const verification = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_company SET verif=1 WHERE email='${email}'`,
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
      `UPDATE tbl_company SET password='${password}' WHERE email='${email}'`,
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
  setHire,
  update,
  verification,
  changePassword,
  selectDataEmployee,
};
