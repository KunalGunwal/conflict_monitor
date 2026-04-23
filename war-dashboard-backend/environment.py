# environment.py
import requests
import random

# Get your free token at https://aqicn.org/data-platform/token/
WAQI_TOKEN = "d05ee6fcd65b0583741c4afdf5f9353f808615a4" # Replace with your actual token for production

STRATEGIC_CITIES = ["tehran", "tel-aviv-yafo", "baghdad", "beirut", "doha"]

def fetch_environmental_telemetry():
    telemetry = {
        "cities": [],
        "regional_co2_spike_tons": random.randint(15000, 85000), # Simulating conflict emissions
        "status": "Nominal"
    }
    
    highest_aqi = 0
    
    print("Pinging WAQI Atmospheric Sensors...")
    
    try:
        for city in STRATEGIC_CITIES:
            # The WAQI API endpoint
            url = f"https://api.waqi.info/feed/{city}/?token={WAQI_TOKEN}"
            response = requests.get(url, timeout=5)
            data = response.json()
            
            if data["status"] == "ok":
                aqi = data["data"]["aqi"]
                # Sometimes AQI comes back as a string or '-' if sensors are offline
                aqi_value = int(aqi) if str(aqi).isdigit() else 0
                
                if aqi_value > highest_aqi:
                    highest_aqi = aqi_value

                # Determine hazard level
                if aqi_value <= 50: level = "Good"
                elif aqi_value <= 100: level = "Moderate"
                elif aqi_value <= 150: level = "Unhealthy (Sensitive)"
                elif aqi_value <= 200: level = "Unhealthy"
                elif aqi_value <= 300: level = "Very Unhealthy"
                else: level = "Hazardous"

                telemetry["cities"].append({
                    "city": city.upper(),
                    "aqi": aqi_value,
                    "level": level
                })
        
        # Update regional status based on the worst air quality
        if highest_aqi > 200:
            telemetry["status"] = "CRITICAL: Heavy smoke/particulates detected in theater."
        elif highest_aqi > 100:
            telemetry["status"] = "WARNING: Elevated particulate matter."
            
        return telemetry

    except Exception as e:
        print(f"Atmospheric Sensor Error: {e}")
        return {"cities": [], "regional_co2_spike_tons": 0, "status": "SENSOR UPLINK FAILED"}