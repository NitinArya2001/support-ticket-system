var mongoose = require("mongoose");

const supportAgentSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phone: String,
    description: String,
    active: {
        type: Boolean,
        default: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});
module.exports = mongoose.model('SupportAgent', supportAgentSchema);
