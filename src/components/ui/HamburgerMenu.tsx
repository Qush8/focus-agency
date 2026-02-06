'use client';

import React, { useState, useEffect } from 'react';
import styles from './HamburgerMenu.module.css';

interface HamburgerMenuProps {
  /**
   * Optional controlled state. If provided, the component will use this instead of internal state.
   */
  isOpen?: boolean;
  /**
   * Optional callback when the menu is toggled.
   */
  onToggle?: (isOpen: boolean) => void;
  /**
   * Optional class name for the container.
   */
  className?: string;
  /**
   * Optional style override for the container
   */
  style?: React.CSSProperties;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  isOpen: controlledIsOpen,
  onToggle,
  className = '',
  style,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [hasToggled, setHasToggled] = useState(false);
  
  // Determine if we are controlled or uncontrolled
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  // Sync internal state with controlled state if needed, to handle initial toggle check
  useEffect(() => {
    if (isControlled) {
       // If controlled state changes, we consider it toggled (if it's not the initial mount value, 
       // but distinguishing that is hard. Simpler to just set hasToggled if isOpen is true, 
       // or if it changes. For now, let's just set hasToggled on interaction or change).
       // Actually, if it starts as true, we want animation?
       // If starts true, we probably want 'isOpen' class immediately.
       // If starts false, we want no class.
       if (controlledIsOpen) {
         setHasToggled(true);
       }
    }
  }, [controlledIsOpen, isControlled]);

  const handleToggle = () => {
    const newState = !isOpen;
    setHasToggled(true);
    if (!isControlled) {
      setInternalIsOpen(newState);
    }
    if (onToggle) {
      onToggle(newState);
    }
  };

  // Determine animation class
  let animationClass = '';
  if (isOpen) {
    animationClass = styles.isOpen;
  } else if (hasToggled) {
    // Only apply close animation if we have interacted with it
    animationClass = styles.isClosed;
  }
  // If not open and hasn't toggled, no class -> static default styles

  return (
    <div 
      onClick={handleToggle}
      className={`${styles.hamburglar} ${animationClass} ${className}`}
      style={style}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleToggle();
        }
      }}
    >
      <div className={styles.burgerIcon}>
        <div className={styles.burgerContainer}>
          <span className={styles.burgerBunTop}></span>
          <span className={styles.burgerFilling}></span>
          <span className={styles.burgerBunBot}></span>
        </div>
      </div>

      {/* svg ring container */}
      <div className={styles.burgerRing}>
        <svg className={styles.svgRing}>
          <path
            className={styles.path}
            fill="none"
            stroke="#fff"
            strokeMiterlimit="10"
            strokeWidth="4"
            d="M 34 2 C 16.3 2 2 16.3 2 34 s 14.3 32 32 32 s 32 -14.3 32 -32 S 51.7 2 34 2"
          />
        </svg>
      </div>

      {/* the masked path that animates the fill to the ring */}
      <svg width="0" height="0">
        <mask id="hamburglar-mask">
          <path
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="#ff0000"
            strokeMiterlimit="10"
            strokeWidth="4"
            d="M 34 2 c 11.6 0 21.8 6.2 27.4 15.5 c 2.9 4.8 5 16.5 -9.4 16.5 h -4"
          />
        </mask>
      </svg>

      <div className={styles.pathBurger}>
        <div className={styles.animatePath}>
          <div className={styles.pathRotation}></div>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
