import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const isIOS = () =>
  /iphone|ipad|ipod/i.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1); // iPad

const isStandalone = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  window.navigator.standalone === true;

const btnStyle = {
  background: "#0c3a6b",
  color: "#fff",
  border: 0,
  padding: "10px 18px",
  borderRadius: 8,
  cursor: "pointer",
  fontSize: 15,
  whiteSpace: "nowrap",
  alignSelf: "center",
};

function IOSGuide({ onClose }) {
  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.6)",
        zIndex: 2147483647,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          color: "#222",
          width: "100%",
          maxWidth: 440,
          borderRadius: "18px 18px 0 0",
          padding: "22px 20px calc(28px + env(safe-area-inset-bottom))",
          lineHeight: 1.7,
          fontSize: 16,
          boxShadow: "0 -8px 30px rgba(0,0,0,.25)",
        }}
      >
        <h3 style={{ margin: "0 0 12px", color: "#0c3a6b", fontSize: 20 }}>
          iPhone par Install karein
        </h3>
        <ol style={{ paddingLeft: 22, margin: "0 0 18px" }}>
          <li>
            Neeche ya upar <b>Share</b> button (⬆️) dabayein
          </li>
          <li>
            Scroll karke <b>Add to Home Screen</b> chunein
          </li>
          <li>
            Upar right me <b>Add</b> dabayein
          </li>
        </ol>
        <p style={{ margin: "0 0 16px", fontSize: 13, color: "#666" }}>
          Note: Ye Safari me hi sabse sahi chalta hai.
        </p>
        <button
          type="button"
          style={{ ...btnStyle, width: "100%", padding: "13px 18px" }}
          onClick={onClose}
        >
          Samajh gaya
        </button>
      </div>
    </div>,
    document.body
  );
}

export default function InstallButton() {
  const [promptEvent, setPromptEvent] = useState(null);
  const [showIOS, setShowIOS] = useState(false);
  const [iosDevice, setIosDevice] = useState(false);

  useEffect(() => {
    if (isStandalone()) return; // app pehle se installed hai

    if (isIOS()) {
      setIosDevice(true);
      return;
    }

    const onPrompt = (e) => {
      e.preventDefault();
      setPromptEvent(e);
    };
    const onInstalled = () => setPromptEvent(null);

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  // Android / Desktop Chrome
  if (promptEvent) {
    return (
      <button
        type="button"
        style={btnStyle}
        onClick={async () => {
          promptEvent.prompt();
          await promptEvent.userChoice;
          setPromptEvent(null);
        }}
      >
        📲 Install App
      </button>
    );
  }

  // iPhone / iPad
  if (iosDevice) {
    return (
      <>
        <button type="button" style={btnStyle} onClick={() => setShowIOS(true)}>
          📲 Install App
        </button>
        {showIOS && <IOSGuide onClose={() => setShowIOS(false)} />}
      </>
    );
  }

  return null;
}