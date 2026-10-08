const API_URL = import.meta.env.VITE_API_URL;

export async function envoyerMessage(message, conversationId){
    let res;
    try{
        res = await fetch(`${API_URL}/chat`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(
                conversationId ? { message, conversation_id: conversationId } : { message }
              ),
        });
    } catch{
        //Le serveur est injoignable (backend eteint, reseau coupe)
        throw new Error("Impossible de joindre le serveur. Véifie que le backend est lancé.");
    }

    const data = await res.json().catch( () => ({}));

    if(!res.ok){
        if (res.status === 422) {
            const detail = Array.isArray(data.detail) ? data.detail[0]?.msg : null;
            throw new Error(detail || "Le message est vide ou invalide.");
          }
        throw new Error(typeof data.detail === "string" ? data.detail : "une erreur est survenue.");
    }
    return data; //{reply, conversation_id}
}

export async function reinitialiser(conversationId){
    try{
        await fetch(`${API_URL}/chat/${conversationId}`, { method: "DELETE" });
    } catch{
        // si le backend est éteint, on ignore : l'écran sera quand même vidé
    }
}