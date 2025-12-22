import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";
import PropTypes from "prop-types"; // 1. ይህንን ኢምፖርት አድርግ

const SocialConnect = ({ links }) => {
  const platforms = [
    {
      name: "Facebook",
      icon: <FaFacebook size={24} />,
      color: "bg-blue-100 text-blue-600",
      url: links?.facebook || "#",
    },
    {
      name: "Instagram",
      icon: <FaInstagram size={24} />,
      color: "bg-pink-100 text-pink-600",
      url: links?.instagram || "#",
    },
    {
      name: "Telegram",
      icon: <FaTelegram size={24} />,
      color: "bg-sky-100 text-sky-600",
      url: links?.telegram || "#",
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp size={24} />,
      color: "bg-green-100 text-green-600",
      url: links?.whatsapp || "#",
    },
  ];

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm mt-4">
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
        Connect with us
      </h3>
      <div className="grid grid-cols-4 gap-4">
        {platforms.map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-1 active:scale-90 transition-transform"
          >
            <div className={`p-3 rounded-full ${p.color}`}>{p.icon}</div>
            <span className="text-[10px] font-bold text-gray-600">
              {p.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

// 2. ፕሮፕስ ቫሊዴሽን እዚህ ጋር ጨምር
SocialConnect.propTypes = {
  links: PropTypes.shape({
    facebook: PropTypes.string,
    instagram: PropTypes.string,
    telegram: PropTypes.string,
    whatsapp: PropTypes.string,
  }).isRequired,
};

export default SocialConnect;
