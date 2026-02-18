import React, { useState } from 'react';

const NamePage = ({ onNext, onBack, nativeLang }) => {
    // Constants
    const isFrench = nativeLang === 'french';
    const [name, setName] = useState('');

    // Dynamic Text
    const headerText = isFrench
        ? "Comment t'appelles-tu ? 👨🏽👧🏽"
        : "What is your name? 👨🏽👧🏽";

    const labelText = isFrench ? "Nom complet" : "Full name";
    const placeholderText = isFrench ? "ex. Jean Dupont" : "e.g. John Doe";
    const buttonText = isFrench ? 'Continuer' : 'Continue';

    return (
        <div style={{
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f8fafc',
        }}>
            {/* Top Bar with Progress */}
            <div style={{
                padding: '1rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                backgroundColor: '#f8fafc',
                position: 'sticky',
                top: 0,
                zIndex: 50
            }}>
                <button
                    onClick={onBack}
                    style={{
                        background: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        color: '#0f172a',
                        padding: '0.5rem',
                        borderRadius: '50%',
                        border: 'none'
                    }}>
                    ←
                </button>
                <div style={{ flex: 1, height: '8px', backgroundColor: '#e2e8f0', borderRadius: '99px' }}>
                    <div style={{
                        width: '15%', // Started a new progress bar context
                        height: '100%',
                        backgroundColor: '#0255d4',
                        borderRadius: '99px'
                    }} />
                </div>
            </div>

            {/* Content Container */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                maxWidth: '500px',
                margin: '0 auto',
                padding: '2rem 1.5rem',
            }}>
                <h1 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#0f172a',
                    marginBottom: '2rem',
                    textAlign: 'left'
                }}>
                    {headerText}
                </h1>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                    <label style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#64748b'
                    }}>
                        {labelText}
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={placeholderText}
                        style={{
                            padding: '1rem',
                            borderRadius: '16px',
                            border: '2px solid #e2e8f0',
                            fontSize: '1.1rem',
                            width: '100%',
                            outline: 'none',
                            backgroundColor: 'white',
                            color: '#0f172a'
                        }}
                    />
                </div>

                {/* Continue Button */}
                <button
                    onClick={() => onNext(name)}
                    disabled={!name.trim()}
                    style={{
                        width: '100%',
                        backgroundColor: !name.trim() ? '#cbd5e1' : '#0255d4',
                        color: 'white',
                        padding: '1.125rem',
                        borderRadius: '9999px',
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        border: 'none',
                        cursor: !name.trim() ? 'not-allowed' : 'pointer',
                        marginTop: 'auto',
                        boxShadow: !name.trim() ? 'none' : '0 10px 15px -3px rgba(0, 86, 210, 0.3)'
                    }}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default NamePage;
