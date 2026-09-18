import { useState, useEffect } from "react";
import L from "leaflet";
import {
  Circle,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import { mineCenter, mineSites } from "../../models/mineSites";
import { useGeolocation } from "../../controllers/useGeolocation";
import "leaflet/dist/leaflet.css";

const mineIcon = L.divIcon({
  className: "mine-pin-wrapper",
  html: '<span class="mine-pin"><span></span></span>',
  iconSize: [28, 34],
  iconAnchor: [14, 30],
  popupAnchor: [0, -28],
});

const userIcon = L.divIcon({
  className: "user-pin-wrapper",
  html: '<span class="user-pin"><span></span></span>',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

function RecenterControl({ coordinates }) {
  const map = useMap();

  return (
    <button
      className="locate-control"
      type="button"
      aria-label="Center map on my location"
      title="Center map on my location"
      onClick={() =>
        coordinates && map.flyTo(coordinates, 13, { duration: 1.25 })
      }
    >
      <span aria-hidden="true">+</span>
    </button>
  );
}

function MapResizeHandler() {
  const map = useMap();
  useEffect(() => {
    const timer1 = setTimeout(() => map.invalidateSize(), 100);
    const timer2 = setTimeout(() => map.invalidateSize(), 500);
    const timer3 = setTimeout(() => map.invalidateSize(), 1200);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [map]);
  return null;
}

export function MineMap() {
  const location = useGeolocation();
  const hasLocation = Boolean(location.coordinates);
  const [viewMode, setViewMode] = useState("satellite");

  return (
    <div className="map-frame">
      <MapContainer
        center={mineCenter}
        zoom={14}
        scrollWheelZoom
        className="mine-map"
      >
        <MapResizeHandler />
        {viewMode === "street" ? (
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        ) : (
          <TileLayer
            attribution="Tiles &copy; Esri, Maxar, Earthstar Geographics"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        )}

        <div className="map-layer-switcher" role="group" aria-label="Map view">
          <button
            type="button"
            className={viewMode === "street" ? "is-selected" : ""}
            onClick={() => setViewMode("street")}
          >
            Map
          </button>
          <button
            type="button"
            className={viewMode === "satellite" ? "is-selected" : ""}
            onClick={() => setViewMode("satellite")}
          >
            Satellite
          </button>
        </div>

        {mineSites.map((site) => (
          <Marker key={site.id} position={site.coordinates} icon={mineIcon}>
            <Popup>
              <strong>{site.name}</strong>
              <span>
                {site.region} &middot; {site.status}
              </span>
              <small>{site.leases} monitored leases</small>
            </Popup>
          </Marker>
        ))}

        {hasLocation && (
          <>
            <Circle
              center={location.coordinates}
              radius={location.accuracy || 80}
              pathOptions={{
                color: "#0b7894",
                fillColor: "#38b8c4",
                fillOpacity: 0.14,
                weight: 1,
              }}
            />
            <Marker position={location.coordinates} icon={userIcon}>
              <Popup>Your current location</Popup>
            </Marker>
          </>
        )}

        <RecenterControl coordinates={location.coordinates} />
      </MapContainer>

      <div className="map-caption">
        <span className={`status-dot ${hasLocation ? "is-live" : ""}`}></span>
        {hasLocation
          ? "Live location active"
          : location.status === "denied"
            ? "Location permission needed"
            : "Locating your position..."}
      </div>
    </div>
  );
}
