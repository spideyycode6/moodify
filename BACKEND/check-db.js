require('dotenv').config();
const mongoose = require('mongoose');
const songModel = require('./src/models/song.model');
mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        const songs = await songModel.find({}, 'title mood');
        console.log('--- ALL SONGS IN DB ---');
        console.log(JSON.stringify(songs, null, 2));
        process.exit(0);
    })
    .catch(err => {
        console.error('Connection error:', err);
        process.exit(1);
    });
