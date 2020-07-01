const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000

app.set("port", PORT);

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully!")
});

const ticketsRouter = require('./routes/tickets');
const usersRouter = require('./routes/users');

app.use('/tickets', ticketsRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});