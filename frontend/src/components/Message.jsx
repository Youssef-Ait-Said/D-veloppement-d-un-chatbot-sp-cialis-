import { Bot, User } from "lucide-react";

function Message({ role, texte }) {
  return (
    <div className={`message ${role}`}>
      <div className="avatar">
        {role === "user" ? <User size={18} /> : <Bot size={18} />}
      </div>
      <div className="bulle">{texte}</div>
    </div>
  );
}

export default Message;