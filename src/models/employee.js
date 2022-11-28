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

const updateDataProfile = (data) => {
  const { id, jobdesk, domisili, tempat_kerja, deskripsi } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE tbl_employee SET id='${id}',jobdesk='${jobdesk}',domisili='${domisili}',tempat_kerja ='${tempat_kerja}',deskripsi='${deskripsi}' where id='${id}'`,
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
      'INSERT INTO tbl_experience( posisi,nama_perusahaan,bulan_tahun,deskripsi,employee_id) VALUES ($1,$2,$3,$4,$5)',
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

const setSkill = ({ name, employee_id }) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      'INSERT INTO tbl_skill(employee_id, name) VALUES ($2, $1)',
      [name, employee_id],
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

const getSkillData = (id) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      'SELECT * FROM tbl_skill WHERE employee_id = $1',
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

const getPortofolioData = (id) => {
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
      `UPDATE tbl_employee SET password='${password}' WHERE email='${email}'`,
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

const setPortofolio = (data) => {
  const { nama_app, link_repo, tipe_repo, photo, employee_id } = data;
  return new Promise((resolve, reject) => {
    Pool.query(
      `INSERT INTO tbl_portofolio(nama_app,link_repo,tipe_repo,photo,employee_id) VALUES ('${nama_app}','${link_repo}','${tipe_repo}','${photo}','${employee_id}')`,
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
  findById,
  setExperience,
  setSkill,
  getSkillData,
  getPortofolioData,
  verification,
  changePassword,
  updateDataProfile,
  setPortofolio,
};
