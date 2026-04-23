// components/NewsFeed.jsx
import React from 'react';

const NewsFeed = ({ articles }) => {
  return (
    <div style={{ background: '#1e1e1e', padding: '1.5rem', borderRadius: '12px', border: '1px solid #333', height: '450px', overflowY: 'auto' }}>
      
      {/* --- Terminal Header (Moved inside the return) --- */}
      <div style={{ fontSize: '0.6rem', color: '#00ff00', fontFamily: 'monospace', marginBottom: '15px', lineHeight: '1.2', borderBottom: '1px solid #00ff0033', paddingBottom: '5px' }}>
        {`> SIGNAL STRENGTH: OPTIMAL`} <br />
        {`> LAST PACKET RECEIVED: ${new Date().toLocaleTimeString()}`} <br />
        {`> ENCRYPTION: AES-256 ACTIVE`}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
        <div className="pulse" style={{ width: '8px', height: '8px', background: '#ff4757', borderRadius: '50%' }}></div>
        <span style={{ fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', color: '#888' }}>LIVE INTEL STREAM</span>
      </div>
      
      {articles && articles.length > 0 ? (
        articles.map((item) => (
          <div key={item.id} style={{ marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid #222' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6rem', color: '#555', marginBottom: '4px' }}>
              <span>{(item.source || "OSINT").toUpperCase()} // {item.time}</span>
            </div>
            <a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ fontSize: '0.85rem', color: '#3498db', lineHeight: '1.4', textDecoration: 'none', fontWeight: '500', display: 'block' }}
              onMouseOver={(e) => e.target.style.color = '#54a0ff'}
              onMouseOut={(e) => e.target.style.color = '#3498db'}
            >
              {item.headline}
            </a>
          </div>
        ))
      ) : (
        <div style={{color: '#444', fontSize: '0.8rem', fontFamily: 'monospace'}}>
          {`> NO INCOMING DATA...`} <br />
          {`> RE-ESTABLISHING UPLINK...`}
        </div>
      )}

      <style>{`
        .pulse { animation: pulse-red 2s infinite; }
        @keyframes pulse-red {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 71, 87, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(255, 71, 87, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 71, 87, 0); }
        }
      `}</style>
    </div>
  );
};

export default NewsFeed;