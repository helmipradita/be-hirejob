const { response } = require("../middleware/common");
const { create, findEmail, verification } = require("../models/users");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { generateToken, generateRefreshToken } = require("../helpers/auth");
const { validate } = require("../helpers/users");
const email = require("../middleware/email");
const { contentSecurityPolicy } = require("helmet");

const Port = process.env.PORT;
const Host = process.env.HOST;

const UsersController = {
  registerUsers: async (req, res, next) => {
    let {
      rows: [users],
    } = await findEmail(req.body.email);
    let role = req.params.role;

    if (users) {
      return response(res, 404, false, "email already use", " register fail");
    }

    // create otp
    let digits = "0123456789";
    let otp = "";
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }

    let password = bcrypt.hashSync(req.body.password);
    let data = {
      id: uuidv4(),
      name: req.body.name,
      email: req.body.email,
      password,
      phone_number: req.body.phone_number,
      role,
      otp,
    };
    try {
      const result = await create(data);
      if (result) {
        let verifUrl = `http://${Host}:${Port}/users/${req.body.email}/${otp}`;
        let sendEmail = email(req.body.email, otp, req.body.name);
        if (sendEmail == "email not sent!") {
          return response(res, 404, false, null, "register fail");
        }
        response(
          res,
          200,
          true,
          { email: req.body.email },
          "register success please check your email"
        );
      }
    } catch (err) {
      console.log(err);
      response(res, 404, false, err, " register fail");
    }
  },

  refresh: async (req, res) => {
    const {
      rows: [users],
    } = await findEmail(req.body.email_user);
    if (!users) {
      return resp(res, 404, false, "Email not found");
    }
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return resp(res, 404, false, "Wrong refresh token ");
    }
    const payload = {
      email_user: users.email_user,
      role_user: users.role_user,
    };
    users.newToken = generateToken(payload);
    resp(res, 200, true, users, "Success get new token ");
  },

  login: async (req, res, next) => {
    let {
      rows: [users],
    } = await findEmail(req.body.email);
    if (!users) {
      return response(res, 404, false, null, " email not found");
    }
    if (users.verif == 0) {
      return response(res, 404, false, null, " email not verified");
    }
    const password = req.body.password;
    const validation = bcrypt.compareSync(password, users.password);
    if (!validation) {
      return response(res, 404, false, null, "wrong password");
    }
    delete users.password;
    delete users.otp;
    delete users.verif;
    let payload = {
      email: users.email,
      role: users.role,
    };
    users.token = generateToken(payload);
    users.refreshToken = generateRefreshToken(payload);
    response(res, 200, true, users, "login success");
  },

  verificationOtp: async (req, res) => {
    const { email, otp } = req.body;
    const {
      rows: [users],
    } = await findEmail(email);
    if (!users) {
      return response(res, 404, false, null, " email not found");
    }

    if (users.otp == otp) {
      const result = await verification(req.body.email);
      return response(res, 200, true, result, " verification email success");
    }
    return response(
      res,
      404,
      false,
      null,
      " wrong otp please check your email"
    );
  },
};

exports.UsersController = UsersController;
