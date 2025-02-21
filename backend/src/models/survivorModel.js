const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const survivorSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  lastLocation: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  },
  inventory: [{
    item: { type: Schema.Types.ObjectId, ref: 'Item' },
    quantity: { type: Number, required: true, default: 0 }
  }],
  infected: { type: Boolean, default: false }
}, { strict: true });

module.exports = mongoose.model('Survivor', survivorSchema);