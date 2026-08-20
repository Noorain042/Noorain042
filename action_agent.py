def get_action(issue_type: str, risk_level: str, risk_score: int) -> dict:
    if issue_type == "flood":
        if risk_level == "High":
            action = "Avoid low-lying areas and follow local disaster alerts."
            actions = [
                "Avoid low-lying areas and follow local disaster alerts.",
                "Move to higher ground immediately if water levels are rising.",
                "Keep emergency kit ready (drinking water, torch, medicines).",
                "Follow official evacuation orders without delay."
            ]
        elif risk_level == "Medium":
            action = "Monitor water levels and prepare evacuation routes."
            actions = [
                "Monitor water levels and prepare evacuation routes.",
                "Stay updated with local weather and flood alerts.",
                "Identify the nearest safe shelter in advance.",
                "Avoid unnecessary travel near rivers and low-lying roads."
            ]
        else:
            action = "No immediate flood risk; continue routine monitoring."
            actions = [
                "No immediate flood risk; continue routine monitoring.",
                "Keep checking official weather updates.",
                "Maintain basic emergency preparedness."
            ]

    elif issue_type == "drought":
        if risk_level == "High":
            action = "Prioritize essential irrigation and reduce non-critical water use."
            actions = [
                "Prioritize essential irrigation and reduce non-critical water use.",
                "Switch to drip or sprinkler irrigation where possible.",
                "Avoid watering during peak afternoon heat.",
                "Use mulching to reduce soil moisture loss."
            ]
        elif risk_level == "Medium":
            action = "Use water-saving irrigation methods and schedule watering wisely."
            actions = [
                "Use water-saving irrigation methods and schedule watering wisely.",
                "Irrigate early morning or late evening only.",
                "Monitor soil moisture before watering.",
                "Consider short-duration or drought-resistant crops."
            ]
        else:
            action = "Normal irrigation practices; monitor soil moisture."
            actions = [
                "Normal irrigation practices; monitor soil moisture.",
                "Continue regular farm water management.",
                "Keep tracking rainfall forecasts."
            ]

    elif issue_type == "leak":
        if risk_level == "High":
            action = "Inspect pipelines immediately and report suspected leaks to authorities."
            actions = [
                "Inspect pipelines immediately and report suspected leaks to authorities.",
                "Shut off nearby valves if safe to do so.",
                "Inform local water supply department urgently.",
                "Avoid using water from the affected section until repaired."
            ]
        elif risk_level == "Medium":
            action = "Check for unusual water usage and monitor for possible leaks."
            actions = [
                "Check for unusual water usage and monitor for possible leaks.",
                "Look for wet patches, hissing sounds, or sudden drop in pressure.",
                "Note the location and report to maintenance team.",
                "Monitor water meter for unusual continuous flow."
            ]
        else:
            action = "Usage appears normal; continue regular pipeline checks."
            actions = [
                "Usage appears normal; continue regular pipeline checks.",
                "Perform routine visual inspection of pipelines.",
                "Keep emergency contact numbers ready."
            ]

    else:
        action = "No specific action available."
        actions = ["No specific action available for this issue type."]

    reason = (
        f"Risk level is {risk_level} with score {risk_score} for {issue_type}."
    )

    return {
        "reason": reason,
        "action": action,          # kept for backward compatibility
        "actions": actions,        # new field for frontend (list)
        "log": "Action Agent: Generated guidance."
    }