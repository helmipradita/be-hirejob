const express = require('express');
const cors = require(`cors`);
const morgan = require(`morgan`);
const bodyParser = require(`body-parser`);
require(`dotenv`).config();
const multer = require('multer')
// const cloudinary = require('./src/middleware/cloudinary')
// const fs = require('fs')

const mainRouter = require('./src/routes/index');

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
// app.use('/img-cloudinary',uploadPortofolio.array('image'),async(req,res)=>{
  
//   const uploader = async (path) => await cloudinary.uploadPortofolio(path,'images')
//   if(req.method === 'post'){
//     const url = []
//     const files = req.files
//     for(const file of files) {
//       const {path} = file
//       const newPath = await uploader(path)
//       urls.push(newPath)
//       fs.unlinkSync(path)
//     }
//     res.status(200).json({
//       message: 'iamage upload success',
//       data:urls
//     })
//   }else{
//     res.status(404).json({
//       err:'image not upload succsess'
//     })
//   }
// })

//working_experince dan employee
app.use('/working_experince',working_experince)
app.use('/employee',employee)

app.all('*', (req, res, next) => {
  res.status(404).json({ status: 'error', statusCode: 404 });
});

app.use('/', (req, res, next) => {
  res.status(200).json({ status: 'success', statusCode: 200 });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
