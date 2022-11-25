// const dotenv = require('dotenv')
// const cloudinary = require('cloudinary').v2;
// dotenv.config()



// cloudinary.config({
//     cloud_name :process.env.CLOUD_NAME,
//     api_key    :process.env.CLOUDINARY_API_KEY,
//     api_secret :process.env.CLOUDINARY_API_SECRET
// })

// const upload = multer ({
//   storage : multer.diskStorage({})

// })

// app.post('/upload',upload.single('portofolio'),async(req,res)=>{
//   try{
//     const result = await cloudinary.uploader.upload(req.file.path)
//     res.send({
//       status: 'success',
//       img_url: result.secure_url
//     })
//   } catch (err){
//     console.log(err)
//   }

// })













const multer = require('multer');
const path = require('path')




let maxSize = 1024 * 1024 *2
const uploadPortofolio =multer ({
    storage : multer.diskStorage({
        //untuk menyimpan file dalam directory (upload)
        destination: function (req,file,cb){
            cb(null,'./uploadPortofolio')
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
            //cb({message:'file not support'},false)
        } 
      },
    limits : {fileSize : maxSize}
        
    })


module.exports = {uploadPortofolio} 




