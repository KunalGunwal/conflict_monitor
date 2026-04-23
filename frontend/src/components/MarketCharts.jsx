// components/MarketCharts.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

// Custom Terminal-Style Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const isAnomaly = label === "2026-03-02";
    
    return (
      <div style={{ 
        background: 'rgba(10, 10, 10, 0.95)', 
        border: `1px solid ${isAnomaly ? '#ff4757' : payload[0].color}`, 
        padding: '12px', 
        borderRadius: '6px', 
        fontFamily: 'monospace', 
        boxShadow: `0 0 15px ${isAnomaly ? 'rgba(255, 71, 87, 0.4)' : 'rgba(0,0,0,0.5)'}` 
      }}>
        <div style={{ color: isAnomaly ? '#ff4757' : '#888', marginBottom: '5px', fontSize: '0.75rem', fontWeight: isAnomaly ? 'bold' : 'normal' }}>
          T-MINUS: {label} {isAnomaly && "War Started"}
        </div>
        <div style={{ color: payload[0].color, fontWeight: 'bold', fontSize: '1.1rem' }}>
          {payload[0].name}: {payload[0].value.toLocaleString()}
        </div>
      </div>
    );
  }
  return null;
};

const MarketCharts = ({ history }) => {
  if (!history || history.length === 0) {
    return <div className="terminal-text" style={{ color: '#666', padding: '20px' }}>AWAITING FINANCIAL TELEMETRY...</div>;
  }

  // Configuration for all 10 of your strategic financial indices
  const chartConfigs = [
    { key: 'gold', name: 'GOLD (GLD)', color: '#f1c40f', domain: ['auto', 'auto'] },
    { key: 'silver', name: 'SILVER (SLV)', color: '#e0e0e0', domain: ['auto', 'auto'] },
    { key: 'oil', name: 'CRUDE OIL (USO)', color: '#e67e22', domain: ['auto', 'auto'] },
    { key: 'inr', name: 'USD / INR FOREX', color: '#2ecc71', domain: ['auto', 'auto'] },
    { key: 'sp500', name: 'S&P 500', color: '#3498db', domain: ['auto', 'auto'] },
    //{ key: 'nasdaq', name: 'NASDAQ', color: '#00cec9', domain: ['auto', 'auto'] },
    { key: 'nifty', name: 'NIFTY 50', color: '#9b59b6', domain: ['auto', 'auto'] },
    { key: 'sensex', name: 'BSE SENSEX', color: '#fd79a8', domain: ['auto', 'auto'] },
    { key: 'vix', name: 'VOLATILITY (VIX)', color: '#ff4757', domain: [10, 'auto'] },
    { key: 'defense', name: 'DEFENSE (ITA)', color: '#fdcb6e', domain: ['auto', 'auto'] }
  ];

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
      gap: '20px' 
    }}>
      {chartConfigs.map((config) => (
        <div key={config.key} className="glow-border" style={{ 
          background: 'linear-gradient(145deg, #0a0a0a 0%, #111 100%)', 
          padding: '15px', 
          borderRadius: '12px', 
          border: '1px solid #222',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle background glow matching the chart line */}
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '60px', height: '60px', background: config.color, filter: 'blur(40px)', opacity: 0.1 }}></div>

          <div style={{ 
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
            marginBottom: '15px', borderBottom: '1px solid #222', paddingBottom: '8px' 
          }}>
            <span className="terminal-text" style={{ fontSize: '0.8rem', color: config.color, fontWeight: 'bold' }}>
              {config.name}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: config.color, boxShadow: `0 0 5px ${config.color}` }}></div>
              <span className="terminal-text" style={{ fontSize: '0.6rem', color: '#666' }}>LIVE</span>
            </div>
          </div>
          
          <div style={{ height: '180px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis 
                  dataKey="Date" 
                  stroke="#555" 
                  tick={{ fill: '#555', fontSize: 10, fontFamily: 'monospace' }} 
                  tickLine={false}
                  axisLine={false}
                  minTickGap={20}
                />
                <YAxis 
                  domain={config.domain} 
                  stroke="#555" 
                  tick={{ fill: '#555', fontSize: 10, fontFamily: 'monospace' }} 
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => val.toLocaleString()}
                />
                <Tooltip content={<CustomTooltip />} />
                
                {/* THE EVENT MARKER */}
                <ReferenceLine 
                  x="2026-02-28" 
                  stroke="#ff4757" 
                  strokeDasharray="4 4" 
                  strokeWidth={1.5}
                  label={{ 
                    position: 'insideTopLeft', 
                    value: 'ANOMALY', 
                    fill: '#ff4757', 
                    fontSize: 9, 
                    fontFamily: 'monospace',
                    textAnchor: 'start'
                  }} 
                />

                <Line 
                  type="monotone" 
                  dataKey={config.key} 
                  name={config.name.split(' ')[0]} 
                  stroke={config.color} 
                  strokeWidth={2.5} 
                  dot={false} 
                  activeDot={{ r: 6, fill: config.color, stroke: '#000', strokeWidth: 2 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarketCharts;