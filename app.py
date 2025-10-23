from flask import Flask, request, jsonify
import cohere
import os
from dotenv import load_dotenv
from flask_cors import CORS

# 🔹 Load environment variables from .env
env_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path=env_path)

# 🔹 Initialize Flask app
app = Flask(__name__)
CORS(app)

# 🔹 Set Cohere API key from .env
co = cohere.Client(os.getenv("COHERE_API_KEY"))
print("🔑 Cohere API Key loaded")

@app.route("/api/ask", methods=["POST"])
def ask_moodmorph():
    data = request.get_json()

    # 🔍 Extract request data
    mood = data.get("mood", "neutral")
    mode = data.get("mode", "ask")
    question = data.get("question", "")
    journal_text = data.get("journalText", "")

    # 🧠 Debug: Print incoming data
    print("🔹 Incoming request:")
    print("Mode:", mode)
    print("Mood:", mood)
    print("Question:", question)
    print("Journal:", journal_text)

    # 🧠 Build prompt based on mode
    if mode == "journal":
        prompt = f"The user feels {mood} and wrote: \"{journal_text}\". Offer emotional insight and support."
    elif mode == "planner":
        prompt = f"The user feels {mood} and wants help planning their day. Suggest calming, productive routines."
    else:
        prompt = f"The user feels {mood} and asked: \"{question}\". Respond with empathy and clarity."

    print("🔹 Prompt sent to Cohere:")
    print(prompt)

    try:
        # 🔗 Call Cohere
        response = co.chat(
            message=prompt,
            model="command-r-plus-08-2024"
        )
        reply = response.text.strip()

        print("✅ Cohere reply:")
        print(reply)
        return jsonify({"reply": reply})
    except Exception as e:
        print("❌ Error from Cohere:", repr(e))
        return jsonify({"reply": "Cohere is having a temporary issue. You're doing great — try again in a few minutes."}), 500

# 🔹 Run Flask app
if __name__ == "__main__":
    app.run(debug=True)