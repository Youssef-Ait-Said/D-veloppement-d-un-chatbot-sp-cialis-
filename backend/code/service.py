from trace import CoverageResults
import uuid
from openai import OpenAI, APITimeoutError

import config
from prompt import SYSTEM_PROMPT

client = OpenAI(
    base_url = config.BASE_URL,
    api_key = config.API_KEY,
    timeout = config.TIMEOUT
)

# Un historique par conversation : { "id": [messages...] }
conversations: dict[str, list] = {}

class ChatError(Exception):
    """Erreur côté modèle, avec le code HTTP à renvoyer."""

    def __init__(self, message: str, status_code: int):
        super().__init__(message)
        self.message = message
        self.status_code = status_code

def chat(message: str, conversation_id: str | None) -> tuple[str, str]:
    """Envoie le message au modèle. Retourne (réponse, id de conversation)."""
    conv_id = conversation_id or str(uuid.uuid4())
    history = conversations.setdefault(conv_id, [])

    messages = (
        [{"role": "system", "content": SYSTEM_PROMPT}]
        + history 
        + [{"role": "user", "content": message}]
    )

    try:
        r = client.chat.completions.create(
            model= config.MODEL,
            messages = messages,
            temperature=0.2
        )
    except APITimeoutError:
        raise ChatError("Le modèle met trop de temps à répondre.", 504)
    except Exception:
        raise ChatError("Le modèle est indisponible.", 502)
    
    reply = r.choices[0].message.content
    if not reply:
        raise ChatError("Le modèle a renvoyé une réponse vide.", 502)
    
    #sauvegarde l'échange seulement si tout s'est bien passé
    history.append({"role": "user", "content": message})
    history.append({"role": "assistant", "content": reply})
    return reply, conv_id

def reset(conversation_id: str) -> None:
    conversation_id.pop(conversation_id, None)