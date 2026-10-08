import { useState, useEffect, useRef } from "react";
import { RotateCcw, ArrowUp, ArrowUpRight, TriangleAlert } from "lucide-react";
import Message from "./components/Message";
import Limites from "./components/Limites";
import Fond from "./components/Fond";
import Logo from "./components/Logo";
import { envoyerMessage, reinitialiser } from "./api";
import "./App.css";

const SUGGESTIONS = [
  "Explique la règle du hors-jeu au football",
  "Quel est le record du monde du 100 m ?",
  "Comment bien s'échauffer avant une course ?",
  "Quelle différence entre un marathon et un semi-marathon ?",
];

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

  async function envoyerTexte(brut) {
    const message = brut.trim();
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

  function soumettre(e) {
    e.preventDefault();
    envoyerTexte(texte);
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
      <div className="shell">
        <aside className="side">
          <div className="marque">
            <Logo size={52} />
            <span className="etiquette">Assistant sportif</span>
          </div>
          <h1>
            Sport<span>Bot</span>
          </h1>
          <p className="description">
            Règles, compétitions, records et conseils généraux d'entraînement.
            Des réponses claires, sans promesses médicales.
          </p>
          <Limites />
        </aside>

        <section className="panel">
          <div className="barre">
            <span>Conversation</span>
            <button type="button" className="btn-ghost" onClick={nouvelleConversation}>
              <RotateCcw size={15} />
              <span>Nouvelle conversation</span>
            </button>
          </div>

          <main className="chat">
            <div className="fil">
              {messages.length === 0 && (
                <div className="accueil">
                  <h2>Que veux-tu savoir ?</h2>
                  <p>Choisis une question ou écris la tienne.</p>
                  <div className="suggestions">
                    {SUGGESTIONS.map((s) => (
                      <button key={s} type="button" disabled={loading} onClick={() => envoyerTexte(s)}>
                        <span>{s}</span>
                        <ArrowUpRight size={16} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <Message key={i} role={m.role} texte={m.texte} />
              ))}

              {loading && (
                <div className="message bot">
                  <div className="avatar">
                    <Logo size={34} />
                  </div>
                  <div className="bulle typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}
              <div ref={fin} />
            </div>
          </main>

          <form className="saisie" onSubmit={soumettre}>
            {erreur && (
              <div className="erreur">
                <TriangleAlert size={18} />
                <span>{erreur}</span>
              </div>
            )}
            <div className="champ">
              <input
                value={texte}
                onChange={(e) => setTexte(e.target.value)}
                placeholder="Écris ta question..."
              />
              <button type="submit" disabled={loading || !texte.trim()} aria-label="Envoyer">
                <ArrowUp size={20} />
              </button>
            </div>
            <p className="note">SportBot peut se tromper. Vérifie les informations importantes.</p>
          </form>
        </section>
      </div>
    </>
  );
}

export default App;