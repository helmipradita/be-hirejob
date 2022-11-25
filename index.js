const express = require('express');
const cors = require(`cors`);
const morgan = require(`morgan`);
const bodyParser = require(`body-parser`);
require(`dotenv`).config();
const multer = require('multer')
// const cloudinary = require('./src/middleware/cloudinary')
// const fs = require('fs')
const mainRouter = require('./src/routes/index');

const app = express();
const port = process.env.PORT;
//working_experince dan employee
const working_experince = require('./src/routes/working_experince')
const employee = require('./src/routes/employee')


app.use(cors());
app.use(morgan('dev')); 
app.use(bodyParser.json());

app.use('/', mainRouter);
app.use('/img',express.static('./uploadPortofolio'))


//working_experince dan employee
app.use('/working_experince',working_experince)
app.use('/employee',employee)











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







app.all('*', (req, res, next) => {
  res.status(404).json({ status: 'error', statusCode: 404 });
});

app.use('/', (req, res, next) => {
  res.status(200).json({ status: 'success', statusCode: 200 });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
