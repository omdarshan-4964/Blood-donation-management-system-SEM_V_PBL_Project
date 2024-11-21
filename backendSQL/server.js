const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');


const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const bloodrequestRoutes = require('./routes/bloodRequestRoutes')
const bodyParser = require('body-parser');
const notificationRoutes = require('./routes/notificationRoutes')

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json()); 

app.use('/api/auth', authRoutes);
app.use('/api/v2', notificationRoutes);
app.use('/api/v1', bloodrequestRoutes);
app.use('/api/hospital', hospitalRoutes);
app.use('/notifications', notificationRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
