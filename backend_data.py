import pandas as pd
import os

def load_water_data():
    """Loads the simulation data CSV for JalSathi AI."""
    csv_path = os.path.join("my_data", "sample_data.csv")
    if os.path.exists(csv_path):
        return pd.read_csv(csv_path)
    else:
        data = {
            "region": ["Assam", "Mandya", "Indore"],
            "scenario": ["flood", "drought", "leakage"],
            "primary_indicator": ["Rainfall (mm)", "Soil Moisture (mm)", "Flow Discrepancy (MLD)"],
            "threshold_limit": [250.0, 80.0, 10.0],
            "current_value": [285.5, 35.2, 18.4],
            "risk_level": ["HIGH", "MEDIUM", "HIGH"]
        }
        return pd.DataFrame(data)

def get_scenario_data(query_text):
    """Simple backend matching logic to find relevant data based on user query."""
    df = load_water_data()
    query_lower = query_text.lower()
    
    if "assam" in query_lower or "flood" in query_lower:
        return df[df['scenario'] == 'flood'].to_dict(orient='records')[0]
    elif "mandya" in query_lower or "drought" in query_lower or "irrigate" in query_lower:
        return df[df['scenario'] == 'drought'].to_dict(orient='records')[0]
    elif "indore" in query_lower or "mhow" in query_lower or "leak" in query_lower or "pipeline" in query_lower:
        return df[df['scenario'] == 'leakage'].to_dict(orient='records')[0]
    else:
        return df.to_dict(orient='records')[0]