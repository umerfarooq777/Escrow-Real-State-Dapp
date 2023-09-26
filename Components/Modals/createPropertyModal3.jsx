import React, { useState, useEffect,useRef } from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';

const defaultPolygon = [
  [51.505, -0.09],
  [51.51, -0.1],
  [51.51, -0.12],
];

const PolygonMapLayers = () => {
  
  const [map, setMap] = useState(null);
  const [editableLayers, setEditableLayers] = useState(null);

  useEffect(() => {
    if (map && editableLayers) {
      map.on('draw:created', (e) => {
        const layer = e.layer;
        editableLayers.addLayer(layer);
      });

      map.on('draw:edited', (e) => {
        const layers = e.layers;
        const coordinates = layers.getLayers().map((layer) => layer.getLatLng());
        console.log(coordinates); // You can save the edited coordinates in state or send them to a server
      });
    }
  }, [map, editableLayers]);

  useEffect(() => {
    if (editableLayers) {
      // Add a default polygon to the map
      const polygon = L.polygon(defaultPolygon).addTo(editableLayers);
      map.fitBounds(polygon.getBounds());
    }
  }, [editableLayers, map]);

  return (
    <div>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: '500px', width: '100%' }}
        whenCreated={(m) => setMap(m)}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <FeatureGroup ref={(ref) => setEditableLayers(ref)} />
        <EditControl
          position="topright"
          draw={{
            circle: false,
            circlemarker: false,
            marker: false,
            polyline: false,
            polygon: {
              allowIntersection: false,
              showArea: true,
            },
          }}
        />
      </MapContainer>
    </div>
  );
};

export default PolygonMapLayers;
