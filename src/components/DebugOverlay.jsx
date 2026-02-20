import React from 'react';

const DebugOverlay = ({ step, achieveGoals, dailyGoal, email, password }) => {
    return (
        <div style={{
            position: 'fixed',
            bottom: '10px',
            left: '10px',
            backgroundColor: 'rgba(0,0,0,0.8)',
            color: '#0f0',
            padding: '10px',
            borderRadius: '8px',
            zIndex: 9999,
            fontSize: '12px',
            pointerEvents: 'none',
            fontFamily: 'monospace'
        }}>
            <div>Current Step: {step}</div>
            <div>Achieve Goals: {JSON.stringify(achieveGoals)}</div>
            <div>Daily Goal: {JSON.stringify(dailyGoal)}</div>
            <div>Email: {email}</div>
            <div>Password: {password ? '********' : ''}</div>
            <div>Time: {new Date().toLocaleTimeString()}</div>
        </div>
    );
};

export default DebugOverlay;
