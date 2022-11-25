/* eslint-disable no-unused-vars */
//const { response } = require('../middleware/common');
const  ModelEmployee = require('../models/employee')
const pool = require('../config/db');
const {response} = require ('../middleware/common')
//const {cloudinary} = require('../middleware/cloudinary')



//untuk control
const EmployeeController = {
    //untuk put diambil dari file index.js
    update : (req,res,next) => {
        const Port = process.env.PORT //env
        //const Host = process.env.HOST //env
        const portofolio = req.file.filename 
        const uri = `http://localhost:${Port}/img/${portofolio}`
        req.body.portofolio = uri
        req.body.fullname = req.body.fullname
        req.body.job_desk = req.body.job_desk
        req.body.domisili = req.body.domisili
        req.body.tempat_kerja = req.body.tempat_kerja
        req.body.description = req.body.description
        req.body.skill = req.body.skill
        req.body.working_experince = req.body.working_experince

        ModelEmployee.updateEmployee(req.params.id,req.body)
        .then((result) => response (res,200,true,result.rows,'update data success'))
        .catch((err) => response(res,401,false,err,'update data fail'));
    },
    //delete diambil dari file index.js
    delete : (req,res,next) => {
        ModelEmployee.deleteEmployee(req.params.id)
        .then((result) => response (res,200,true,result.rows,'delete data success'))
        .catch((err) => response(res,401,false,err,'delete data fail'));
    },

    // const printResult = {};
    // printResult.success = status;
    // printResult.statusCode = statusCode;
    // printResult.data = result || null;
    // printResult.message = message || null;
    //get diambil dari file index.js
    // getEmployee : (req,res,next) => {
    //     ModelEmployee.selectEmployee()
    //     .then((result) => res.send({ result: result.rows }))
    //     .catch((err) => res.send({ message: `error`, err }));
    // },

    getEmployee: async(req, res, next) => {

        const page = Number(req.query.page) || 1 //menerima query(gabungan paramams yang memiliki nilai) page
        const limit = Number(req.query.limit) || 10 //menerima query limit
        const offset = (page - 1) * limit 
        const sortby = req.query.sortby || "fullname" //menerima query sortby
        const sort = req.query.sort || "ASC"
        const search = req.query.search || '';

        ModelEmployee.selectEmployee({limit,offset,sort,sortby,search})
        .then((result) => response (res,200,true,result.rows,'get data success'))
        .catch((err) => response(res,401,false,err,'get data fail'));
        },

    getEmployeeDetail : (req,res,next) => {
        ModelEmployee.selectEmployeeDetail(req.params.id)
        .then((result) => response (res,200,true,result.rows,'get data success'))
        .catch((err) => response(res,401,false,err,'get data fail'));
    },
     //untuk post yang diambil dari file index.js
     insert : (req,res,next) => {
        const Port = process.env.PORT //env
        //const Host = process.env.HOST //env
        const portofolio = req.file.filename 
        const uri = `http://localhost:${Port}/img/${portofolio}`
        req.body.portofolio = uri
        req.body.fullname = req.body.fullname
        req.body.job_desk = req.body.job_desk
        req.body.domisili = req.body.domisili
        req.body.tempat_kerja = req.body.tempat_kerja
        req.body.description = req.body.description
        req.body.skill = req.body.skill
        req.body.working_experince = req.body.working_experince

        ModelEmployee.insertEmployee(req.body)
        .then((result) => response (res,200,true,result.rows,'insert data success'))
        .catch((err) => response(res,401,false,err,'insert data fail'));
    },
}

//untuk mengexport produk contol
exports.EmployeeController = EmployeeController

