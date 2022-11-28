const validate = (req, res, next) => {
  const { email, password } = req.body;
  const err = [];
  try {
    if (!email || !isNaN(email) || email.length < 3)
      err.push("name must more than 3 character");
    if (!password || !isNaN(password) || password.length < 8)
      err.push("password must more than 8 character");
    if (err.length > 0) {
      throw new Error(err.toString());
    }

    next();
  } catch (err) {
    console.log(err);
    res.json({ error: `${err}` });
  }
};
module.exports = { validate };
