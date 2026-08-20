def get_data(issue_type: str, location: str) -> dict:
    # For now, return a placeholder.
    # Later Azwa can load CSVs or call APIs here.
    return {
        "issue_type": issue_type,
        "location": location,
        "log": f"Data Agent: Loaded data for {location} ({issue_type})."
    }