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

const getList = ({ limit, offset, sortBy, sortOrder, search }) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT * FROM tbl_employee WHERE fullname ILIKE '%${search}%' ORDER BY ${sortBy} ${sortOrder} LIMIT ${limit} OFFSET ${offset}`,
      (err, result) => {
        if (!err) {
          resolve(result.rows);
        } else {
          reject(new Error(err));
        }
      }
    );
  });
};

// const getList = ({ limit, offset, sortBy, sortOrder, search }) => {
//   return new Promise((resolve, reject) => {
//     Pool.query(
//       `SELECT tbl_employee.fullname,tbl_employee.jobdesk,tbl_employee.domisili, tbl_skill.name AS skill FROM tbl_employee INNER JOIN tbl_skill
//       ON tbl_employee.id = tbl_skill.user_id WHERE tbl_employee.fullname ILIKE '%${search}%' ORDER BY ${sortBy} ${sortOrder} LIMIT ${limit} OFFSET ${offset}`,
//       (err, result) => {
//         if (!err) {
//           resolve(result.rows);
//         } else {
//           reject(new Error(err));
//         }
//       }
//     );
//   });
// };

const countAll = () => {
  return Pool.query('SELECT COUNT(*) AS total FROM tbl_employee');
};

const getEmployeeById = async (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      'SELECT * FROM tbl_employee WHERE id = $1',
      [id],
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

const getDataSkillId = (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      'SELECT * FROM tbl_skill WHERE user_id = $1',
      [id],
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

const getDataPortofolioId = (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      'SELECT * FROM tbl_portofolio WHERE employee_id = $1',
      [id],
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

module.exports = {
  register,
  findEmail,
  setHire,
  update,
  verification,
  changePassword,
  countAll,
  getList,
  getEmployeeById,
  getDataSkillId,
  getDataPortofolioId,
};
