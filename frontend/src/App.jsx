import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css'; // CRITICAL: This imports the new CSS we just wrote

// --- Component Imports (Your existing files) ---
import StatCards from './components/StatCards';
import IntelligenceMap from './components/IntelligenceMap';
import StrikeMap from './components/StrikeMap';
import NewsFeed from './components/NewsFeed';
import MarketCharts from './components/MarketCharts';
import EnvironmentMonitor from './components/EnvironmentMonitor';
import SocialFeed from './components/SocialFeed';

function App() {
  const [data, setData] = useState({ 
    current: {}, history: [], installations: [], news: [], strikes: [], environment: {} 
  });
  const [loading, setLoading] = useState(true);
  
  
  const [systemTime, setSystemTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }) + " ZULU");
  useEffect(() => {
    const timer = setInterval(() => {
      setSystemTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch your existing APIs
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [intelRes, mapRes, newsRes, strikeRes, envRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/intelligence').catch(() => ({ data: {} })),
          axios.get('http://127.0.0.1:8000/api/installations').catch(() => ({ data: [] })),
          axios.get('http://127.0.0.1:8000/api/news').catch(() => ({ data: [] })),
          axios.get('http://127.0.0.1:8000/api/strikes').catch(() => ({ data: [] })),
          axios.get('http://127.0.0.1:8000/api/environment').catch(() => ({ data: {} }))
        ]);
        
        setData({ 
          current: intelRes.data.current || {}, 
          history: intelRes.data.history || [], 
          installations: mapRes.data || [],
          news: newsRes.data || [],
          strikes: strikeRes.data || [],
          environment: envRes.data || {}
        });
        setLoading(false);
      } catch (error) {
        console.error("Fetch Error:", error);
        setLoading(false); 
      }
    };
    fetchAllData();
  }, []);

  // --- BOOT SEQUENCE SCREEN ---
  if (loading) {
    return (
      <div style={{ background: '#050505', color: '#00cec9', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div className="terminal-text" style={{ border: '1px solid #00cec9', padding: '30px', boxShadow: '0 0 20px rgba(0, 206, 201, 0.2)', fontSize: '1.2rem' }}>
          <p>{`> UPLINK ESTABLISHED...`}</p>
          <p>{`> DECRYPTING SATELLITE TELEMETRY...`}</p>
          <p>{`> COMPILING OSINT FEEDS...`}</p>
          <p className="blink" style={{ marginTop: '15px' }}>{`> INITIALIZING WAR DESK...`}</p>
        </div>
        <style>{`.blink { animation: blinker 1s linear infinite; } @keyframes blinker { 50% { opacity: 0; } }`}</style>
      </div>
    );
  }

  // --- MASTER DASHBOARD LAYOUT ---
  return (
    <div style={{ 
      padding: '1.5rem', 
      backgroundColor: '#050505', 
      minHeight: '100vh', 
      backgroundImage: 'radial-gradient(circle at 50% 0%, #0a1118 0%, #050505 50%)', // Subtle cyan glow
      position: 'relative'
    }}>
      
      {/* The CRT Monitor Scanlines */}
      <div className="scanlines"></div> 

      {/* --- COMMAND HEADER --- */}
      <header style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        marginBottom: '1.5rem', borderBottom: '1px solid #333', paddingBottom: '10px' 
      }}>
        <div style={{ borderLeft: '6px solid #00cec9', paddingLeft: '15px' }}>
          <h1 style={{ margin: 0, fontSize: '2.2rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#fff', textShadow: '0 0 10px rgba(0,206,201,0.3)' }}>
            Geopolitical War Desk
          </h1>
          <div className="terminal-text" style={{ fontSize: '0.85rem', color: '#00cec9', marginTop: '5px' }}>
            GLOBAL THREAT MONITOR 
          </div>
        </div>
        <div className="terminal-text" style={{ textAlign: 'right', color: '#00cec9' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{systemTime}</div>
          <div style={{ fontSize: '0.7rem', letterSpacing: '2px' }}>SYS.OP.NOMINAL</div>
        </div>
      </header>

      {/* --- TIER 1: HIGH-LEVEL PULSE --- */}
      <div style={{ marginBottom: '1.5rem' }}>
        <StatCards current={data.current} />
      </div>
      
      {/* --- TIER 2: TACTICAL THEATER (Grid) --- */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 320px 1.3fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div style={{ height: '500px', borderRadius: '12px' }} className="glow-border">
          <IntelligenceMap installations={data.installations} />
        </div>
        
        <div style={{ height: '500px', borderRadius: '12px' }} className="glow-border">
          <NewsFeed articles={data.news} />
        </div>
        
        <div style={{ height: '500px', borderRadius: '12px' }} className="glow-border">
          <StrikeMap strikes={data.strikes} />
        </div>
      </div>

      {/* --- TIER 3: FINANCIAL TELEMETRY --- */}
      <div style={{ marginBottom: '1.5rem', padding: '15px', background: '#0a0a0a', borderRadius: '12px' }} className="glow-border">
        <div className="terminal-text" style={{ fontSize: '0.9rem', color: '#888', borderBottom: '1px solid #222', paddingBottom: '5px', marginBottom: '15px' }}>
          HISTORICAL MARKET IMPACT
        </div>
        <MarketCharts history={data.history} />
      </div>
      
      {/* --- TIER 4: SECONDARY INTEL --- */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', height: '400px', marginBottom: '20px' }}>
        <div style={{ height: '100%', borderRadius: '12px' }} className="glow-border">
          <EnvironmentMonitor data={data.environment} />
        </div>
        <div style={{ height: '100%', borderRadius: '12px' }} className="glow-border">
          <SocialFeed />
        </div>
      </div>
      
    </div>
  );
}

export default App;