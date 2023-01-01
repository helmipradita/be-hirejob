/* eslint-disable no-empty */
/* eslint-disable no-undef */
const multer = require('multer');
const path = require('path')
const { response } = require('../middleware/common');



let maxSize = 1024 * 1024 *2
const upload =multer ({
    storage : multer.diskStorage({
        //untuk menyimpan file dalam directory (upload)
        destination: function (req,file,cb){
            cb(null,'./upload')
        },
    
        //nama file yang akan disimpan dalam destination
        filename: function (req,file,cb){
            const uniq = Date.now() + Math.round(Math.random() * 1E9)
            cb(null,file.fieldname+'-'+uniq+ path.extname(file.originalname))
        }
    }),
    
    fileFilter : (req,file,cb) =>{
        var ext = path.extname(file.originalname)
        if(ext =='.jpg' || ext =='.png' || ext =='.jpeg') {
            cb(null, true)
        }else {
            cb(null, false)
            return cb (new Error ('only jpg or png'))
        } 
      },
    limits : {fileSize : maxSize}
        
    })


module.exports = {upload} 



