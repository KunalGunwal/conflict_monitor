from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import all our modular intelligence engines
from installations import INSTALLATIONS
from intelligence import fetch_market_data
from news import fetch_conflict_news
from strikes import scrape_kinetic_events
from environment import fetch_environmental_telemetry
from social import fetch_real_tweets # <-- The new RapidAPI Scraper

app = FastAPI()

# Allow React to talk to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/installations")
def get_map_data(): 
    return INSTALLATIONS

@app.get("/api/intelligence")
def get_intel_data():
    history = fetch_market_data()
    return {"current": history[-1], "history": history} if history else {}

@app.get("/api/news")
def get_news_feed(): 
    return fetch_conflict_news() 

@app.get("/api/strikes")
def get_strike_data():
    return scrape_kinetic_events()

@app.get("/api/environment")
def get_environment_data():
    return fetch_environmental_telemetry()

# NEW: Dynamic route that accepts a Twitter handle and fetches the live feed
@app.get("/api/social/{handle}")
def get_social_feed(handle: str):
    return fetch_real_tweets(handle)