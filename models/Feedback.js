const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    userName: {type: String, required: true},
    tourId: {type: String, required: true},
    stars: {type: Number, required: true},
    createdAt: { type: Date, default: Date.now },
    description: {type: String, required: false}
});

module.exports = mongoose.model('Feedback', FeedbackSchema);