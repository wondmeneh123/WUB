import { MdLogout } from "react-icons/md";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-6">
            <MdLogout size={40} className="text-[#E91E63] ml-2" />
          </div>

          <h3 className="text-2xl font-black text-gray-800 mb-2">Logout</h3>
          <p className="text-gray-500 font-medium mb-8">
            Are you sure you want to log out of your account?
          </p>

          <div className="flex flex-col w-full gap-3">
            <button
              onClick={onConfirm}
              className="w-full py-4 bg-[#E91E63] text-white rounded-2xl font-black text-lg shadow-lg shadow-pink-200 active:scale-95 transition-all"
            >
              Yes, Log Me Out
            </button>
            <button
              onClick={onClose}
              className="w-full py-4 bg-gray-50 text-gray-400 rounded-2xl font-bold text-lg active:scale-95 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
