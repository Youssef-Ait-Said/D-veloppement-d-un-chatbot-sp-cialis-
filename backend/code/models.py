from pydantic import BaseModel, field_validator


class ChatRequest(BaseModel):
    message: str
    conversation_id: str | None = None

    @field_validator("message")
    @classmethod
    def refuser_vide(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("Le message ne doit pas être vide")
        return v


class ChatResponse(BaseModel):
    reply: str
    conversation_id: str
