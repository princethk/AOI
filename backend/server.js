const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Dummy tiles data
const tiles = [
  {
    id: 1,
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [77.0, 16.0],
          [78.0, 16.0],
          [78.0, 17.0],
          [77.0, 17.0],
          [77.0, 16.0],
        ],
      ],
    },
  },
  // Add more tiles if needed
];

app.post("/api/tiles/intersect", (req, res) => {
  const { geometry } = req.body;

  // Logic to find intersecting tiles
  const intersectingTiles = tiles.filter((tile) => {
    // Example intersection logic (replace with proper GIS intersection check)
    return true; // Assuming all tiles intersect for demo purposes
  });

  res.json(intersectingTiles);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
