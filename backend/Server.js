const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors({
    credentials : true,
    origin : "http://localhost:3000"
}));

const dotenv = require('dotenv');
dotenv.config({ path: './config/Config.env' });
const PORT = process.env.PORT;

require('./db/Conn');

const router = require('./routes/UserRoute');
app.use('/portfolio', router);

app.listen(PORT, (err) => {
    if (err) {
        console.log('Error while making connection');
    }
    console.log(`Server is running on port no ${PORT}`);
});
