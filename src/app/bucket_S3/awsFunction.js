import s3 from "./aws";

export function createAlbum(name,infofile,path) {
    s3.upload({ Key: "assets/images/" + path + "/" + name, Bucket: "awsbish", Body:infofile}, function(err, data) {
        if (err) {
            return alert("There was an error creating your album: " + err.message);
        }
    });
}
