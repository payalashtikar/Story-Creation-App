const mongoose = require('mongoose')
const express = require('express')
const Storys = mongoose.model("Story");
const router = express.Router()

router.post('/createstory', async (req, res) => {
    try {
        const { topic, storyContent } = req.body;
        if (!topic || !storyContent) {
            return res.status(400).json({ error: "please fill all required fields" })
        }
        const uploadStory = new Storys({
            topic,
            storyContent,
        });

        await uploadStory.save();
        return res
            .status(200)
            .json({ message: "story created", uploadStory });
    } catch (err) {
        return res.status(400).json({ error: err })
    }
});

router.get('/getallstories', async (req, res) => {
    try {
        const { topic, storyContent } = req.body;
        const stories = await Storys.find({})
        return res
            .status(200)
            .json({ message: "got all created story ", stories });
    }
    catch (err) {
        return res.status(400).json({ error: err })
    }
})

router.delete("/detelestory/:id", async (req, res) => {
    let data = await Storys.findByIdAndDelete({ _id: req.params.id });
    return res.status(200).json(data);
})

router.put('/editstory/:id', async (req, res) => {
    let data = await Storys.findByIdAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!data) {
        return res.status(404).json({ error: "cannot find story" });
    }
    return res.status(200).json("story updated");
})


module.exports = router;