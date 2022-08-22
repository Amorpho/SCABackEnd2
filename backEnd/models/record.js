const mongoose = require('mongoose');


const recordSchema = mongoose.Schema({
  id: {type: String},
  claimNumber: {type: String, required: true},
  date: {type: Date},
  status: {type: String, required: true},
  processedBy: {type: String, required: true},
  assignment: {type: String, required: true},
  client: {type: String, required: true},
  exception: {type: String, required: true},
  exception2: {type: String, required: true},
})

module.exports = mongoose.model("Record", recordSchema);
