const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/crm', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const schema = mongoose.Schema({
    'client': {
        type:mongoose.Types.ObjectId, 
        ref: 'Client'
    },
    'date': {
        type: String,
        required: true
    }, 
    'type': {
        type: String, 
        required: true
    }, 
    'description': {
        type: String, 
        required: true
    }

})

module.exports = mongoose.model('Action', schema);