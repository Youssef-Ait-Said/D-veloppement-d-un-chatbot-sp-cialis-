from fastapi import FASTAPI, FastAPI, HTTPException
import fastapi
from fastapi.middleware.cors import CORSMiddleware

import config
import service
from models import ChatRequest, ChatResponse

app = FastAPI(title = "AportBot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins = [config.FRONTEND_URL],
    allow_methods = ["*"],
    allow_headers = ["*"]
)

@app.get("/health")
def health():
    return {"status" : "ok"}


@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    try:
        reply, conv_id = service.chat(req.message, req.conversation_id)
    except service.ChatError as e:
        raise HTTPException(status_code=e.status_code, detail = e.message)
    return ChatResponse(reply = reply, conversation_id = conv_id)

@app.delete("/chat/{conversation_id}")
def reset(conversation_id):
    service.reste(conversation_id)
    return {"status" : "reset"}