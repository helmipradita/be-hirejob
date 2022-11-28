const express = require('express')
const routerWorkingExperince = express.Router()
const {WorkingExperinceController} = require('../controllers/working_experince')

routerWorkingExperince.get('/',WorkingExperinceController.getWorkingExperince)
routerWorkingExperince.post('/',WorkingExperinceController.insert)
routerWorkingExperince.put('/:id',WorkingExperinceController.update)
routerWorkingExperince.delete('/:id',WorkingExperinceController.delete)


module.exports = routerWorkingExperince 