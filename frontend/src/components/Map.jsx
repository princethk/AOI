import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";
import "leaflet-draw";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

const SearchControl = () => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider,
      style: "bar",
      showMarker: true,
      showPopup: true,
      maxMarkers: 1,
      retainZoomLevel: false,
      animateZoom: true,
      autoClose: true,
      searchLabel: "Enter address or location",
      keepResult: true,
    });

    map.addControl(searchControl);

    // // Explicitly style the search bar placement
    // const searchBar = document.querySelector(".leaflet-control-geosearch");
    // if (searchBar) {
    //  // searchBar.style.position = "absolute";
    //   searchBar.style.right = "10px";
    //  // searchBar.style.top = "10px"; // Above zoom controls
    //   searchBar.style.backgroundColor = "#fff";
    //   searchBar.style.borderRadius = "8px";
    //   searchBar.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.2)";
    //   searchBar.style.padding = "1px";
    //   searchBar.style.width = "300px"; // Adjust width
    //   searchBar.style.height = "40px"; // Adjust height
    //   searchBar.style.fontSize = "14px"; // Font size
    // }

    return () => map.removeControl(searchControl);
  }, [map]);

  return null;
};

const Map = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = mapRef.current;

    if (!map) return;

    // Layer for drawn items
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // Add the draw control
    const drawControl = new L.Control.Draw({
      draw: {
        rectangle: true,
        polygon: true,
        circle: false,
        polyline: false,
        marker: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: drawnItems,
        remove: true,
      },
    });
    map.addControl(drawControl);

    // Handle shape creation
    map.on("draw:created", (e) => {
      const { layer } = e;
      const geometry = layer.toGeoJSON().geometry;

      // Add the drawn layer to the feature group
      drawnItems.addLayer(layer);

      // Send the geometry to the backend
      fetch("http://localhost:5000/api/tiles/intersect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ geometry }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Intersecting Tiles:", data);

          // Show intersecting tiles on the map
          data.forEach((tile) => {
            L.polygon(tile.geometry.coordinates, { color: "red" }).addTo(map);
          });
        })
        .catch((error) =>
          console.error("Error fetching intersecting tiles:", error)
        );
    });
  }, []);

  return (
    <MapContainer
      center={[16.5, 77.5]}
      zoom={6}
      style={{ height: "100vh", width: "100%" }}
      whenCreated={(mapInstance) => {
        mapRef.current = mapInstance;
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* Add the GeoSearch Control */}
      <SearchControl />
    </MapContainer>
  );
};

export default Map;
