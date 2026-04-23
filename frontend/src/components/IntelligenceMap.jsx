// components/IntelligenceMap.jsx
import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { Tooltip } from 'react-tooltip'; // NEW: Imported Tooltip

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

const IntelligenceMap = ({ installations }) => {
  const [activeLayers, setActiveLayers] = useState(['nuclear', 'us_base', 'irgc_base', 'israel_base', 'refinery', 'chokepoint']);

  const colors = { nuclear: '#f1c40f', us_base: '#3498db', israel_base: '#00cec9', irgc_base: '#e74c3c', refinery: '#e67e22', chokepoint: '#9b59b6' };

  return (
    <div style={{ background: '#121212', padding: '1.2rem', borderRadius: '12px', border: '1px solid #333', height: '480px', display: 'flex', flexDirection: 'column' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#888' }}>STRATEGIC ASSETS</span>
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {Object.keys(colors).map(type => (
            <button 
              key={type}
              onClick={() => setActiveLayers(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type])}
              style={{ 
                fontSize: '0.55rem', padding: '4px 6px', cursor: 'pointer', border: 'none', borderRadius: '3px',
                background: activeLayers.includes(type) ? colors[type] : '#333', color: activeLayers.includes(type) ? '#000' : '#888', fontWeight: 'bold'
              }}
            >
              {type.replace('_', ' ').toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, background: '#080808', borderRadius: '8px', overflow: 'hidden', border: '1px solid #222' }}>
        <ComposableMap projection="geoMercator" projectionConfig={{ scale: 1800, center: [48, 32] }}>
          <ZoomableGroup>
            <Geographies geography={geoUrl}>
              {({ geographies }) => geographies.map(geo => (
                <Geography key={geo.rsmKey} geography={geo} fill="#1a1a1a" stroke="#222" strokeWidth={0.5} />
              ))}
            </Geographies>
            
            {installations.filter(i => activeLayers.includes(i.type)).map((site) => (
              <Marker 
                key={site.name} 
                coordinates={[site.lng, site.lat]}
                data-tooltip-id="intel-tooltip" 
                data-tooltip-content={`${site.name.toUpperCase()} — ${site.desc}`} 
              >
                <circle r={5} fill={colors[site.type]} stroke="#fff" strokeWidth={0.5} style={{ outline: 'none', cursor: 'crosshair' }} />
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {/* NEW: The Tooltip Component */}
      <Tooltip id="intel-tooltip" style={{ backgroundColor: '#222', color: '#fff', fontSize: '11px', border: '1px solid #555', zIndex: 1000 }} />
    </div>
  );
};

export default IntelligenceMap;