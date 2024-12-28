import React from "react";
import "../../styles/share_modal.scss";

interface ShareModalProps {
  title: string;
  desc: string;
  onClose: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ title, desc, onClose }) => {
  const handleCopy = () => {
    const textToCopy = `${title}\n${desc}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => alert("☆ Text copied ☆"))
      .catch(() => alert("Failed to copy text."));
  };

  const shareLinks = [
    { src: "../src/images/icons/copy.svg", alt: "Copy", action: handleCopy },
    {
      src: "../src/images/icons/vk.svg",
      alt: "VK",
      action: () => window.open("https://vk.com", "_blank"),
    },
    {
      src: "../src/images/icons/tg.svg",
      alt: "Telegram",
      action: () =>
        window.open("https://t.me/share/url?url=YOUR_URL", "_blank"),
    },
    {
      src: "../src/images/icons/wh.svg",
      alt: "WhatsApp",
      action: () => window.open("https://wa.me/?text=YOUR_TEXT", "_blank"),
    },
    {
      src: "../src/images/icons/f.svg",
      alt: "Facebook",
      action: () => window.open("https://facebook.com", "_blank"),
    },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content">
        <div className="share-icons">
          {shareLinks.map((link, idx) => (
            <img
              key={idx}
              src={link.src}
              alt={link.alt}
              onClick={link.action}
              className="share-icon"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
