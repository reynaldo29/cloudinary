const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://adminadmin:sinergismo12@cluster0.1ac1k55.mongodb.net/test?retryWrites=true&w=majority")
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));