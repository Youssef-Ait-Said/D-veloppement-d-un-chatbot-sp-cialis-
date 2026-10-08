// Vidéo optionnelle dans frontend/public/ (ex. "/fond.mp4"). Mets "" pour la désactiver.
const FOND_MEDIA = "/fond.mp4";

function Fond() {
  return (
    <div className="fond" aria-hidden="true">
      {FOND_MEDIA &&
        (FOND_MEDIA.endsWith(".gif") ? (
          <img className="fond-media" src={FOND_MEDIA} alt="" />
        ) : (
          <video className="fond-media" src={FOND_MEDIA} autoPlay loop muted playsInline />
        ))}
      <div className="pistes" />
    </div>
  );
}

export default Fond;