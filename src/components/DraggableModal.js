"use client";
import React, { useEffect, useState, useRef } from 'react';

const DraggableModal = ({ onClose }) => {
  const modalRef = useRef(null);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);

  const handleMouseDown = (e) => {
    setStartY(e.clientY);
  };

  const handleMouseMove = (e) => {
    if (startY !== 0) {
      const newY = e.clientY;
      const diffY = newY - startY;
      setCurrentY(diffY);
    }
  };

  const handleMouseUp = () => {
    if (currentY > 150) {
      onClose();
    }
    setStartY(0);
    setCurrentY(0);
  };

  useEffect(() => {
    const modalElement = modalRef.current;

    modalElement.addEventListener('mousedown', handleMouseDown);
    modalElement.addEventListener('mousemove', handleMouseMove);
    modalElement.addEventListener('mouseup', handleMouseUp);

    return () => {
      modalElement.removeEventListener('mousedown', handleMouseDown);
      modalElement.removeEventListener('mousemove', handleMouseMove);
      modalElement.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={modalRef}
      className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-lg shadow-lg p-4 transition-transform duration-300 ${
        currentY > 0 ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ transform: `translateY(${currentY}px)` }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Important Notification</h2>
        <button onClick={onClose} className="text-red-500">
          Close
        </button>
      </div>
      <p>This is an important notification. Drag this modal to half the screen.</p>
    </div>
  );
};

export default DraggableModal;
