const ModelCompany = require(`../models/company`);

const CompanyController = {
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
