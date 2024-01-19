const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
// const bodyParser = require('body-parser');
const SupportAgent = require("./models/supportAgent");
const SupportTicket = require("./models/supportTicket");
const cors = require('cors');
const supportAgent = require('./models/supportAgent');

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

mongoose
    .connect('mongodb://127.0.0.1/support-ticket-system', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useCreateIndex: true,
        //useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to Mongo!');
    })
    .catch((err) => {
        console.error('Error connecting to Mongo', err);
    });


let currentAgentIndex = 0;

app.post('/api/support-agents', async (req, res) => {
    try {
        console.log(req.body);
        //res.send("ok")
        const { name, email, phone, description } = req.body;
        const newAgent = new SupportAgent({ name, email, phone, description });
        const savedAgent = await newAgent.save();
        res.json(savedAgent);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/support-tickets', async (req, res) => {
    try {
        const { topic, description, severity, type } = req.body;

        // Get all active support agents
        const activeAgents = await SupportAgent.find({ active: true });

        let status = 'New';
        let assignedAgent = null;

        if (activeAgents.length > 0) {
            // Round-robin assignment logic
            assignedAgent = activeAgents[currentAgentIndex];
            currentAgentIndex = (currentAgentIndex + 1) % activeAgents.length;
            status = 'Assigned';
        }
        console.log(currentAgentIndex);
        const newTicket = new SupportTicket({
            topic,
            description,
            severity,
            type,
            assignedTo: assignedAgent ? assignedAgent.name : null,
            status,
        });

        const savedTicket = await newTicket.save();
        console.log(savedTicket);
        res.json(savedTicket);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// app.post('/api/support-tickets', async (req, res) => {
//     try {
//         console.log(req.body);
//         //res.send("ok")
//         const { topic, description, severity, type } = req.body;
//         const newTicket = new SupportTicket({ topic, description, severity, type });
//         const savedTicket = await newTicket.save();
//         res.json(savedTicket);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


// ... (previous code)

app.get('/api/support-tickets', async (req, res) => {
    try {
        const { sortBy, status, assignedTo, severity, type } = req.query;
        const filterOptions = {};

        if (status) {
            filterOptions.status = status;
        }

        if (assignedTo) {
            filterOptions.assignedTo = assignedTo;
        }

        if (severity) {
            filterOptions.severity = severity;
        }

        if (type) {
            filterOptions.type = type;
        }

        const sortOptions = {};

        if (sortBy === 'resolvedOn' || sortBy === 'dateCreated' || sortBy === 'topic') {
            sortOptions[sortBy] = 1; // 1 for ascending, -1 for descending
        }

        const tickets = await SupportTicket.find(filterOptions).sort(sortOptions);
        res.json(tickets);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// ... (remaining code)


app.get('/', (req, res) => {
    res.send("qekkkkkkkkkkkkkkcom")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});