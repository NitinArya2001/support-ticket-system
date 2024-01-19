var mongoose = require("mongoose");
const supportTicketSchema = new mongoose.Schema({
    topic: String,
    description: String,
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    severity: String,
    type: String,
    assignedTo: {
        //type: mongoose.Schema.Types.ObjectId,
        //ref: 'SupportAgent',
        type: String
    },
    status: {
        type: String,
        enum: ['New', 'Assigned', 'Resolved'],
        default: 'New',
    },
    resolvedOn: Date,
});

const SupportTicket = mongoose.model('SupportTicket', supportTicketSchema);
module.exports = SupportTicket;