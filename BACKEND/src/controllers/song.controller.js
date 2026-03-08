const songModel = require('../models/song.model');
const storageService = require('../services/storage.services')
const id3 = require("node-id3")


async function uploadSong(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No song file uploaded. Make sure the field name is 'song' and Content-Type is multipart/form-data." });
        }
        const songBuffer = req.file.buffer;
        const { mood } = req.body;

        let tag = {};
        try {
            tag = id3.read(songBuffer) || {};
        } catch (err) {
            console.log("No ID3 tags found or error reading tags.");
        }

        const fallbackTitle = req.file.originalname.split('.')[0] || "Unknown Title";
        const title = tag.title || fallbackTitle;

        // Upload Song
        const songUploadPromise = storageService.upload({
            buffer: songBuffer,
            filename: title,
            folder: '/project/moodiefy/songs'
        });

        // Upload Poster (only if tag has an image buffer)
        let posterUploadPromise = null;
        if (tag.image && tag.image.imageBuffer) {
            posterUploadPromise = storageService.upload({
                buffer: tag.image.imageBuffer,
                filename: title,
                folder: '/project/moodiefy/poster'
            });
        }

        // Wait for uploads
        const [songFile, posterImage] = await Promise.all([
            songUploadPromise,
            posterUploadPromise || Promise.resolve({ url: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=500&auto=format&fit=crop" }) // Default music poster
        ]);

        const song = await songModel.create({
            title: title,
            postUrl: posterImage.url,
            url: songFile.url,
            mood
        });

        res.status(201).json({
            message: "Song created successfully",
            song
        });
    } catch (error) {
        console.error("Error uploading song:", error);
        res.status(500).json({
            message: "Internal server error during upload",
            error: error.message
        });
    }
};

async function getSong(req, res) {
    const { mood } = req.query;

    const songs = await songModel.aggregate([
        { $match: { mood: mood } },
        { $sample: { size: 1 } }
    ]);

    if (!songs || songs.length === 0) {
        return res.status(404).json({
            message: "Song not found for this mood"
        });
    }

    return res.status(200).json({
        message: 'Mood and Song',
        isMood: songs[0]
    });
}


module.exports = { uploadSong, getSong }