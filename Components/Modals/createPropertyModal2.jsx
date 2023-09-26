import React, { useState } from 'react';
import { MapContainer, TileLayer, FeatureGroup, Polygon, useMap } from 'react-leaflet';
import 'leaflet-draw/dist/leaflet.draw.css';
import { EditControl } from 'react-leaflet-draw';

function EditablePolygonMap() {
  const [latlngs, setLatlngs] = useState([]);
  const [editable, setEditable] = useState(true);

  const handleEdit = (e) => {
    // const layer = e.layers.toGeoJSON();
    console.log("EData",e);
    const layer = e.layer;
    const newLatlngs = layer._latlngs[0];
    console.log("EData",newLatlngs);
    setLatlngs(newLatlngs);
  };
  const handleEditVertex = (e) => {
    console.log("EData",e);
    const poly = e.poly;
    const newLatlngs = poly._latlngs[0];
    console.log("EData",newLatlngs);
    setLatlngs(newLatlngs);
  };

  const EditableControl = () => {
    const map = useMap();
    if (editable) {
      return (
        <EditControl
          position="topright"
          draw={{
            rectangle: false,
            circle: false,
            marker: false,
            polyline: false,
          }}
          onEditVertex={handleEditVertex}
          onCreated={handleEdit}
          onEdited={handleEdit}
        />
      );
    }
    return null;
  };

  return (
    <div>
      <button onClick={() => setEditable(!editable)}>
        {editable ? 'Disable Editing' : 'Enable Editing'}
      </button>
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <FeatureGroup>
          <EditableControl />
          <Polygon positions={latlngs} />
        </FeatureGroup>
      </MapContainer>
      <div>
        <h3>Coordinates:</h3>
        <pre>{JSON.stringify(latlngs, null, 2)}</pre>
      </div>
    </div>
  );
}

export default EditablePolygonMap;
