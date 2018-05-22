const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost/MVP';

const db = mongoose.connect(mongoUri);

const earthquakeFilter = new mongoose.Schema({

})

const Earthquake = mongoose.model('earthquake', earthquakeFilter)

export default Earthquake;