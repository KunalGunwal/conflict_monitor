
# 🌐 Geopolitical War Desk

> A real-time, Open Source Intelligence (OSINT) and global financial telemetry dashboard. Built to monitor geopolitical escalations, kinetic events, market volatility, and tactical atmospheric data in a single "Palantir-style" interface.

## 🚀 System Features

* **Algorithmic DEFCON Matrix:** Calculates a live global threat level (DEFCON 2–5) by cross-referencing real-time financial panic (VIX) with the volume of active kinetic strikes.
* **Live Financial Telemetry:** Real-time 30-day historical data streaming directly from Wall Street (Yahoo Finance) for Crude Oil, Gold, USD/INR, S&P 500, NASDAQ, NIFTY 50, BSE Sensex, Volatility (VIX), and Defense Equities (ITA).
* **Tactical OSINT Feed:** Aggregates live news and kinetic event reports (drone/missile strikes) using stealth-mode RSS web scrapers that bypass anti-bot firewalls.
* **X/Twitter Intercepts:** Bypasses X's API restrictions using RapidAPI proxies to stream real-time, verified communiqués from strategic defense and government accounts (e.g., CENTCOM, IDF).
* **UAV Operability & Weather:** Uses the Open-Meteo satellite API to track wind speeds and visibility over strategic targets, calculating live drone/UAV flight capabilities.
* **Military-Grade UI:** Features a custom CSS architecture utilizing glassmorphism, CRT monitor scanline overlays, neon tactical coloring, and bespoke scrollbars.

---

## 🛠️ Architecture & Tech Stack

**Frontend (The Terminal)**
* **Framework:** React.js (Vite)
* **Data Visualization:** Recharts (Customized with terminal tooltips and event anomaly markers)
* **HTTP Client:** Axios
* **Styling:** Custom CSS (Grid/Bento-box layout, Cyberpunk aesthetics)

**Backend (The Intelligence Engine)**
* **Framework:** FastAPI (Python)
* **Market Data:** `yfinance`, `pandas`
* **Web Scraping:** `feedparser`, `requests` (with Chrome masking headers)
* **External APIs:** * *WAQI* (World Air Quality Index)
    * *Open-Meteo* (Live Satellite Weather)
    * *RapidAPI / Twitter154* (X Timeline Scraper)

---

## ⚙️ Installation & Setup

### 1. Prerequisites
* [Node.js](https://nodejs.org/) (v16+)
* [Python](https://www.python.org/) (v3.8+)

### 2. Initialize the Backend (Python)
Open a terminal, navigate to your backend directory, and install the required intelligence modules:
```bash
# Install dependencies
pip install fastapi uvicorn requests feedparser yfinance pandas

# Boot the intelligence server
uvicorn main:app --reload
```
*The backend will boot up on `http://127.0.0.1:8000`.*

### 3. Initialize the Frontend (React)
Open a second terminal window, navigate to your React project directory, and install the frontend dependencies:
```bash
# Install dependencies
npm install
npm install axios recharts

# Initiate the command interface
npm run dev
```
*The UI will boot up on `http://localhost:5173` (or similar).*

---

## 🔑 Required API Keys & Proxies

To make the dashboard 100% operational, you must inject your own API keys into the Python backend scripts:

1.  **X/Twitter Intercepts (`social.py`)**
    * Create a free account on [RapidAPI.com](https://rapidapi.com/).
    * Subscribe to the **"Twitter154" (The Old Bird)** API free tier.
    * Paste your `X-RapidAPI-Key` into the `RAPID_API_KEY` variable inside `social.py`.
2.  **Atmospheric Telemetry (`environment.py`)**
    * Get a free token from the [World Air Quality Index (WAQI) Data Platform](https://aqicn.org/data-platform/token/).
    * Paste your token into the `WAQI_TOKEN` variable inside `environment.py` (Default is `"demo"`).

*(Note: Market data via `yfinance` and weather data via `Open-Meteo` are entirely free and require no keys).*

---

## 📂 Project Structure

```text
/geopolitical-war-desk
├── /backend
│   ├── main.py              # Master FastAPI router
│   ├── intelligence.py      # Yahoo Finance (yfinance) market scraper
│   ├── strikes.py           # Stealth RSS scraper for kinetic events
│   ├── news.py              # OSINT global news aggregator
│   ├── environment.py       # WAQI & Open-Meteo atmospheric engine
│   └── social.py            # RapidAPI X/Twitter intercept proxy
│
├── /frontend/src
│   ├── App.jsx              # Master layout and global state engine
│   ├── index.css            # Cyberpunk global stylesheet & CRT scanlines
│   └── /components
│       ├── StatCards.jsx         # High-level financial pulse
│       ├── MarketCharts.jsx      # Recharts historical telemetry
│       ├── EnvironmentMonitor.jsx# Weather, AQI, and Algorithmic DEFCON
│       ├── SocialFeed.jsx        # X/Twitter live timeline UI
│       ├── NewsFeed.jsx          # Scrolling news ticker
│       ├── IntelligenceMap.jsx   # Static asset map
│       └── StrikeMap.jsx         # Live kinetic event map
```

---

## ⚠️ Disclaimer
**For Educational and Developer Portfolio Purposes Only.** This project is an advanced demonstration of React data-binding, Python web scraping, and third-party API integration. It aggregates publicly available OSINT data and financial metrics. It is not intended for actual tactical, military, or financial trading decisions.
