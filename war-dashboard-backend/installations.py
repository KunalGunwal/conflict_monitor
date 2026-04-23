# installations.py
# Source: Strategic mapping of Middle East military and energy infrastructure (2026)

INSTALLATIONS = [
    # --- NUCLEAR SITES (IRAN) ---
    {"name": "Natanz", "type": "nuclear", "lat": 33.72, "lng": 51.72, "desc": "Main Uranium Enrichment Facility"},
    {"name": "Fordow", "type": "nuclear", "lat": 34.88, "lng": 50.99, "desc": "Hardened Underground Site"},
    {"name": "Arak", "type": "nuclear", "lat": 34.36, "lng": 49.24, "desc": "Heavy Water Reactor"},
    {"name": "Bushehr", "type": "nuclear", "lat": 28.82, "lng": 50.88, "desc": "Nuclear Power Plant"},

    # --- US BASES (CENTCOM 2026 DEPLOYMENTS) ---
    {"name": "Al-Udeid", "type": "us_base", "lat": 25.11, "lng": 51.31, "desc": "US Air Force Forward HQ (Qatar)"},
    {"name": "NSA Bahrain", "type": "us_base", "lat": 26.21, "lng": 50.60, "desc": "US 5th Fleet HQ"},
    {"name": "Camp Arifjan", "type": "us_base", "lat": 28.87, "lng": 48.16, "desc": "Army Logistics Hub (Kuwait)"},
    {"name": "Site 512", "type": "us_base", "lat": 30.98, "lng": 34.61, "desc": "US Radar Facility (Israel)"},

    # --- ISRAELI STRATEGIC SITES ---
    {"name": "Nevatim", "type": "israel_base", "lat": 31.20, "lng": 35.01, "desc": "F-35 Strategic Airbase"},
    {"name": "Haifa Naval", "type": "israel_base", "lat": 32.82, "lng": 34.99, "desc": "Submarine Fleet HQ"},
    {"name": "Dimona", "type": "israel_base", "lat": 31.00, "lng": 35.14, "desc": "Nuclear Research Center"},

    # --- IRGC / IRANIAN MILITARY ---
    {"name": "Bandar Abbas", "type": "irgc_base", "lat": 27.14, "lng": 56.20, "desc": "IRGC Naval HQ"},
    {"name": "Mehrabad", "type": "irgc_base", "lat": 35.68, "lng": 51.31, "desc": "Strategic Airbase (Tehran)"},
    {"name": "Kashan", "type": "irgc_base", "lat": 33.89, "lng": 51.57, "desc": "UAV/Drone Operations"},

    # --- ENERGY INFRASTRUCTURE & PORTS ---
    {"name": "Strait of Hormuz", "type": "chokepoint", "lat": 26.56, "lng": 56.25, "desc": "Key Oil Transit Chokepoint"},
    {"name": "Abadan Refinery", "type": "refinery", "lat": 30.34, "lng": 48.29, "desc": "Major Iranian Refining Hub"},
    {"name": "Ras Laffan", "type": "refinery", "lat": 25.90, "lng": 51.53, "desc": "World's Largest LNG Export (Qatar)"},
    {"name": "Ras Tanura", "type": "refinery", "lat": 26.64, "lng": 50.12, "desc": "Aramco Oil Terminal (Saudi)"}
]