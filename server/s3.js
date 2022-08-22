const { S3 } = require("aws-sdk");
const fs = require("fs");

const Bucket = "diego-spiced";

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets.json"); // in dev they are in secrets.json which is listed in .gitignore
}

const s3 = new S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

function s3upload(request, response, next) {
    if (!request.file) {
        console.log("[socialnetwork:s3] file not there");
        response.sendStatus(500);
        return;
    }
    const {
        filename: Key,
        mimetype: ContentType,
        size: ContentLength,
        path,
    } = request.file;

    console.log("[socialnetwork:s3] uploading to s3...", {
        Bucket,
        Key,
        ContentType,
        ContentLength,
    });

    s3.putObject({
        Bucket,
        ACL: "public-read",
        Key,
        Body: fs.createReadStream(path),
        ContentType,
        ContentLength,
    })
        .promise()
        .then(() => {
            console.log("[socialnetwork:s3] uploaded to s3");
            next();
            // delete original file on upload
            fs.unlink(path, () => {});
        })
        .catch((error) => {
            console.log("[socialnetwork:s3] error uploading to s3", error);
            response.sendStatus(500);
        });
}

module.exports = {
    s3upload,
    Bucket,
};
