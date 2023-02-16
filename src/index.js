const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');
const cors = require('cors');
require('dotenv').config();
mongoose
	.connect(
        `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.gzjlcir.mongodb.net/test`
	)
	.then(() => {
        console.log('Database Connected');
    });

app.use(cors());
app.use(express.json());
app.get('/api', (req, res) => {
    res.send('Hello World!');
});
app.use('/api', authRoutes);
app.use('/api', taskRoutes);
app.listen(3001, () => {
    console.log('Example app listening on port 3000!');
});
