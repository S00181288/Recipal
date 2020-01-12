const mongoose = require('mongoose');

//This is essentially the interface for the server side recipe.

const recipeschema = mongoose.Schema({
    title: {type: String, required: true},
    method: {type: String, required: true}
});

module.exports = mongoose.model('Recipe', recipeschema);

