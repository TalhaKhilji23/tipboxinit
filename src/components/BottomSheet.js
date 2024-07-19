import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import SwipeableBottomSheet from '@sergeymyssak/swipeable-bottom-sheet';
import '@sergeymyssak/swipeable-bottom-sheet/lib/min.css';

const BottomSheet = ({ isOpen, disableSwipe = false, onChange, children, containerClassName, bodyClassName }) => {
  const bottomSheetRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isOpen && bottomSheetRef.current && !bottomSheetRef.current.contains(event.target)) {
        onChange(false); // Close bottom sheet only if clicked outside of it
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onChange]);

  return (
    <SwipeableBottomSheet
      isOpen={isOpen}
      onChange={onChange}
      swipeableViewsProps={{ disabled: disableSwipe }}
      containerClassName={classNames('custom-bottom-sheet', containerClassName)}
      bodyClassName={classNames('custom-bottom-sheet__body', bodyClassName)}
    >
      <div ref={bottomSheetRef}>{children}</div>
    </SwipeableBottomSheet>
  );
};

export default BottomSheet;
