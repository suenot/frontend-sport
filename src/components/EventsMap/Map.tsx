import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Event, Stage } from '../EventsList/types';
import L from 'leaflet';
import { Box } from '@chakra-ui/react';

// Custom CSS to hide the flag and ensure full height
const customStyle = `
  .leaflet-control-attribution .leaflet-attribution-flag {
    display: none !important;
  }
  .leaflet-container {
    height: 100% !important;
    width: 100% !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
  }
`;

interface MapProps {
  events: Event[];
  onEventClick?: (eventId: string) => void;
  center?: [number, number];
  zoom?: number;
}

// Create custom icons for events and stages
const createIcon = (color: string) => new L.Icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: `marker-${color}` // You can add CSS to colorize markers
});

const eventIcon = createIcon('blue');
const stageIcon = createIcon('red');
const checkpointIcon = createIcon('green');

export const Map: React.FC<MapProps> = ({ 
  events, 
  onEventClick,
  center = [55.7558, 37.6173],
  zoom = 10 
}) => {
  const mapRef = useRef<L.Map>(null);

  useEffect(() => {
    // Fix for marker icons in Leaflet with Next.js
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: '/images/marker-icon.png',
      iconRetinaUrl: '/images/marker-icon-2x.png',
      shadowUrl: '/images/marker-shadow.png',
    });

    // Add custom style to hide the flag and ensure full height
    const style = document.createElement('style');
    style.textContent = customStyle;
    document.head.appendChild(style);

    // Invalidate map size after mounting
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current?.invalidateSize();
      }, 100);
    }

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Box 
      position="relative" 
      h="100%" 
      w="100%" 
      sx={{
        '& .leaflet-container': {
          height: '100% !important',
          width: '100% !important',
        }
      }}
    >
      <MapContainer
        ref={mapRef}
        center={center}
        zoom={zoom}
        style={{ 
          height: '100%', 
          width: '100%', 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {events.map((event) => {
          // Get all stages with coordinates
          const stages = event.stages?.filter(stage => stage.location?.coordinates) || [];
          
          return (
            <React.Fragment key={event.id}>
              {/* Event marker */}
              {event.location?.coordinates && (
                <Marker
                  position={[event.location.coordinates.lat, event.location.coordinates.lng]}
                  icon={eventIcon}
                  eventHandlers={{
                    click: () => onEventClick?.(event.id),
                  }}
                />
              )}

              {/* Stage markers and routes */}
              {stages.map((stage) => {
                if (!stage.location?.coordinates) return null;

                return (
                  <React.Fragment key={stage.id}>
                    {/* Main stage marker */}
                    <Marker
                      position={[stage.location.coordinates.lat, stage.location.coordinates.lng]}
                      icon={stageIcon}
                      eventHandlers={{
                        click: () => onEventClick?.(event.id),
                      }}
                    />

                    {/* Route checkpoints */}
                    {stage.location.route?.map((checkpoint, index) => (
                      <Marker
                        key={`${stage.id}-checkpoint-${index}`}
                        position={[checkpoint.lat, checkpoint.lng]}
                        icon={checkpointIcon}
                        eventHandlers={{
                          click: () => onEventClick?.(event.id),
                        }}
                      />
                    ))}
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          );
        })}
      </MapContainer>
    </Box>
  );
};
