import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';

const SplashScreen = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Start fade out after 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    // Call onFinish after animation completes
    const cleanup = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(cleanup);
    };
  }, [onFinish]);

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--color-white)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.5s ease-out',
        zIndex: 50
      }}
    >
      <div style={{
          animation: 'pulse 2s infinite ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
      }}>
        <img 
            src={logo} 
            alt="Medumba Logo" 
            style={{
                width: '120px', 
                height: 'auto',
                marginBottom: '1rem',
                filter: 'drop-shadow(0 10px 15px -3px rgba(0, 0, 0, 0.1))'
            }} 
        />
      </div>
      <style>{`
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
