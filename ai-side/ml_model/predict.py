import sys
import json
import joblib
import pandas as pd
from scipy.sparse import hstack
from sklearn.feature_extraction.text import TfidfVectorizer
import os

script_dir = os.path.dirname(os.path.abspath(__file__))

model = joblib.load(os.path.join(script_dir, "lead_model.pkl"))
vectorizer = joblib.load(os.path.join(script_dir, "vectorizer.pkl"))

data = json.loads(sys.stdin.read())

message = data.get("message", "")
has_budget = int(data.get("has_budget", 0))
has_timeline = int(data.get("has_timeline", 0))
urgency = int(data.get("urgency", 0))

X_text = vectorizer.transform([message])
X_num = pd.DataFrame([[has_budget, has_timeline, urgency]], columns=["has_budget", "has_timeline", "urgency"])
X = hstack([X_text, X_num])

prediction = model.predict(X)[0]
probability = model.predict_proba(X)[0].max()

result = {
    "temperature": prediction,
    "confidence": round(probability * 100, 2)
}

print(json.dumps(result))