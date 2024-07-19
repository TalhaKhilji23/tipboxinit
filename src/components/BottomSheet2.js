import { Sheet } from 'react-modal-sheet';
import { useState, useEffect, useRef } from 'react';

export default function BottomSheet2() {
  const [isOpen, setOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const startY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragging) {
        const dragDistance = startY.current - e.clientY;
        if (dragDistance > 50) { // Adjust the drag distance threshold as needed
          setOpen(true);
          setDragging(false);
        }
      }
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  const handleMouseDown = (e) => {
    startY.current = e.clientY;
    setDragging(true);
  };

  return (
    <>
      <div 
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-transparent text-black py-2 px-4 rounded-md font-bold text-3xl focus:outline-none focus:ring-2"
        onMouseDown={handleMouseDown}
      >
        <button>________</button>
      </div>

      <Sheet isOpen={isOpen} onClose={() => setOpen(false)}  className='w-[400px] mx-auto' snapPoints={[600]}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <div>View</div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  );
}
