const mongoose = require('mongoose')
const storySchema = new mongoose.Schema({
    topic: {
        type: String,
        required: true,
    },
    storyContent: {
        type: String,
        required: true,
    },
})

mongoose.model("Story", storySchema)