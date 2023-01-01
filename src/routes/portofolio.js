const express = require('express')
const routerPorto = express.Router()
const {PortoController} = require('../controllers/portofolio')
const {upload} = require('../middleware/uploadPortofolio')
const {protect} = require ('../middleware/auth')

routerPorto.get('/',PortoController.get)
routerPorto.get('/:id',PortoController.getId)
routerPorto.post('/',upload.single('photo'),PortoController.insert)
routerPorto.put('/:id',upload.single('photo'),PortoController.update)
routerPorto.delete('/:id',PortoController.delete)


module.exports = routerPorto 