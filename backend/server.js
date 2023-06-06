// import required packages
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');

// create a new express app
const app = express();

// Allow requests from all domains
app.use(cors());

// use body-parser middleware to parse incoming requests as JSON
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// connect to MongoDB database
mongoose.connect("mongodb+srv://admin:12345@cluster0.cqojdmy.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// define the ticket schema
// define the ticket schema
const ticketSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  issue: String,
  date: { type: Date, default: Date.now },
});


// define the ticket model
const Ticket = mongoose.model("Ticket", ticketSchema);

// define the POST API endpoint for creating new tickets
app.post("/api/tickets", (req, res) => {
  const { name, email, phone, issue } = req.body;

  // create a new ticket using the Ticket model
  const newTicket = new Ticket({ name, email, phone, issue });

  // save the new ticket to the database
  newTicket
    .save()
    .then((savedTicket) => {
      console.log("Ticket created:", savedTicket);
      res.json(savedTicket);
    })
    .catch((err) => {
      console.error("Failed to create ticket:", err);
      res.status(500).json({ error: "Failed to create ticket" });
    });
});

// start the Software
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Software listening on port ${PORT}`);
});
