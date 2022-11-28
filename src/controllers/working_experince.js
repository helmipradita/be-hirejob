/* eslint-disable no-unused-vars */
//const { response } = require('../middleware/common');
const  ModelWorkingExperince = require('../models/working_experince')
const {response} = require ('../middleware/common')

//untuk control
const WorkingExperinceController = {
    //untuk put diambil dari file index.js
    update : (req,res,next) => {
        ModelWorkingExperince.updateWorkingExperince(req.params.id,req.body)
        .then((result) => response (res,200,true,result.rows,'update data success'))
        .catch((err) => response(res,401,false,err,'update data fail'));
    },
    //delete diambil dari file index.js
    delete : (req,res,next) => {
        ModelWorkingExperince.deleteWorkingExperince(req.params.id)
        .then((result) => response (res,200,true,result.rows,'delete data success'))
        .catch((err) => response(res,401,false,err,'delete data fail'));
    },
    //get diambil dari file index.js
    getWorkingExperince : (req,res,next) => {
        ModelWorkingExperince.selectWorkingExperince()
        .then((result) => response (res,200,true,result.rows,'get data success'))
        .catch((err) => response(res,401,false,err,'get data fail'));
    },
     //untuk post yang diambil dari file index.js
     insert : (req,res,next) => {
        ModelWorkingExperince.insertWorkingExperince(req.body)
        .then((result) => response (res,200,true,result.rows,'insert data success'))
        .catch((err) => response(res,401,false,err,'insert data fail'));
    },
}

//untuk mengexport produk contol
exports.WorkingExperinceController = WorkingExperinceController

