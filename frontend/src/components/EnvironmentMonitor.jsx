import React from 'react';

const getAqiColor = (aqi) => {
  if (aqi <= 50) return '#2ecc71'; 
  if (aqi <= 100) return '#f1c40f'; 
  if (aqi <= 150) return '#e67e22'; 
  if (aqi <= 200) return '#e74c3c'; 
  if (aqi <= 300) return '#9b59b6'; 
  return '#8e44ad'; 
};

const EnvironmentMonitor = ({ data }) => {
  // SAFETY CHECK 1: If data hasn't loaded yet, return an empty box instead of crashing
  if (!data || Object.keys(data).length === 0) {
    return (
      <div style={{ background: '#121212', padding: '1.2rem', borderRadius: '12px', border: '1px solid #333', marginTop: '20px', color: '#666', fontFamily: 'monospace' }}>
        AWAITING ATMOSPHERIC TELEMETRY...
      </div>
    );
  }

  // SAFETY CHECK 2: Safely extract variables so .includes() or .toLocaleString() never crash
  const statusText = data.status || "SENSOR UPLINK FAILED";
  const isCritical = statusText.includes('CRITICAL');
  const co2Spike = data.regional_co2_spike_tons || 0;
  const citiesList = data.cities || [];

  return (
    <div style={{ background: '#121212', padding: '1.2rem', borderRadius: '12px', border: '1px solid #333', marginTop: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', borderBottom: '1px solid #222', paddingBottom: '10px' }}>
        <span style={{ fontSize: '0.9rem', color: '#00cec9', fontWeight: 'bold', letterSpacing: '1px' }}>
          ATMOSPHERIC & EMISSIONS TELEMETRY
        </span>
        <span style={{ fontSize: '0.7rem', color: isCritical ? '#e74c3c' : '#888' }}>
          {statusText.toUpperCase()}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ fontSize: '0.7rem', color: '#666', marginBottom: '5px' }}>REGIONAL AIR QUALITY INDEX (AQI)</div>
          
          {citiesList.length === 0 ? (
            <div style={{ color: '#444', fontSize: '0.8rem' }}>NO SENSOR DATA</div>
          ) : (
            citiesList.map((city, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0a0a0a', padding: '8px', borderRadius: '6px' }}>
                <span style={{ fontSize: '0.8rem', color: '#ccc' }}>{city.city}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '0.7rem', color: '#888' }}>{city.level}</span>
                  <span style={{ background: getAqiColor(city.aqi), color: '#000', fontWeight: 'bold', padding: '2px 8px', borderRadius: '4px', fontSize: '0.85rem', minWidth: '40px', textAlign: 'center' }}>
                    {city.aqi}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{ background: '#1a1010', border: '1px solid #4a1c1c', borderRadius: '8px', padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ fontSize: '0.7rem', color: '#e74c3c', letterSpacing: '1px', marginBottom: '10px' }}>CONFLICT CARBON IMPACT (24H)</div>
          <div style={{ fontSize: '2.5rem', color: '#ff4757', fontWeight: 'bold', textShadow: '0 0 10px rgba(255, 71, 87, 0.4)' }}>
            +{co2Spike.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '5px' }}>METRIC TONS CO2 (ESTIMATED)</div>
        </div>

      </div>
    </div>
  );
};

export default EnvironmentMonitor;