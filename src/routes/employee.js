const express = require('express')
const routerEmployee = express.Router()
const {EmployeeController} = require('../controllers/employee')
const {uploadPortofolio}  = require('../middleware/uploadPortofolio') 


routerEmployee.get('/',EmployeeController.getEmployee)
routerEmployee.get("/:id",EmployeeController.getEmployeeDetail);
routerEmployee.post('/',uploadPortofolio.single('portofolio'),EmployeeController.insert)
routerEmployee.put('/:id',uploadPortofolio.single('portofolio'),EmployeeController.update)
routerEmployee.delete('/:id',EmployeeController.delete)


module.exports = routerEmployee 