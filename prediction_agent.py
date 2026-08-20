from pathlib import Path

import joblib
import numpy as np
import pandas as pd

from sklearn.ensemble import ExtraTreesRegressor
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline


# ============================================================
# FLOOD PREDICTION FEATURES
# ============================================================

FEATURES = [
    "MonsoonIntensity",
    "TopographyDrainage",
    "RiverManagement",
    "Deforestation",
    "Urbanization",
    "ClimateChange",
    "DamsQuality",
    "Siltation",
    "AgriculturalPractices",
    "Encroachments",
    "IneffectiveDisasterPreparedness",
    "DrainageSystems",
    "CoastalVulnerability",
    "Landslides",
    "Watersheds",
    "DeterioratingInfrastructure",
    "PopulationScore",
    "WetlandLoss",
    "InadequatePlanning",
    "PoliticalFactors",
]

TARGET = "FloodProbability"


# ============================================================
# PROJECT PATHS
# ============================================================

BASE_DIR = Path(__file__).resolve().parent

DATA_DIR = BASE_DIR / "data"
MODEL_DIR = BASE_DIR / "models"

TRAIN_FILE = DATA_DIR / "flood_train.csv"
MODEL_FILE = MODEL_DIR / "flood_model.joblib"


# ============================================================
# GENERAL RISK PREDICTION
# ============================================================

def get_prediction(issue_type: str, data: dict) -> dict:
    """
    Basic risk prediction used by the JalSathi orchestrator.

    This provides a risk score based on the detected issue type.
    The ML flood model is handled separately by
    predict_flood_probability().
    """

    risk_score = 50
    risk_level = "Medium"

    if issue_type == "flood":
        risk_score = 70
        risk_level = "High"

    elif issue_type == "drought":
        risk_score = 60
        risk_level = "Medium"

    elif issue_type == "leak":
        risk_score = 40
        risk_level = "Low"

    elif issue_type == "general":
        risk_score = 30
        risk_level = "Low"

    return {
        "risk_score": risk_score,
        "risk_level": risk_level,
        "log": "Prediction Agent: Calculated risk score."
    }


# ============================================================
# TRAIN FLOOD PREDICTION MODEL
# ============================================================

def train_model():
    """
    Train the Extra Trees flood-probability model
    using flood_train.csv.
    """

    if not TRAIN_FILE.exists():
        raise FileNotFoundError(
            f"Training file not found: {TRAIN_FILE}"
        )

    # Load training data
    df = pd.read_csv(TRAIN_FILE)

    # Required columns
    required_columns = FEATURES + [TARGET]

    # Check for missing columns
    missing_columns = [
        column
        for column in required_columns
        if column not in df.columns
    ]

    if missing_columns:
        raise ValueError(
            f"Missing columns in training data: {missing_columns}"
        )

    # Keep only required columns
    df = df[required_columns]

    # Convert values to numeric
    df = df.apply(
        pd.to_numeric,
        errors="coerce"
    )

    # Remove rows without target values
    df = df.dropna(subset=[TARGET])

    if len(df) == 0:
        raise ValueError(
            "No valid training rows found in flood_train.csv"
        )

    # Features and target
    X = df[FEATURES]
    y = df[TARGET]

    # Model pipeline
    model = Pipeline([
        (
            "imputer",
            SimpleImputer(strategy="median")
        ),
        (
            "regressor",
            ExtraTreesRegressor(
                n_estimators=400,
                min_samples_leaf=2,
                random_state=42,
                n_jobs=-1
            )
        )
    ])

    # Train
    model.fit(X, y)

    # Create models directory
    MODEL_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    # Save model
    joblib.dump(
        model,
        MODEL_FILE
    )

    return {
        "message": "Flood prediction model trained successfully",
        "rows_used": len(df),
        "model_file": str(MODEL_FILE)
    }


# ============================================================
# LOAD FLOOD MODEL
# ============================================================

def load_model():
    """
    Load the trained flood model.

    If the model does not exist, automatically train it.
    """

    if not MODEL_FILE.exists():
        train_model()

    return joblib.load(MODEL_FILE)


# ============================================================
# FLOOD PROBABILITY PREDICTION
# ============================================================

def predict_flood_probability(input_data):
    """
    Predict flood probability for one input record.

    Input:
        Dictionary containing all FEATURES.

    Example:

        {
            "MonsoonIntensity": 5,
            "TopographyDrainage": 5,
            ...
            "PoliticalFactors": 5
        }

    Returns:

        {
            "flood_probability": 0.50,
            "percentage": 50.0
        }
    """

    # Accept a single dictionary
    if isinstance(input_data, dict):
        input_data = [input_data]

    # Convert to DataFrame
    input_df = pd.DataFrame(input_data)

    # Check required features
    missing_features = [
        feature
        for feature in FEATURES
        if feature not in input_df.columns
    ]

    if missing_features:
        raise ValueError(
            f"Missing input features: {missing_features}"
        )

    # Keep only model features
    input_df = input_df[FEATURES]

    # Convert to numeric
    input_df = input_df.apply(
        pd.to_numeric,
        errors="coerce"
    )

    # Load model
    model = load_model()

    # Generate prediction
    prediction = float(
        model.predict(input_df)[0]
    )

    # Keep probability between 0 and 1
    prediction = float(
        np.clip(
            prediction,
            0,
            1
        )
    )

    return {
        "flood_probability": round(
            prediction,
            4
        ),
        "percentage": round(
            prediction * 100,
            2
        )
    }


# ============================================================
# COMMAND-LINE TEST
# ============================================================

if __name__ == "__main__":

    print("\nTraining Flood Prediction Model...\n")

    result = train_model()

    print(result)

    print("\nModel training completed successfully.")