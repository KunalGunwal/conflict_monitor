# strikes.py
import feedparser
import requests
import time

CITY_COORDINATES = {
    "Tehran": [35.68, 51.38],
    "Isfahan": [32.65, 51.66],
    "Tabriz": [38.08, 46.29],
    "Haifa": [32.81, 34.99],
    "Tel Aviv": [32.08, 34.78],
    "Eilat": [29.55, 34.95],
    "Beirut": [33.89, 35.50],
    "Damascus": [33.51, 36.27],
    "Baghdad": [33.31, 44.36],
    "Erbil": [36.19, 44.01],
    "Sanaa": [15.36, 44.19]
}

RSS_FEEDS = [
    "https://www.aljazeera.com/xml/rss/all.xml",
    "https://feeds.bbci.co.uk/news/world/middle_east/rss.xml", # Changed to https
    "https://rss.nytimes.com/services/xml/rss/nyt/MiddleEast.xml"
]

# This tells the news servers we are a normal human using Chrome on a Macbook
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/rss+xml, application/xml, text/xml, */*'
}

def scrape_kinetic_events():
    strike_events = []
    attack_keywords = ["strike", "missile", "drone", "uav", "explosion", "intercepted", "bombing", "blast"]
    
    print("Initiating Stealth RSS Web Scrape for Kinetic Events...")
    
    try:
        for feed_url in RSS_FEEDS:
            print(f"Scanning feed: {feed_url}")
            
            # 1. Fetch the data using a "browser mask"
            response = requests.get(feed_url, headers=HEADERS, timeout=10)
            
            if response.status_code != 200:
                print(f"  -> Blocked by firewall (Status: {response.status_code})")
                continue
                
            # 2. Parse the raw text we just successfully downloaded
            parsed_feed = feedparser.parse(response.text)
            print(f"  -> Success! Found {len(parsed_feed.entries)} entries.")
            
            for entry in parsed_feed.entries:
                title = entry.title.lower() if hasattr(entry, 'title') else ""
                summary = entry.summary.lower() if hasattr(entry, 'summary') else ""
                combined_text = title + " " + summary
                
                if any(keyword in combined_text for keyword in attack_keywords):
                    for city, coords in CITY_COORDINATES.items():
                        if city.lower() in combined_text:
                            
                            severity = "High" if any(w in combined_text for w in ["explosion", "blast", "casualty"]) else "Medium"
                            
                            time_str = "LIVE"
                            if hasattr(entry, 'published'):
                                try:
                                    time_parts = entry.published.split(' ')
                                    time_str = time_parts[4][:5] if len(time_parts) > 4 else "LIVE"
                                except: pass

                            strike_events.append({
                                "id": entry.link if hasattr(entry, 'link') else str(time.time()),
                                "location": city,
                                "lat": coords[0],
                                "lng": coords[1],
                                "type": "kinetic_event",
                                "severity": severity,
                                "time": time_str
                            })
                            
        unique_strikes = list({v['location']:v for v in strike_events}.values())
        print(f"Total unique kinetic events identified: {len(unique_strikes)}")
        return unique_strikes

    except Exception as e:
        print(f"Scraper Error: {e}")
        return []