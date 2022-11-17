const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: false})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));
    