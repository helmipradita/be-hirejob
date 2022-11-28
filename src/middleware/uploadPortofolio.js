const multer = require('multer');
const path = require('path')




let maxSize = 1024 * 1024 *2
const uploadPortofolio =multer ({
    storage : multer.diskStorage({}),
    
    fileFilter : (req,file,cb) =>{
        var ext = path.extname(file.originalname)
        if(ext =='.jpg' || ext =='.png' || ext =='.jpeg') {
            cb(null, true)
        }else {
            //cb(null, false)
            //return cb (new Error ('only jpg or png'))
            cb({message:'file not support'},false)
        } 
      },
    limits : {fileSize : maxSize}
        
    })


module.exports = {uploadPortofolio} 




