# SportBot 🏅

Chatbot spécialisé dans le **sport** : règles, compétitions, records, technique et conseils généraux d'entraînement.
Projet réalisé dans le cadre du module *Applications avancées en IA* (Mundiapolis).

- **Phase 1** : prototype dans un notebook (`phase1.ipynb`), avec comparaison de deux versions du prompt.
- **Phase 2** : application web, backend **FastAPI** + frontend **React (Vite)**.

## Fonctionnalités

- Réponses aux questions sportives, avec prise en compte des échanges précédents
- Questions de précision si la demande est ambiguë, refus des sujets hors sport
- Pas de diagnostic ni de traitement médical
- Historique **distinct par conversation** (stocké en mémoire)
- Indicateur de génération, messages d'erreur clairs, bouton « Nouvelle conversation »
- Interface responsive (ordinateur et smartphone)

## Structure

```
SportBot/
├── phase1.ipynb          # prototype (phase 1)
├── backend/
│   ├── .env.example
│   └── code/
│       ├── main.py       # routes FastAPI + CORS
│       ├── service.py    # appel au modèle + historiques
│       ├── models.py     # validation Pydantic
│       ├── config.py     # lecture du .env
│       └── prompt.py     # prompt système
└── frontend/
    ├── .env.example
    └── src/              # App.jsx, api.js, components/
```

## Prérequis

- Python 3.11+ et [uv](https://docs.astral.sh/uv/)
- Node.js 18+
- Une clé API [Groq](https://console.groq.com)

## Installation et lancement

### 1. Backend

```bash
cd backend
cp .env.example .env        # puis renseigner les valeurs (voir ci-dessous)
uv sync                     # ou : pip install -r requirements.txt
cd code
uv run uvicorn main:app --reload
```

API disponible sur http://localhost:8000 (documentation interactive : `/docs`).

### 2. Frontend (dans un 2e terminal)

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Application disponible sur **http://localhost:5173** (utiliser `localhost`, pas `127.0.0.1`, à cause du CORS).

## Configuration

`backend/.env`

| Variable | Rôle |
|---|---|
| `BASE_URL_GROQ` | URL de l'API du fournisseur du modèle |
| `GROQ_API_KEY` | Clé API (secret, ne jamais la commiter) |
| `GROQ_MODEL` | Nom du modèle utilisé |
| `FRONTEND_URL` | Adresse du frontend autorisée par CORS (`http://localhost:5173`) |

`frontend/.env`

| Variable | Rôle |
|---|---|
| `VITE_API_URL` | Adresse du backend (`http://localhost:8000`) |

## API

| Route | Rôle |
|---|---|
| `GET /health` | Vérifie que le service fonctionne |
| `POST /chat` | Envoie un message, reçoit la réponse et le `conversation_id` |
| `DELETE /chat/{conversation_id}` | Réinitialise une conversation |

Exemple :

```json
POST /chat
{ "message": "Qui a gagné la Coupe du monde 2022 ?", "conversation_id": null }
```

Erreurs gérées : message vide (422), modèle indisponible (502), délai dépassé (504).

## Tests de bout en bout

| Test | Résultat attendu |
|---|---|
| Question sportive | Réponse du bot |
| Question de suivi (« Et celle d'avant ? ») | Le contexte est compris |
| Message vide | Refusé (422), bouton d'envoi désactivé |
| Nouvelle conversation | Le contexte est oublié |
| Deux conversations (2 onglets) | Historiques isolés |
| Backend éteint / mauvaise clé | Message d'erreur clair, pas de plantage |

## Limites

- Informations générales uniquement : pas de suivi personnalisé, pas de diagnostic ni de traitement.
- Le modèle peut se tromper sur des dates, scores ou records : vérifier les informations importantes.
- Les conversations sont stockées en mémoire : elles sont perdues au redémarrage du serveur.
