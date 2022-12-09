let AWS = require("aws-sdk");

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: "eu-west-3",
});
let s3 = new AWS.S3();
let params = {
    Bucket: "awsbish",
    Delimiter: "",
};

let getS3Files = (callback) => {
    s3.listObjectsV2(params, function (err, data) {
        callback(data);
    });
};

getS3Files((data) => {
    const files = data.Contents.map((file) => ({
        fileName: file.key,
        fileDate: file.LastModified,
    })).sort((a, b) => b.fileDate - a.fileDate);
    console.log(data)
    return files;
});