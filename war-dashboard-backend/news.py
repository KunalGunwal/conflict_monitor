# news.py
import requests
import time

# Get your free key at https://gnews.io/
GNEWS_API_KEY = "5326d4ea429a8b2a002d18de5eec9e01"

# --- INTEL CACHE SYSTEM ---
_cached_articles = []
_last_fetch_time = 0
CACHE_TTL = 300  # 5 minutes (300 seconds) before it fetches fresh data

def fetch_conflict_news(limit=100):
    global _cached_articles, _last_fetch_time
    
    # 1. Check if we have fresh data in the cache to save API calls
    current_time = time.time()
    if current_time - _last_fetch_time < CACHE_TTL and _cached_articles:
        print("Serving News from secure local cache...")
        return _cached_articles[:limit]

    # 2. If cache is old, fetch a massive "Whole Day" batch (max=100)
    query = "\"Iran Israel\" OR \"Middle East conflict\" OR \"Strait of Hormuz\""
    
    # max=100 pulls the maximum allowed articles, giving us a full-day scope
    url = f"https://gnews.io/api/v4/search?q={query}&lang=en&country=us&max=100&sortBy=publishedAt&apikey={GNEWS_API_KEY}"

    try:
        response = requests.get(url)
        data = response.json()
        
        if "articles" in data:
            articles = data["articles"]
            
            if not articles:
                return []
            
            formatted_news = []
            for i, art in enumerate(articles):
                # Clean timestamp: 2026-04-06T00:15:00Z -> 00:15
                raw_time = art['publishedAt'].split('T')[1][:5] 
                
                formatted_news.append({
                    "id": i,
                    "time": raw_time,
                    "headline": art['title'],
                    "source": art['source']['name'],
                    "url": art['url']
                })
            
            # Save to cache
            _cached_articles = formatted_news
            _last_fetch_time = current_time
            
            return formatted_news[:limit]
            
        print(f"GNews Error: {data.get('errors', 'Unknown')}")
        return []
        
    except Exception as e:
        print(f"GNews Connection Error: {e}")
        return []