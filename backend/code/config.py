import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent.parent / ".env", override=True)

BASE_URL = os.environ["BASE_URL_GROQ"]
API_KEY = os.environ["GROQ_API_KEY"]
MODEL = os.environ["GROQ_MODEL"]
FRONTEND_URL = os.getenv("FRONTEND_URL", "https://localhost:5173")
TIMEOUT = 30    #en secondes


