const { response } = require(`../middleware/common`);
const { register, findEmail, setHire, update } = require(`../models/company`);
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { generateToken, refreshToken } = require(`../helpers/auth`);
const refreshTokens = [];

const CompanyController = {
  register: async (req, res, next) => {
    let {
      rows: [tbl_company],
    } = await findEmail(req.body.email);

    if (tbl_company) {
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
    let refToken = refreshToken(payload);
    console.log(payload);

    tbl_company.token = accessToken;
    tbl_company.refreshToken = refToken;
    refreshTokens.push(refreshToken);

    response(res, 200, true, tbl_company, 'login success');
  },
  profile: async (req, res, next) => {
    const email = req.payload.email;
    console.log(email);

    try {
      let {
        rows: [tbl_company],
      } = await findEmail(email);

      if (tbl_company === undefined) {
        res.json({
          message: 'invalid token',
        });
        return;
      }

      delete tbl_company.password;
      response(res, 200, true, tbl_company, 'Get Data success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'Get Data fail');
    }
  },
  addHire: async (req, res, next) => {
    try {
      const {
        tujuan,
        company_nama,
        company_email,
        company_telepon,
        deskripsi,
        employee_id,
      } = req.body;
      const company_id = req.payload.id;

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
      // response(res, data, 200, 'update profile success');
      response(res, 200, true, data, 'update profile success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'Update profile fail');
    }
  },
};

exports.CompanyController = CompanyController;
