from agents import run_jalsathi
from agents.prediction_agent import FEATURES, predict_flood_probability


def test_flood_query():
    result = run_jalsathi(
        "There is heavy rainfall and rising water levels. What is the flood risk?",
        "Bengaluru"
    )

    assert result["issue_type"] == "flood"


def test_leak_query():
    result = run_jalsathi(
        "There is unusual water usage in Indore. Could it be a leak?",
        "Indore"
    )

    assert result["issue_type"] == "leak"


def test_prediction():
    sample = {
        feature: 5
        for feature in FEATURES
    }

    result = predict_flood_probability(sample)

    assert isinstance(result, dict)

    assert "flood_probability" in result
    assert "percentage" in result

    assert 0 <= result["flood_probability"] <= 1
    assert 0 <= result["percentage"] <= 100


def test_general_query():
    result = run_jalsathi(
        "How can we save water?",
        "Bengaluru"
    )

    assert result["issue_type"] == "general"