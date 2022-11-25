const { response } = require(`../middleware/common`);
const { register, findEmail } = require(`../models/company`);
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
      email: tbl_company.email,
      role: tbl_company.role,
    };
    let accessToken = generateToken(payload);
    let refToken = refreshToken(payload);

    tbl_company.token = accessToken;
    tbl_company.refreshToken = refToken;
    refreshTokens.push(refreshToken);

    response(res, 200, true, tbl_company, 'login success');
  },
  profile: async (req, res, next) => {
    let {
      rows: [tbl_company],
    } = await findEmail(req.body.email);

    if (!tbl_company) {
      return response(res, 404, false, null, ' email not found');
    }

    let data = {
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
  update: (req, res, next) => {
    ModelCompany.updateData(req.params.id, req.body)
      .then((result) =>
        res.send({
          status: 200,
          message: `berhasil mengupdate roles`,
          data: req.body,
        })
      )
      .catch((err) => res.send({ message: `error`, err }));
  },
  select: (req, res, next) => {
    ModelCompany.selectData()
      .then((result) => res.send({ result: result.rows }))
      .catch((err) => res.send({ message: `error`, err }));
  },
  insert: (req, res, next) => {
    ModelCompany.insertData(req.body)
      .then((result) =>
        res.send({
          status: 200,
          message: `berhasil menambahkan roles`,
          data: req.body,
        })
      )
      .catch((err) => res.send({ message: `error`, err }));
  },
  delete: (req, res, next) => {
    ModelCompany.deleteData(req.params.id)
      .then((result) =>
        res.send({
          status: 200,
          message: `berhasil menghapus roles`,
          data: req.body,
        })
      )
      .catch((err) => res.send({ message: `error`, err }));
  },
};

exports.CompanyController = CompanyController;
