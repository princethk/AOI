# Leaflet Map with Search and AOI Functionality

This project is a web application that displays an interactive map where users can search for locations and optionally define Areas of Interest (AOIs) using shapes like rectangles or polygons. It uses React, Leaflet, and various Leaflet plugins for functionality like drawing and location search.

---

## Features

- **Interactive Map**:
  - Built using **Leaflet** and rendered with **React-Leaflet**.
  - Displays a base map sourced from OpenStreetMap tiles.

- **Search Functionality**:
  - Allows users to search for a location by name or address.
  - Zooms to the searched location with a marker.

- **Area of Interest (AOI)**:
  - Users can draw shapes (rectangles, polygons) on the map to define areas of interest.
  - Sends AOI data to the backend to fetch intersecting tiles.

---

## Technologies Used

### Frontend:
- **React**: For building the user interface.
- **React-Leaflet**: To integrate Leaflet maps into React.
- **Leaflet**: For interactive mapping.
- **Leaflet-Geosearch**: For search functionality.
- **Leaflet-Draw**: For adding drawing controls .

### Backend:
- **Node.js**: For handling API requests.
- **Express**: For building the backend server.
- **MongoDB**: To store tile data (metadata about map tiles).

---

## Installation

### Prerequisites:
Ensure you have the following installed on your system:
- Node.js and npm
- MongoDB (storing data about tiles)
- Git 

---

### Steps to Run:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo-name.git
   cd your-repo-name
   ```

2. **Install Dependencies**:

   Navigate to the `frontend` directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```

   Navigate to the `backend` directory and install dependencies:
   ```bash
   cd ../backend
   npm install
   ```

3. **Run Backend**:
   Start the backend server:
   ```bash
   npm start
   ```
   The server will start on `http://localhost:5000`.

4. **Run Frontend**:
   Start the React development server:
   ```bash
   cd ../frontend
   npm start
   ```
   The application will be accessible at `http://localhost:3000`.

---

## Project Structure

### Frontend (`/frontend`)

```
/frontend
├── public
│   └── index.html         # Main HTML file
├── src
│   ├── components
│   │   └── Map.jsx        # Map component with Leaflet integration
│   ├── App.js             # Main application component
│   ├── index.js           # Entry point for React app
│   └── styles.css         # Optional CSS file for styling
└── package.json           # Frontend dependencies
```

### Backend (`/backend`)

```
/backend
├── models
│   └── Tile.js            # MongoDB schema for tile metadata
├── routes
│   └── tiles.js           # API routes for handling tile requests
├── server.js              # Main server file
└── package.json           # Backend dependencies
```

---

## API Endpoints

### Base URL: `http://localhost:5000/api`
   
---

## Future Enhancements

- **Styling**:
  - Enhance the UI/UX for better usability.
  - Add a custom theme to match branding.

- **Dynamic Data**:
  - Integrate with live tile data sources.

- **Backend Enhancements**:
  - Implement caching for frequently accessed tiles.

---

## Contributing

Contributions are welcome! Feel free to fork the repository and create a pull request.

