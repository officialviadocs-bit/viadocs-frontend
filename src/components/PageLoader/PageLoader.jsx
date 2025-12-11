import React from 'react';

const PageLoader = ({ visible = true }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: visible ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255,255,255,0.85)',
        zIndex: 9999,
      }}
    >
      <div style={{
        width: 64,
        height: 64,
        borderRadius: 32,
        border: '6px solid rgba(63,81,181,0.15)',
        borderTop: '6px solid #3F51B5',
        animation: 'spin 0.8s linear infinite'
      }} />

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default PageLoader;
