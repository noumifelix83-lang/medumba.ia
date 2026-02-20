import { useState } from 'react';

const ForgotPasswordPage = ({ onNext, onBack, nativeLang }) => {
    const isFrench = nativeLang === 'french';
    const [email, setEmail] = useState('');

    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const t = {
        title:    isFrench ? 'Mot de passe oublié 🔑'                                                              : 'Forgot Password 🔑',
        subtitle: isFrench ? 'Entrez votre adresse e-mail pour recevoir un code OTP et réinitialiser votre mot de passe.'
                           : 'Enter your email address to get an OTP code to reset your password.',
        label:    isFrench ? 'Adresse e-mail'           : 'Email address',
        ph:       isFrench ? 'ex. nom@exemple.com'      : 'e.g. name@example.com',
        btn:      isFrench ? 'Continuer'                : 'Continue',
    };

    return (
        <div style={{
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f8fafc',
        }}>
            {/* Top bar */}
            <div style={{
                padding: '1rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                zIndex: 50,
                backgroundColor: '#f8fafc',
            }}>
                <button onClick={onBack} style={{
                    background: 'none', border: 'none',
                    fontSize: '1.5rem', cursor: 'pointer',
                    color: '#0f172a', padding: '0.5rem', borderRadius: '50%',
                }}>←</button>
            </div>

            {/* Content */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                maxWidth: '480px',
                margin: '0 auto',
                padding: '1.5rem 1.5rem 2.5rem',
            }}>
                <h1 style={{
                    fontSize: '1.6rem', fontWeight: '800',
                    color: '#0f172a', marginBottom: '0.75rem',
                }}>
                    {t.title}
                </h1>
                <p style={{
                    fontSize: '0.95rem', color: '#64748b',
                    lineHeight: '1.6', marginBottom: '2rem', fontWeight: '500',
                }}>
                    {t.subtitle}
                </p>

                {/* Email input */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                    <label style={{ fontSize: '0.95rem', fontWeight: '600', color: '#64748b' }}>
                        {t.label}
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.ph}
                        style={{
                            padding: '1rem',
                            borderRadius: '16px',
                            border: `2px solid ${isValid ? '#0056D2' : '#e2e8f0'}`,
                            fontSize: '1rem',
                            width: '100%',
                            outline: 'none',
                            backgroundColor: '#fff',
                            color: '#0f172a',
                            fontFamily: 'inherit',
                            transition: 'border-color 0.2s',
                        }}
                    />
                </div>

                {/* Continue */}
                <button
                    onClick={() => onNext(email)}
                    disabled={!isValid}
                    style={{
                        width: '100%',
                        backgroundColor: isValid ? '#0056D2' : '#cbd5e1',
                        color: '#fff',
                        padding: '1.1rem',
                        borderRadius: '9999px',
                        fontSize: '1rem',
                        fontWeight: '700',
                        border: 'none',
                        cursor: isValid ? 'pointer' : 'not-allowed',
                        boxShadow: isValid ? '0 8px 20px rgba(0,86,210,0.3)' : 'none',
                        letterSpacing: '0.4px',
                        fontFamily: 'inherit',
                        marginTop: 'auto',
                    }}
                >
                    {t.btn}
                </button>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
