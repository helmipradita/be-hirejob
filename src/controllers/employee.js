const { response } = require(`../middleware/common`);
const { register, findEmail, findById } = require(`../models/employee`);
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
};

exports.EmployeeController = EmployeeController;
