import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SocialFeed = () => {
  // Add or remove handles here as needed
  const targetAccounts = ['CENTCOM', 'IDF', 'StateDept', 'Khamenei_ir'];
  const [activeFeed, setActiveFeed] = useState(targetAccounts[0]);
  const [liveTweets, setLiveTweets] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch real tweets every time the active tab changes
  useEffect(() => {
    const fetchTweets = async () => {
      setLoading(true);
      setLiveTweets([]); // Clear the old feed while loading the new one
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/social/${activeFeed}`);
        setLiveTweets(res.data || []);
      } catch (err) {
        console.error("Failed to fetch live tweets from backend", err);
      }
      setLoading(false);
    };
    
    fetchTweets();
  }, [activeFeed]);

  return (
    <div style={{ background: '#0a0a0a', padding: '1.2rem', borderRadius: '12px', border: '1px solid #333', height: '100%', display: 'flex', flexDirection: 'column' }}>
      
      {/* --- HEADER & CONTROLS --- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', borderBottom: '1px solid #222', paddingBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', background: '#00ff00', borderRadius: '50%', boxShadow: '0 0 8px #00ff00' }}></div>
          <span style={{ fontSize: '0.9rem', color: '#00ff00', fontWeight: 'bold', letterSpacing: '1px', fontFamily: 'monospace' }}>
            LIVE X INTERCEPTS
          </span>
        </div>
        
        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: '5px' }}>
          {targetAccounts.map((handle) => (
            <button
              key={handle}
              onClick={() => setActiveFeed(handle)}
              style={{
                background: activeFeed === handle ? '#222' : 'transparent',
                color: activeFeed === handle ? '#00ff00' : '#555',
                border: activeFeed === handle ? '1px solid #00ff00' : '1px solid #333',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '0.65rem',
                cursor: 'pointer',
                fontFamily: 'monospace',
                transition: 'all 0.2s'
              }}
            >
              [{handle}]
            </button>
          ))}
        </div>
      </div>

      {/* --- LIVE DATA FEED --- */}
      <div style={{ flex: 1, overflowY: 'auto', paddingRight: '5px' }}>
        {loading ? (
          <div style={{ color: '#00cec9', fontFamily: 'monospace', padding: '20px', textAlign: 'center' }}>
            <div className="blink">{`> ESTABLISHING UPLINK TO @${activeFeed}...`}</div>
            <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '10px' }}>DECRYPTING TIMELINE PACKETS</div>
          </div>
        ) : liveTweets.length > 0 ? (
          liveTweets.map((msg, idx) => (
            <div key={idx} style={{ background: '#111', borderLeft: '3px solid #00cec9', padding: '12px', marginBottom: '10px', fontFamily: 'monospace', borderRadius: '0 8px 8px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.65rem', color: '#00cec9', fontWeight: 'bold' }}>VERIFIED // @{activeFeed}</span>
                <span style={{ fontSize: '0.65rem', color: '#666' }}>{msg.time}</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: '#ddd', lineHeight: '1.4' }}>
                {msg.text}
              </div>
            </div>
          ))
        ) : (
          <div style={{ color: '#444', fontFamily: 'monospace', padding: '20px', textAlign: 'center' }}>
            {`> NO COMMUNIQUÉS FOUND OR SIGNAL LOST`}
          </div>
        )}
      </div>

      <style>{`.blink { animation: blinker 1.5s linear infinite; } @keyframes blinker { 50% { opacity: 0; } }`}</style>
    </div>
  );
};

export default SocialFeed;