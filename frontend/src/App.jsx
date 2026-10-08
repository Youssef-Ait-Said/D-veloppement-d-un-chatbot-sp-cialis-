import { useState, useEffect, useRef } from "react";
import { Trophy, RotateCcw, Send, Bot, Sparkles, TriangleAlert } from "lucide-react";
import Message from "./components/Message";
import Limites from "./components/Limites";
import Fond from "./components/Fond";
import { envoyerMessage, reinitialiser } from "./api.js";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [texte, setTexte] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState("");
  const fin = useRef(null);

  useEffect(() => {
    fin.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function envoyer(e) {
    e.preventDefault();
    const message = texte.trim();
    if (!message || loading) return;

    setErreur("");
    setTexte("");
    setMessages((prev) => [...prev, { role: "user", texte: message }]);
    setLoading(true);

    try {
      const data = await envoyerMessage(message, conversationId);
      setConversationId(data.conversation_id);
      setMessages((prev) => [...prev, { role: "bot", texte: data.reply }]);
    } catch (err) {
      setErreur(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function nouvelleConversation() {
    if (conversationId) await reinitialiser(conversationId);
    setMessages([]);
    setConversationId(null);
    setErreur("");
    setTexte("");
  }

  return (
    <>
      <Fond />
      <div className="app">
        <header className="header">
          <div className="logo">
            <Trophy size={26} />
          </div>
          <div className="titre">
            <h1>SportBot</h1>
            <p>Règles, compétitions, records, entraînement.</p>
          </div>
          <button className="btn-secondaire" onClick={nouvelleConversation}>
            <RotateCcw size={16} />
            <span>Nouvelle conversation</span>
          </button>
        </header>

        <Limites />

        <main className="chat">
          {messages.length === 0 && (
            <div className="vide">
              <Sparkles size={34} />
              <p>Pose ta première question sur le sport</p>
            </div>
          )}

          {messages.map((m, i) => (
            <Message key={i} role={m.role} texte={m.texte} />
          ))}

          {loading && (
            <div className="message bot">
              <div className="avatar">
                <Bot size={18} />
              </div>
              <div className="bulle typing">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
          <div ref={fin} />
        </main>

        {erreur && (
          <div className="erreur">
            <TriangleAlert size={18} />
            <span>{erreur}</span>
          </div>
        )}

        <form className="saisie" onSubmit={envoyer}>
          <input
            value={texte}
            onChange={(e) => setTexte(e.target.value)}
            placeholder="Écris ta question..."
          />
          <button type="submit" disabled={loading || !texte.trim()} aria-label="Envoyer">
            <Send size={20} />
          </button>
        </form>
      </div>
    </>
  );
}

export default App;