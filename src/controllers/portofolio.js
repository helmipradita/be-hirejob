const  ModelPorto = require('../models/porofolio')
const {response} = require ('../middleware/common');
const { v4:uuidv4} = require('uuid');
const path = require('path');
// const cloudinary = require('../middleware/uploadPortofolio')
const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');



const PortoController = { 
    update : async (req,res,next) => {
        try{
            cloudinary.config({
                cloud_name: process.env.CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
              });
            const id =  uuidv4()
            // const {user_id,repo_link,repo_type,create_at,description} = req.body
            const image = await cloudinary.uploader.upload(req.file.path, {folder : 'porto'})
            const porto = {
                id ,
                user_id : req.body.user_id,
                repo_link : req.body.repo_link,
                repo_type: req.body.repo_type,
                photo : image.url,
                description : req.body.description
            }
            await ModelPorto.updatePorto(req.params.id,porto)
            response (res,200,true,porto,'update portofolio success') 
        }catch (err){
            response(res,401,false,err,'update portofolio fail')
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
    insert : async (req,res,next) => {
        try{
            cloudinary.config({
                cloud_name: process.env.CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
              });
            const id =  uuidv4()
            // const {user_id,repo_link,repo_type,create_at,description} = req.body
            const image = await cloudinary.uploader.upload(req.file.path, {folder : 'porto'})
            const porto = {
                id ,
                user_id : req.body.user_id,
                repo_link : req.body.repo_link,
                repo_type: req.body.repo_type,
                photo : image.url,
                description : req.body.description
            }
            console.log(porto)
            await ModelPorto.insertPorto(porto)
            response (res,200,true,porto,'insert portofolio success ') 
            
        }catch (err) {
            response(res,401,false,err.message,'insert portofolio fail apaaan tauuuuuuuu')
            console.log(JSON.stringify(err))
        } 
    }
}


exports.PortoController = PortoController

