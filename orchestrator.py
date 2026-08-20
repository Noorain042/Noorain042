from .planner_agent import plan_query
from .data_agent import get_data
from .prediction_agent import get_prediction
from .action_agent import get_action


def run_jalsathi(query: str, location: str, issue_type: str | None = None) -> dict:
    agent_log = []

    # 1. Planner Agent
    plan = plan_query(query, location, issue_type)
    agent_log.append(plan["log"])

    # 2. Data Agent
    data = get_data(plan["issue_type"], plan["location"])
    agent_log.append(data["log"])

    # 3. Prediction Agent
    pred = get_prediction(plan["issue_type"], data)
    agent_log.append(pred["log"])

    # 4. Action Agent
    act = get_action(plan["issue_type"], pred["risk_level"], pred["risk_score"])
    agent_log.append(act["log"])

    return {
        "issue_type": plan["issue_type"],
        "location": plan["location"],
        "risk_level": pred["risk_level"],
        "risk_score": pred["risk_score"],
        "reason": act["reason"],
        "action": act["action"],              # single action (backward compatible)
        "actions": act.get("actions", [act["action"]]),  # list of actions for frontend
        "agent_log": agent_log
    }