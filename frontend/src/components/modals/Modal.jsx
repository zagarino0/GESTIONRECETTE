import React from 'react';

const Modal = ({ isOpen, onClose, children , className}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40">
      <div className="fixed inset-0 bg-neutral-700/70 bg-opacity-75 transition-opacity" onClick={onClose} />
      <div className={`bg-[#212122] rounded-md  z-50 ${className}`}>{children}</div>
    </div>
  );
};

export default Modal;
