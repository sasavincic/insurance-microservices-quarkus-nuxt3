import os
from os.path import exists
import pickle
import sys

from flask import Flask, request, jsonify
import neptune.new as neptune
import pandas as pd
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)

PROJECT = os.getenv("PROJECT") or ""
API_TOKEN = os.getenv("API_TOKEN") or ""
MODEL = os.getenv("MODEL") or ""
STAGE = os.getenv("STAGE") or ""


def load_model():
    app.logger.info("Loading model...")

    model = neptune.init_model(
        project=PROJECT,
        api_token=API_TOKEN,
        model=MODEL,
    )

    model_versions_df = model.fetch_model_versions_table().to_pandas()

    stage_models = model_versions_df[
        model_versions_df["sys/stage"] == STAGE
        ]

    for index, model_version in stage_models.iterrows():
        version_id = model_version["sys/id"]
        model_version = neptune.init_model_version(
            project=PROJECT,
            api_token=API_TOKEN,
            version=version_id
        )

        model_version["model"].download("model.pickle")

        if os.path.exists("model.pickle"):
            with open("model.pickle", "rb") as file:
                loaded_model = pickle.load(file)
                app.model = loaded_model
                app.model_version_id = version_id
            app.logger.info(f"Model with version {app.model_version_id} loaded")
        else:
            model.stop()
            model_version.stop()
            app.logger.error("Model has not been downloaded! Exiting application.")
            sys.exit()

    model.stop()
    model_version.stop()


@app.route("/")
def get_root():
    return {"deployed_model": str(app.model), "deployed_model_id": str(app.model_version_id)}


@app.route("/model/reload")
def reload_model():
    previous_model_version = app.model_version_id
    load_model()
    return {"previous_model_version": previous_model_version, "current_model_version": str(app.model_version_id)}


@app.route("/predict", methods=["POST"])
def predict():
    features_dict = request.json
    df = pd.DataFrame.from_dict(features_dict, orient="index")
    df = df.T
    app.logger.info(f"Received features dataframe:\n{df}")
    score = app.model.predict_proba(df)
    app.logger.info(f"Fraud probability: {score[0][1]}")
    return {"fraud_probability": score[0][1]}


if __name__ == "__main__":
    load_model()
    app.run(host="0.0.0.0", debug=True)