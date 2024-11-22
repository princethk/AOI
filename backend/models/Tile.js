const mongoose = require('mongoose');

const TileSchema = new mongoose.Schema({
  name: String,
  geometry: {
    type: { type: String, enum: ['Polygon'], required: true },
    coordinates: { type: [[[Number]]], required: true },
  },
});

module.exports = mongoose.model('Tile', TileSchema);
