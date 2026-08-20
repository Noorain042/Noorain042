def plan_query(query: str, location: str, issue_type: str | None = None) -> dict:
    """
    Planner Agent for JalSathi.

    Detects the type of water-related query:
    - flood
    - drought
    - leak
    - general
    - unknown
    """

    q = (query or "").lower().strip()

    # ---------------------------------------------------------
    # If issue type is explicitly provided, use it
    # ---------------------------------------------------------
    if issue_type:
        detected = issue_type.lower()

    # ---------------------------------------------------------
    # Flood detection
    # ---------------------------------------------------------
    elif any(
        word in q
        for word in [
            "flood",
            "flooding",
            "heavy rain",
            "heavy rainfall",
            "river",
            "water level",
            "rising water",
            "overflow",
            "flash flood"
        ]
    ):
        detected = "flood"

    # ---------------------------------------------------------
    # Drought detection
    # ---------------------------------------------------------
    elif any(
        word in q
        for word in [
            "drought",
            "dry",
            "irrigation",
            "irrigat",
            "soil moisture",
            "rainfall deficit",
            "water shortage",
            "water scarcity"
        ]
    ):
        detected = "drought"

    # ---------------------------------------------------------
    # Leak / water-loss detection
    # ---------------------------------------------------------
    elif any(
        word in q
        for word in [
            "leak",
            "leaking",
            "pipeline",
            "pipe burst",
            "burst pipe",
            "water loss",
            "wastage",
            "water wastage",
            "unusual water usage"
        ]
    ):
        detected = "leak"

    # ---------------------------------------------------------
    # General water-management questions
    # ---------------------------------------------------------
    elif any(
        word in q
        for word in [
            "save water",
            "conserve water",
            "water conservation",
            "water management",
            "water quality",
            "how to save",
            "how can we save",
            "reduce water usage",
            "reduce water consumption",
            "water awareness",
            "rainwater harvesting",
            "harvest rainwater",
            "water sustainability",
            "sustainable water",
            "water tips"
        ]
    ):
        detected = "general"

    # ---------------------------------------------------------
    # Unknown query
    # ---------------------------------------------------------
    else:
        detected = "unknown"

    return {
        "issue_type": detected,
        "location": location,
        "log": f"Planner Agent: Identified issue type as '{detected}'."
    }