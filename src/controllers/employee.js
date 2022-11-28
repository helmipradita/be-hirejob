const { response } = require(`../middleware/common`);
const cloudinary = require ('cloudinary')
const {
  register,
  findEmail,
  findById,
  setExperience,
  setSkill,
  updateDataProfile,
  setPortofolio
} = require(`../models/employee`);
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { generateToken, refreshToken } = require(`../helpers/auth`);
const refreshTokens = [];

const EmployeeController = {
  register: async (req, res, next) => {
    let {
      rows: [tbl_employee],
    } = await findEmail(req.body.email);

    if (tbl_employee) {
      return response(res, 404, false, 'email already use', ' register fail');
    }

    let digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }

    let salt = bcrypt.genSaltSync(10);
    let password = bcrypt.hashSync(req.body.password);
    let data = {
      id: uuidv4(),
      fullname: req.body.fullname,
      email: req.body.email,
      telepon: req.body.telepon,
      password,
      role: 'employee',
      otp,
    };
    try {
      const result = await register(data);
      if (result) {
        response(
          res,
          200,
          true,
          { email: data.email },
          'register success please check your email'
        );
      }
    } catch (err) {
      response(res, 404, false, err, ' register fail');
    }
  },
  login: async (req, res, next) => {
    let {
      rows: [tbl_employee],
    } = await findEmail(req.body.email);

    if (!tbl_employee) {
      return response(res, 404, false, null, ' email not found');
    }

    const password = req.body.password;
    const validation = bcrypt.compareSync(password, tbl_employee.password);
    if (!validation) {
      return response(res, 404, false, null, 'wrong password');
    }

    delete tbl_employee.password;
    delete tbl_employee.verif;
    delete tbl_employee.otp;
    let payload = {
      id: tbl_employee.id,
      email: tbl_employee.email,
      role: tbl_employee.role,
    };
    let accessToken = generateToken(payload);
    let refToken = refreshToken(payload);

    tbl_employee.token = accessToken;
    tbl_employee.refreshToken = refToken;
    refreshTokens.push(refreshToken);

    response(res, 200, true, tbl_employee, 'login success');
  },
  profile: async (req, res, next) => {
    const email = req.payload.email;

    try {
      const {
        rows: [tbl_employee],
      } = await findEmail(email);

      if (tbl_employee === undefined) {
        res.json({
          message: 'invalid token',
        });
        return;
      }

      delete tbl_employee.password;
      response(res, 200, true, tbl_employee, 'Get Data success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'Get Data fail');
    }
  },
  profileById: async (req, res, next) => {
    const { id } = req.params;

    try {
      const {
        rows: [tbl_employee],
      } = await findById(id);

      if (tbl_employee === undefined) {
        res.json({
          message: 'invalid token',
        });
        return;
      }

      delete tbl_employee.password;
      response(res, 200, true, tbl_employee, 'Get Data success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'Get Data fail');
    }
  },
  insertExperience: async (req, res, next) => {
    try {
      const { posisi, nama_perusahaan, bulan_tahun, deskripsi } = req.body;
      const employee_id = req.payload.id;

      const dataExperience = {
        posisi,
        nama_perusahaan,
        bulan_tahun,
        deskripsi,
        employee_id,
      };
      await setExperience(dataExperience);
      response(res, 200, true, dataExperience, 'Get Data success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'Insert experience fail');
    }
  },
  insertSkill: async (req, res, next) => {
    try {
      const { name } = req.body;
      const user_id = req.payload.id;

      const dataSkill = {
        name,
        user_id,
      };

      setSkill(dataSkill);
      response(res, 200, true, dataSkill, 'Insert skill success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'Insert skill fail');
    }
  },

  updateProfile: async (req, res, next) => {
    try {
      //const { id,jobdesk, domisili, tempat_kerja, deskripsi } = req.body;
  
      const dataProfile = {
        id : req.body.id,
        jobdesk : req.body.jobdesk,
        domisili : req.body.domisili,
        tempat_kerja : req.body.tempat_kerja,
        deskripsi : req.body.deskripsi
      };
      await updateDataProfile(req.params.id, req.body);
      response(res, 200, true, dataProfile, 'Update Data success sakali');
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'Update data fail');
    }
  },

  insertPortofolio: async (req, res, next) => {
    try {
       req.body.id = req.body.id
       req.body.nama_app =  req.body.nama_app
       req.body.link_repo = req.body.link_repo
       req.body.tipe_repo = req.body.tipe_repo
       const uploadPorto = await cloudinary.uploader.upload(req.file.path, {folder : 'portofolio'})
       req.body.photo = uploadPorto.url
       req.body.employee_id = req.body.employee_id
        
      await setPortofolio(req.body);
      return response(res, 200, true, req.body, 'Insert Portofolio success');
    } catch (error) {
      console.log(error);
      return response(res, 404, false,error, 'Insert Portofolio fail');
    }
  },
};

exports.EmployeeController = EmployeeController;
