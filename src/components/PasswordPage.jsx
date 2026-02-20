import React, { useState } from 'react';

const PasswordPage = ({ onNext, onBack, nativeLang }) => {
    // Constants
    const isFrench = nativeLang === 'french';
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Dynamic Text
    const headerText = isFrench
        ? "Crée un mot de passe 🔒"
        : "Create a password 🔒";

    const labelText = isFrench ? "Mot de passe" : "Password";
    const placeholderText = isFrench ? "Minimum 6 caractères" : "Minimum 6 characters";
    const buttonText = isFrench ? 'C\'est parti !' : 'Let\'s go!';
    const showText = isFrench ? "Afficher" : "Show";
    const hideText = isFrench ? "Masquer" : "Hide";

    const isValidPassword = (password) => {
        return password.length >= 6;
    };

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
                        width: '60%', // Progress incremented from EmailPage (45%)
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

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem', position: 'relative' }}>
                    <label style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#64748b'
                    }}>
                        {labelText}
                    </label>
                    <div style={{ position: 'relative', width: '100%' }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={placeholderText}
                            style={{
                                padding: '1rem',
                                paddingRight: '4.5rem',
                                borderRadius: '16px',
                                border: '2px solid #e2e8f0',
                                fontSize: '1.1rem',
                                width: '100%',
                                outline: 'none',
                                backgroundColor: 'white',
                                color: '#0f172a'
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: '1rem',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                color: '#0255d4',
                                fontWeight: '600',
                                cursor: 'pointer',
                                fontSize: '0.9rem'
                            }}
                        >
                            {showPassword ? hideText : showText}
                        </button>
                    </div>
                </div>

                {/* Continue Button */}
                <button
                    onClick={() => onNext(password)}
                    disabled={!isValidPassword(password)}
                    style={{
                        width: '100%',
                        backgroundColor: !isValidPassword(password) ? '#cbd5e1' : '#0255d4',
                        color: 'white',
                        padding: '1.125rem',
                        borderRadius: '9999px',
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        border: 'none',
                        cursor: !isValidPassword(password) ? 'not-allowed' : 'pointer',
                        marginTop: 'auto',
                        boxShadow: !isValidPassword(password) ? 'none' : '0 10px 15px -3px rgba(0, 86, 210, 0.3)'
                    }}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default PasswordPage;
