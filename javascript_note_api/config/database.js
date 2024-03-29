const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true, 
    UseUnifiedTopology: true, 
}).then(() => console.log('Connection successful'))
.catch((err) => console.log(err));