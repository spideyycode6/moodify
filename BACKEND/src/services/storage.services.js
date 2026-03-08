const imagekit = require("@imagekit/nodejs").default;

const client = new  imagekit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
});


async function upload({buffer,filename,folder=""}) {
    const file = await client.files.upload({
        file: await imagekit.toFile(Buffer.from(buffer)),
        fileName:filename,
        folder
    });

    return file
}

module.exports = {upload}