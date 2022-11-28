const { response } = require(`../middleware/common`);
const {
  register,
  findEmail,
  setHire,
  verification,
  changePassword,
  update,
  countAll,
  getList,
  getEmployeeById,
  getDataSkillId,
  getDataPortofolioId,
} = require(`../models/company`);

const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const {
  generateToken,
  generateRefreshToken,
  decodeToken,
} = require(`../helpers/auth`);
const email = require('../middleware/email');
const refreshTokens = [];

const Port = process.env.PORT;
const Host = process.env.HOST;

const CompanyController = {
  register: async (req, res, next) => {
    let {
      rows: [tbl_company],
    } = await findEmail(req.body.email);

    if (tbl_company) {
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
      nama_perusahaan: req.body.nama_perusahaan,
      jabatan: req.body.jabatan,
      telepon: req.body.telepon,
      password,
      role: 'company',
      otp,
    };
    try {
      const result = await register(data);
      if (result) {
        let verifUrl = `http://${Host}:${Port}/tbl_company/${req.body.email}/${otp}`;
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
      rows: [tbl_company],
    } = await findEmail(req.body.email);

    if (!tbl_company) {
      return response(res, 404, false, null, ' email not found');
    }

    if (tbl_company.verif == 0) {
      return response(res, 404, false, null, ' email not verified');
    }

    const password = req.body.password;
    const validation = bcrypt.compareSync(password, tbl_company.password);
    if (!validation) {
      return response(res, 404, false, null, 'wrong password');
    }

    delete tbl_company.password;
    delete tbl_company.verif;
    delete tbl_company.otp;
    let payload = {
      id: tbl_company.id,
      email: tbl_company.email,
      role: tbl_company.role,
    };
    let accessToken = generateToken(payload);
    let refToken = generateRefreshToken(payload);

    tbl_company.token = accessToken;
    tbl_company.refreshToken = refToken;
    response(res, 200, true, tbl_company, 'login success');
  },

  profile: async (req, res, next) => {
    try {
      const email = req.payload.email;
      let {
        rows: [tbl_company],
      } = await findEmail(email);

      if (!tbl_company) {
        return response(res, 404, false, null, ' email not found');
      }

      if (tbl_company === undefined) {
        res.json({
          message: 'invalid token',
        });
        return;
      }

      let data = {
        fullname: tbl_company.fullname,
        email: tbl_company.email,
        nama_perusahaan: tbl_company.nama_perusahaan,
        jabatan: tbl_company.jabatan,
        telepon: tbl_company.telepon,
      };

      delete tbl_company.password;

      response(res, 200, true, data, 'Successfully get profile company');
    } catch (err) {
      response(res, 404, false, err, 'register fail');
    }
  },
  addHire: async (req, res, next) => {
    try {
      const company_id = req.payload.id;

      const {
        tujuan,
        company_nama,
        company_email,
        company_telepon,
        deskripsi,
        employee_id,
      } = req.body;

      const dataHire = {
        id: uuidv4(),
        tujuan,
        company_nama,
        company_email,
        company_telepon,
        deskripsi,
        company_id,
        employee_id,
      };

      setHire(dataHire);
      response(res, 200, true, dataHire, 'Insert Hire success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'Insert Hire fail');
    }
  },
  updateProfile: async (req, res, next) => {
    try {
      const id = req.payload.id;
      const {
        nama_perusahaan,
        bidang,
        kota,
        deskripsi,
        email,
        instagram,
        telepon,
        linkedin,
      } = req.body;

      const data = {
        nama_perusahaan,
        bidang,
        kota,
        deskripsi,
        email,
        instagram,
        telepon,
        linkedin,
      };

      await update(data, id);
      response(res, 200, true, data, 'update profile success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'Update profile fail');
    }
  },
  verificationOtp: async (req, res) => {
    const { email, otp } = req.body;
    const {
      rows: [tbl_company],
    } = await findEmail(email);
    if (!tbl_company) {
      return response(res, 404, false, null, ' email not found');
    }

    if (tbl_company.otp == otp) {
      const result = await verification(req.body.email);
      return response(
        res,
        200,
        true,
        result.body,
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
      rows: [tbl_company],
    } = await findEmail(req.body.email);
    if (!tbl_company) {
      return response(res, 404, false, null, ' email not found');
    }
    let payload = {
      email: req.body.email,
    };
    const token = generateToken(payload);

    let text = `Hello ${tbl_company.name} \n please click link below to reset password http://localhost:8000/tbl_company/resetPassword/${token}`;
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
      rows: [tbl_company],
    } = await findEmail(decoded.email);
    if (!tbl_company) {
      return response(res, 404, false, null, ' email not found');
    }
    let password = bcrypt.hashSync(req.body.password);
    const result = await changePassword(decoded.email, password);
    return response(res, 200, true, result.body, ' change password success');
  },
  getEmp: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const sortBy = req.query.sortBy || 'fullname';
      const sortOrder = req.query.sortOrder || 'ASC';
      const search = req.query.search || '';

      const offset = (page - 1) * limit;

      const result = await getList({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAll();
      const totalData =
        search === '' ? parseInt(count.total) : result.rows.length;
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };
      if (result.length > 0) {
        response(res, 200, true, result, 'Get Data success', pagination);
      } else {
        response(res, 404, false, null, 'get data failed');
      }
    } catch (error) {
      response(res, 404, false, null, ' Get Data not found');
    }
  },
  getEmpById: async (req, res, next) => {
    const { id } = req.params;

    try {
      const {
        rows: [tbl_employee],
      } = await getEmployeeById(id);

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
      response(res, 404, false, null, ' Get Data fail');
    }
  },
  getSkillById: async (req, res, next) => {
    try {
      const id = req.params.id;

      const result = await getDataSkillId(id);
      response(res, 200, true, result.rows, 'Get Data success');
    } catch (error) {
      response(res, 404, false, null, ' Get Data fail');
    }
  },
  getPortofolioById: async (req, res, next) => {
    try {
      const id = req.params.id;

      const result = await getDataPortofolioId(id);
      response(res, 200, true, result.rows, 'Get Data success');
    } catch (error) {
      response(res, 404, false, null, ' Get Data fail');
    }
  },
};

exports.CompanyController = CompanyController;
