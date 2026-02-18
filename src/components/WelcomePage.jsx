import React from 'react';
import logo from '../assets/logo.png';

const WelcomePage = ({ onNext }) => {
    return (
        <div style={{
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem',
            backgroundColor: 'var(--color-white)',
            textAlign: 'center'
        }}>
            {/* Logo Section */}
            <div style={{ marginBottom: '2.5rem' }}>
                <img
                    src={logo}
                    alt="Medumba Logo"
                    style={{ width: '180px', height: 'auto' }}
                />
                <h1 style={{
                    marginTop: '1rem',
                    fontSize: '2rem',
                    color: '#1e293b',
                    fontWeight: '700'
                }}>Medumba</h1>
            </div>

            {/* Text Section */}
            <div style={{ maxWidth: '400px', marginBottom: '3rem' }}>
                <p style={{
                    fontSize: '1.25rem',
                    lineHeight: '1.6',
                    color: 'var(--color-text-grey)',
                    fontWeight: '400'
                }}>
                    Learn Languages whenever and wherever you want. It's free forever.
                </p>
            </div>

            {/* Buttons Section */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                width: '100%',
                maxWidth: '300px'
            }}>
                {/* Main Blue Button */}
                <button
                    onClick={onNext}
                    style={{
                        backgroundColor: 'var(--color-primary)',
                        color: 'var(--color-white)',
                        padding: '1rem 2rem',
                        borderRadius: 'var(--radius-button)',
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        boxShadow: '0 4px 6px -1px rgba(0, 86, 210, 0.4)'
                    }}>
                    GET STARTED
                </button>

                {/* White Button */}
                <button style={{
                    backgroundColor: 'var(--color-white)',
                    color: 'var(--color-primary)',
                    padding: '1rem 2rem',
                    borderRadius: 'var(--radius-button)',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    border: '2px solid var(--color-primary)'
                }}>
                    I ALREADY HAVE AN ACCOUNT
                </button>
            </div>
        </div>
    );
};

export default WelcomePage;
