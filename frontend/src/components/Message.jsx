import Logo from "./Logo";

function Message({ role, texte }) {
  return (
    <div className={`message ${role}`}>
      {role === "bot" && (
        <div className="avatar">
          <Logo size={34} />
        </div>
      )}
      <div className="bulle">{texte}</div>
    </div>
  );
}

export default Message;