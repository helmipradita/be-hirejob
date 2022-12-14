const { response } = require(`../middleware/common`);
const {
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
} = require(`../models/employee`);
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const {
  generateToken,
  generateRefreshToken,
  decodeToken,
} = require(`../helpers/auth`);
const email = require('../middleware/email');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const Port = process.env.PORT;
const Host = process.env.HOST;

const EmployeeController = {
  register: async (req, res, next) => {
    let {
      rows: [tbl_employee],
    } = await findEmail(req.body.email);

    if (tbl_employee) {
      return response(res, 404, false, 'email already use', ' register fail');
    }

    // create otp
    let digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }

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
        let verifUrl = `http://${Host}:${Port}/tbl_employee/${req.body.email}/${otp}`;
        let text = `Hello ${req.body.fullname} \n Thank you for join us. Please confirm your email by clicking on the following link ${verifUrl}`;
        const subject = `${otp} is your otp`;
        let sendEmail = email(req.body.email, subject, text);
        if (sendEmail == 'email not sent!') {
          return response(res, 404, false, null, 'register fail');
        }
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

    if (tbl_employee.verif == 0) {
      return response(res, 404, false, null, ' email not verified');
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
    let refToken = generateRefreshToken(payload);

    tbl_employee.token = accessToken;
    tbl_employee.refreshToken = refToken;
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
      const employee_id = req.payload.id;

      const dataSkill = {
        name,
        employee_id,
      };

      setSkill(dataSkill);
      response(res, 200, true, dataSkill, 'Insert skill success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'Insert skill fail');
    }
  },
  skill: async (req, res, next) => {
    try {
      const id = req.payload.id;

      const result = await getSkillData(id);
      response(res, 200, true, result.rows, 'Get skill success');
    } catch (error) {
      response(res, 404, false, 'Get skill fail');
    }
  },
  portofolio: async (req, res, next) => {
    try {
      const id = req.payload.id;

      const result = await getPortofolioData(id);
      response(res, 200, true, result.rows, 'Get skill success');
    } catch (error) {
      response(res, 404, false, 'Get skill fail');
    }
  },
  verificationOtp: async (req, res) => {
    const { email, otp } = req.body;
    const {
      rows: [tbl_employee],
    } = await findEmail(email);
    if (!tbl_employee) {
      return response(res, 404, false, null, ' email not found');
    }

    if (tbl_employee.otp == otp) {
      const result = await verification(req.body.email);
      return response(
        res,
        200,
        true,
        'activated',
        ' verification email success'
      );
    }
    return response(
      res,
      404,
      false,
      null,
      ' wrong otp please check your email'
    );
  },

  forgotPassword: async (req, res) => {
    const {
      rows: [tbl_employee],
    } = await findEmail(req.body.email);
    if (!tbl_employee) {
      return response(res, 404, false, null, ' email not found');
    }
    let payload = {
      email: req.body.email,
    };
    const token = generateToken(payload);

    let text = `Hello ${tbl_employee.fullname} \n please click link below to reset password http://localhost:8000/tbl_employee/resetPassword/${token}`;
    const subject = `Reset Password`;
    let sendEmail = email(req.body.email, subject, text);
    if (sendEmail == 'email not sent!') {
      return response(res, 404, false, null, 'email fail');
    }
    return response(res, 200, true, null, 'send email success');
  },

  resetPassword: async (req, res) => {
    const token = req.params.token;
    const decoded = decodeToken(token);
    const {
      rows: [tbl_employee],
    } = await findEmail(decoded.email);
    if (!tbl_employee) {
      return response(res, 404, false, null, ' token not found');
    }
    let password = bcrypt.hashSync(req.body.password);
    const result = await changePassword(decoded.email, password);
    return response(res, 200, true, result.body, ' change password success');
  },

  updateProfile: async (req, res, next) => {
    try {
      const { id, jobdesk, domisili, tempat_kerja, deskripsi } = req.body;

      const dataProfile = {
        id: req.body.id,
        jobdesk: req.body.jobdesk,
        domisili: req.body.domisili,
        tempat_kerja: req.body.tempat_kerja,
        deskripsi: req.body.deskripsi,
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
      const { nama_app, link_repo, tipe_repo } = req.body;
      const employee_id = req.payload.id;

      const dataPortofolio = {
        nama_app,
        link_repo,
        tipe_repo,
        photo: req.file.path,
        employee_id,
      };

      setPortofolio(dataPortofolio);
      response(res, 200, true, dataPortofolio, 'Insert portofolio success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'Insert protofolio fail');
    }
  },
};

exports.EmployeeController = EmployeeController;
