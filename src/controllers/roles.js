const ModelRole = require(`../models/role`);

const RolesController = {
  update: (req, res, next) => {
    ModelRole.updateData(req.params.id, req.body)
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
    ModelRole.selectData()
      .then((result) => res.send({ result: result.rows }))
      .catch((err) => res.send({ message: `error`, err }));
  },
  insert: (req, res, next) => {
    ModelRole.insertData(req.body)
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
    ModelRole.deleteData(req.params.id)
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

exports.RolesController = RolesController;
