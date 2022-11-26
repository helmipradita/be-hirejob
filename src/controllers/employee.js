const  ModelEmployee = require('../models/employee')
const pool = require('../config/db');
const {response} = require ('../middleware/common')
const cloudinary = require('cloudinary')



//untuk control
const EmployeeController = {
    //untuk put diambil dari file index.js
    update : async (req,res,next) => {
        try{
            req.body.fullname = req.body.fullname
            req.body.job_desk = req.body.job_desk
            req.body.domisili = req.body.domisili
            req.body.tempat_kerja = req.body.tempat_kerja
            req.body.description = req.body.description
            req.body.skill = req.body.skill
            req.body.working_experince = req.body.working_experince
            const uploadportofolio = await cloudinary.uploader.upload(req.file.path, {folder: 'portofolio'})
            req.body.portofolio = uploadportofolio.url

            await ModelEmployee.updateEmployee(req.params.id, req.body)
            return response (res,200,true,req.body,'update data success')
  
        }catch(e) {
            return response(res,401,false,e,'update data fail');

        }
    },

    //delete diambil dari file index.js
    delete : (req,res,next) => {
        ModelEmployee.deleteEmployee(req.params.id)
        .then((result) => response (res,200,true,result.rows,'delete data success'))
        .catch((err) => response(res,401,false,err,'delete data fail'));
    },

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
     insert : async (req,res,next) => {
        try{
            req.body.fullname = req.body.fullname
            req.body.job_desk = req.body.job_desk
            req.body.domisili = req.body.domisili
            req.body.tempat_kerja = req.body.tempat_kerja
            req.body.description = req.body.description
            req.body.skill = req.body.skill
            req.body.working_experince = req.body.working_experince
            const uploadportofolio = await cloudinary.uploader.upload(req.file.path, {folder: 'portofolio'})
            req.body.portofolio = uploadportofolio.url

            await ModelEmployee.insertEmployee(req.body)
            return response (res,200,true,req.body,'insert data success')
  
        }catch(e) {
            return response(res,401,false,e,'insert data fail');

        }
        
    },
}

//untuk mengexport produk contol
exports.EmployeeController = EmployeeController

