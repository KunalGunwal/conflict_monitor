import yfinance as yf
import pandas as pd

def fetch_market_data():
    # 1. Added ^VIX (Volatility) and ITA (Defense ETF) to the ticker list
    tickers = "GLD SLV USO INR=X ^GSPC ^IXIC ^NSEI ^BSESN ^VIX ITA"
    try:
        data = yf.download(tickers, start="2026-01-01")
        if data.empty: return None

        close_prices = data['Close'].copy()
        
        # 2. Map the two new tickers to readable JSON keys
        close_prices = close_prices.rename(columns={
            "GLD": "gold", "SLV": "silver", "USO": "oil",
            "INR=X": "inr", "^GSPC": "sp500", "^IXIC": "nasdaq",
            "^NSEI": "nifty", "^BSESN": "sensex",
            "^VIX": "vix", "ITA": "defense"
        })
        
        # Forward-fill to handle market holidays across timezones
        clean_data = close_prices.ffill().bfill().fillna(0).reset_index()
        clean_data["Date"] = clean_data["Date"].dt.strftime("%Y-%m-%d")
        history = clean_data.to_dict(orient="records")
        
        # Apply scaling factors and format the new data
        for row in history:
            row["gold"] = round(row["gold"] * 10.4, 2)
            row["silver"] = round(row["silver"] * 10.0, 2)
            row["oil"] = round(row["oil"] * 1.5, 2)
            row["inr"] = round(row["inr"], 3)
            
            # Format the new charts
            row["vix"] = round(row["vix"], 2)
            row["defense"] = round(row["defense"], 2)
            
            # 3. Add the specific UI marker for Feb 28, 2026
            if row["Date"] == "2026-02-28":
                row["is_event"] = True
                row["event_label"] = "ANOMALY DETECTED"
            else:
                row["is_event"] = False
            
        return history
    except Exception as e:
        print(f"Error in intelligence module: {e}")
        return None