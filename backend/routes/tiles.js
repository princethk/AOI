const express = require('express');
const Tile = require('../models/Tile');
const router = express.Router();

router.post('/intersect', async (req, res) => {
  try {
    const { geometry } = req.body;

    const tiles = await Tile.find({
      geometry: {
        $geoIntersects: {
          $geometry: geometry,
        },
      },
    });

    res.json(tiles);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
