# social.py
import requests

# Put YOUR actual key from the RapidAPI dashboard here
RAPID_API_KEY = "9efa13be10mshd704266030b4a0dp1d1d2fjsn357ccb8a06d5" 

def fetch_real_tweets(screen_name="CENTCOM"):
    print(f"Bypassing X Security using 'The Old Bird'... Fetching @{screen_name}")
    
    # The endpoint for getting a user's timeline on Twitter154
    url = "https://twitter154.p.rapidapi.com/user/tweets"
    
    # Twitter154 usually accepts 'username' directly
    querystring = {
        "username": screen_name,
        "limit": "15",           # Fetch 15 tweets
        "include_replies": "false", # Keep it clean, just official statements
        "include_pinned": "false"
    }
    
    headers = {
        "x-rapidapi-key": RAPID_API_KEY,
        "x-rapidapi-host": "twitter154.p.rapidapi.com"
    }

    try:
        response = requests.get(url, headers=headers, params=querystring, timeout=10)
        data = response.json()
        
        formatted_tweets = []
        
        # Twitter154 returns a "results" array
        if "results" in data:
            for tweet in data["results"]:
                
                # Format the timestamp
                raw_time = tweet.get("creation_date", "")
                # Example: "Sun Apr 06 14:30:00 +0000 2026" -> just grab the time portion if possible
                time_display = raw_time.split()[3][:5] if len(raw_time.split()) > 3 else "LIVE"
                
                formatted_tweets.append({
                    "id": tweet.get("tweet_id", ""),
                    "time": time_display,
                    "text": tweet.get("text", "Content unavailable"),
                    "type": "INTEL"
                })
            return formatted_tweets
            
        print(f"Unexpected API Response: {data}")
        return []
        
    except Exception as e:
        print(f"RapidAPI Scrape Failed: {e}")
        return []