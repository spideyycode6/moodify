require("dotenv").config();
const mongoose = require("mongoose");
const songModel = require("./src/models/song.model");

const MONGODB_URI = process.env.MONGODB_URI;

const sampleSongs = [
    {
        title: "Pyaar Hai",
        mood: "sad",
        url: "https://ik.imagekit.io/gge3o5li3/project/moodiefy/songs/Pyaar_Hai_M5urp9IQK",
        postUrl: "https://ik.imagekit.io/gge3o5li3/project/moodiefy/poster/Pyaar_Hai_GW3FaW9iP"
    },
    {
        title: "Happy Days",
        mood: "happy",
        url: "https://ik.imagekit.io/gge3o5li3/project/moodiefy/songs/happy_song",
        postUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500"
    },
    {
        title: "High Energy",
        mood: "energetic",
        url: "https://ik.imagekit.io/gge3o5li3/project/moodiefy/songs/energetic_song",
        postUrl: "https://images.unsplash.com/photo-1498038432885-fbf10fa5b934?w=500"
    },
    {
        title: "Peaceful Moment",
        mood: "calm",
        url: "https://ik.imagekit.io/gge3o5li3/project/moodiefy/songs/calm_song",
        postUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500"
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        // Clear existing songs
        await songModel.deleteMany({});
        console.log("Cleared existing songs");

        // Insert sample songs
        const result = await songModel.insertMany(sampleSongs);
        console.log(`✅ Successfully seeded ${result.length} songs`);

        // Display all songs
        const allSongs = await songModel.find();
        console.log("\nSeeded songs:");
        allSongs.forEach(song => {
            console.log(`  - ${song.title} (${song.mood})`);
        });

        process.exit(0);
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        process.exit(1);
    }
}

seedDatabase();
