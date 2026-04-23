// components/StatCards.jsx
import React from 'react';

const StatCards = ({ current = {} }) => {
  // We kept all 6 items and safely formatted them so undefined data won't crash the app
  const stats = [
    { label: "Gold", val: current?.gold ? `$${current.gold.toLocaleString()}` : '---', color: "#f1c40f", ticker: "GC=F" },
    { label: "Silver", val: current?.silver ? `$${current.silver}` : '---', color: "#e0e0e0", ticker: "SI=F" },
    { label: "Crude Oil", val: current?.oil ? `$${current.oil}` : '---', color: "#e67e22", ticker: "CL=F" },
    { label: "USD/INR", val: current?.inr ? `₹${current.inr}` : '---', color: "#2ecc71", ticker: "INR=X" },
    { label: "S&P 500", val: current?.sp500 ? current.sp500.toLocaleString() : '---', color: "#3498db", ticker: "^GSPC" },
    { label: "NIFTY 50", val: current?.nifty ? current.nifty.toLocaleString() : '---', color: "#9b59b6", ticker: "^NSEI" }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', marginBottom: '20px' }}>
      {stats.map((s, i) => (
        <div key={i} className="glow-border" style={{ 
          background: 'linear-gradient(145deg, #0a0a0a 0%, #151515 100%)', 
          padding: '18px', 
          borderRadius: '8px', 
          border: '1px solid #222',
          borderTop: `3px solid ${s.color}`,
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
        }}>
          
          {/* Subtle Background Neon Glow */}
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '60px', height: '60px', background: s.color, filter: 'blur(35px)', opacity: 0.15 }}></div>

          {/* Header Row: Label and Ticker */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.7rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'monospace' }}>
              {`// ${s.label}`}
            </span>
            <span style={{ fontSize: '0.6rem', color: s.color, opacity: 0.7, fontFamily: 'monospace' }}>
              [{s.ticker}]
            </span>
          </div>
          
          {/* Main Value */}
          <div style={{ fontSize: '1.6rem', fontWeight: '800', color: s.color, textShadow: `0 0 12px ${s.color}40`, fontFamily: 'monospace' }}>
            {s.val}
          </div>

          {/* Live Data Aesthetic Bar */}
          <div style={{ marginTop: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ height: '2px', width: '100%', background: '#222', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '100%', background: `linear-gradient(90deg, transparent, ${s.color})`, opacity: 0.5 }}></div>
            </div>
            <span style={{ fontSize: '0.55rem', color: '#666', fontFamily: 'monospace', letterSpacing: '1px' }}>LIVE</span>
          </div>

        </div>
      ))}
    </div>
  );
};

export default StatCards;