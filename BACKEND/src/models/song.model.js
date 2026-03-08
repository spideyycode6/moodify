const mongoose = require("mongoose");


const songSchema = new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    postUrl:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    mood:{
        type:String,
        enum:{
            values:['sad','happy','energetic','netural'],
            message:'Enum this is'
        }
    }
});


const songModel = mongoose.model("Songs Detail",songSchema);


module.exports = songModel;