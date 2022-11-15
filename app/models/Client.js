const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/crm', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }

    ,
    nip: {
        type: String
    }
})

module.exports = mongoose.model('Client', schema);