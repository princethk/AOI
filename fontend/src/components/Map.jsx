import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import L from 'leaflet';
import 'leaflet-draw';

const Map = () => {
  const mapRef = useRef();

  useEffect(() => {
    const map = mapRef.current;

    if (!map) return;

    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      draw: {
        polyline: false,
        circle: false,
        circlemarker: false,
        marker: false,
      },
      edit: {
        featureGroup: drawnItems,
      },
    });

    map.addControl(drawControl);

    map.on('draw:created', (e) => {
      const { layer } = e;
      const geometry = layer.toGeoJSON().geometry;

      // Add the drawn layer to the map
      drawnItems.addLayer(layer);

      // Send the AOI (geometry) to the backend
      fetch('http://localhost:5000/api/tiles/intersect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ geometry }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('Intersecting Tiles:', data);

          // Add intersecting tiles as red polygons
          data.forEach((tile) => {
            L.polygon(tile.geometry.coordinates, { color: 'red' }).addTo(map);
          });
        })
        .catch((error) => console.error('Error fetching tiles:', error));
    });
  }, []);

  return (
    <MapContainer
      center={[16.5, 77.5]}
      zoom={6}
      style={{ height: '100vh', width: '100%' }}
      whenCreated={(mapInstance) => {
        mapRef.current = mapInstance;
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
    </MapContainer>
  );
};

export default Map;
