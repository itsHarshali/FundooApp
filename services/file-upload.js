require('dotenv').config();
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3Config = new AWS.S3({
    accessKeyId: `${process.env.AWS_ACCESS_KEY}`,
    secretAccessKey: `${process.env.AWS_SECRET_ACCESS}`,
    region: 'ap-south-1'
  });

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

// // this is just to test locally if multer is working fine.
// const storage = multer.diskStorage({
//     destination: (req, res, cb) => {
//         cb(null, 'src/api/media/profiles')
//     },
//     filename: (req, file, cb) => {
//         cb(null, new Date().toISOString() + '-' + file.originalname)
//     }
// })

const multerS3Config = multerS3({
    s3: s3Config,
    bucket: "mybucket2000",
    acl: 'public-read',
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        console.log(file)
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
});

const upload = multer({
    storage: multerS3Config,
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // we are allowing only 5 MB files
    }
})

module.exports = upload; 




















// const aws = require('aws-sdk')
// //require('dotenv/config')
// const multer = require('multer')
// const multerS3 = require('multer-s3')

// aws.config.update({

//     accessKeyId:'"AAKIAINM7APXJXUYLNRAQ"',
//     secretAccessKey:'f9nFrPSPQ6G7ppGLlliQ9Rw7bkgM7GXl1FE/Iq36',
//     region:'ap-south-1'
// //     secretAccessKey: `${process.env.AWS_SECRET_ACCESS}`,
// //     accessKeyId: `${process.env.AWS_ACCESS_KEY}`,
// //     region: 'ap-south-1'
//  });
// const s3 = new aws.S3()// s3 instance create


// const upload = multer({
//     storage: multerS3({
//         s3,
//         bucket: 'fundoo-images1',
//         acl: 'public-read',
//         metadata: function (req, file, cb) {
//             cb(null, { fieldName: 'META_DATA!' });
//         },
//         key: function (req, file, cb) {
//             cb(null, Date.now().toString())
//         }
//     })
// })


// module.exports = upload