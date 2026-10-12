const express = require("express");
const app = express();

app.use(express.json());

let events = [
    { id: 1, name: "Tech Fest", date: "2026-11-10" },
    { id: 2, name: "Sports Day", date: "2026-11-15" }
];

// Add an event
app.post("/events", (req, res) => {
    events.push(req.body);
    res.status(201).json({ message: "Event added", event: req.body });
});

// Get all events
app.get("/events", (req, res) => {
    res.json(events);
});

// Get event by ID
app.get("/events/:id", (req, res) => {
    let id = Number(req.params.id);
    let found = false;

    for (let i = 0; i < events.length; i++) {
        if (events[i].id === id) {
            res.json(events[i]);
            found = true;
            break;
        }
    }

    if (found === false) {
        res.status(404).json({ message: "Event not found" });
    }
});

// Update event
app.put("/events/:id", (req, res) => {
    let id = Number(req.params.id);
    let found = false;

    for (let i = 0; i < events.length; i++) {
        if (events[i].id === id) {
            events[i] = req.body;
            events[i].id = id;
            res.json({ message: "Event updated", event: events[i] });
            found = true;
            break;
        }
    }

    if (found === false) {
        res.status(404).json({ message: "Event not found" });
    }
});

// Delete event
app.delete("/events/:id", (req, res) => {
    let id = Number(req.params.id);
    let found = false;

    for (let i = 0; i < events.length; i++) {
        if (events[i].id === id) {
            events.splice(i, 1);
            res.json({ message: "Event deleted" });
            found = true;
            break;
        }
    }

    if (found === false) {
        res.status(404).json({ message: "Event not found" });
    }
});

app.listen(5000, () => {
    console.log("Event API running at http://localhost:5000");
});
