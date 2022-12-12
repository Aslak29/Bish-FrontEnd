import AWS from "aws-sdk"

AWS.config.update({
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
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
    return data.Contents.map((file) => ({
        fileName: file.key,
        fileDate: file.LastModified,
    }));
});
export default s3;