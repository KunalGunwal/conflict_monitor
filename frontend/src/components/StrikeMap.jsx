// components/StrikeMap.jsx
import React from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { Tooltip } from 'react-tooltip'; // NEW: Imported Tooltip

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

const StrikeMap = ({ strikes }) => {
  return (
    <div style={{ background: '#121212', padding: '1.2rem', borderRadius: '12px', border: '1px solid #ff475744', height: '480px', display: 'flex', flexDirection: 'column' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
        <span style={{ fontSize: '0.9rem', color: '#ff4757', fontWeight: 'bold', letterSpacing: '1px' }}>
          KINETIC EVENTS RADAR
        </span>
        <span style={{ fontSize: '0.6rem', color: '#666', fontFamily: 'monospace' }}>SCANNING...</span>
      </div>
      
      <div style={{ flex: 1, borderRadius: '8px', overflow: 'hidden', border: '1px solid #222', background: '#050000' }}>
        <ComposableMap projection="geoMercator" projectionConfig={{ scale: 1800, center: [48, 32] }}>
          <ZoomableGroup>
            <Geographies geography={geoUrl}>
              {({ geographies }) => geographies.map(geo => (
                <Geography key={geo.rsmKey} geography={geo} fill="#110505" stroke="#331111" strokeWidth={0.5} />
              ))}
            </Geographies>
            
            {strikes.map((strike, i) => (
              <Marker 
                key={i} 
                coordinates={[strike.lng, strike.lat]}
                data-tooltip-id="strike-tooltip"
                data-tooltip-content={`[${strike.time}] ${strike.location.toUpperCase()}: ${strike.severity} Impact Detected`}
              >
                <circle r={12} fill="#ff4757" fillOpacity={0.2} className="ping" style={{ pointerEvents: 'none' }} />
                <circle r={4} fill="#ff4757" stroke="#fff" strokeWidth={1} style={{ outline: 'none', cursor: 'crosshair' }} />
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {/* NEW: The Tooltip Component */}
      <Tooltip id="strike-tooltip" style={{ backgroundColor: '#ff4757', color: '#fff', fontSize: '11px', fontWeight: 'bold', zIndex: 1000 }} />

      <style>{`
        .ping { animation: strike-pulse 1.5s ease-out infinite; }
        @keyframes strike-pulse {
          0% { r: 4; opacity: 1; }
          100% { r: 25; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default StrikeMap;