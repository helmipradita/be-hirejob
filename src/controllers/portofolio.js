const  ModelPorto = require('../models/porofolio')
const {response} = require ('../middleware/common');
const { v4:uuidv4} = require('uuid');
const path = require('path');
// const cloudinary = require('../middleware/uploadPortofolio')
const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');



const PortoController = { 
    update : async (req,res,next) => {
        try {
            const id =  uuidv4()
            const {user_id,repo_link,repo_type,description} = req.body
            const photo = req.file
            const image = await cloudinary.uploader.upload(photo.path)
            const data = { id,user_id,repo_link,repo_type,photo: image.secure_url,description }
            console.log(data);
            const {rows} = await ModelPorto.updatePorto(req.params.id,data)
            response(res, 200, 'sucess', rows, 'insert portofolio sucess')
        } catch (error) {
            console.log(error);
        }
    },    
    delete : (req,res,next) => {
        ModelPorto.deletePorto(req.params.id)
        .then((result) => response (res,200,true,result.rows,'delete portofolio success'))
        .catch((err) => response(res,401,false,err.message,'delete portofolio fail'));
    },
    get : (req,res,next) => {
        ModelPorto.selectPorto()
        .then((result) => response (res,200,true,result.rows,'get portofolio success'))
        .catch((err) => response(res,401,false,err.message,'get portofolio fail'));
    },
    getId : (req,res,next) => {
        ModelPorto.selectPortoId(req.params.id)
        .then((result) => response (res,200,true,result.rows,'get portofolio success'))
        .catch((err) => response(res,401,false,err,'get portofolio fail'));
    },
    insert: async(req,res,next) => {
        try {
            const id =  uuidv4()
            const {user_id,repo_link,repo_type,description} = req.body
            const photo = req.file
            const image = await cloudinary.uploader.upload(photo.path)
            const data = { id,user_id,repo_link,repo_type,photo: image.secure_url,description }
            console.log(data);
            const {rows} = await ModelPorto.insertPorto(data)
            response(res, 200, 'sucess', rows, 'insert portofolio sucess')
        } catch (error) {
            console.log(error);
        }
    }
}


exports.PortoController = PortoController

