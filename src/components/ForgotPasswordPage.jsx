import { useState } from 'react';

const B = '#1B4FD8';

const ForgotPasswordPage = ({ onNext, onBack, nativeLang }) => {
    const isFrench = nativeLang === 'french';
    const [email, setEmail] = useState('');

    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const t = {
        title: isFrench ? 'Mot de passe oublié 🔑' : 'Forgot Password 🔑',
        sub:   isFrench ? 'Entrez votre adresse e-mail pour recevoir un code OTP et réinitialiser votre mot de passe.' : 'Enter your email address to get an OTP code to reset your password.',
        lbl:   isFrench ? 'Email' : 'Email',
        ph:    isFrench ? 'ex. nom@exemple.com' : 'e.g. name@example.com',
        btn:   isFrench ? 'Continuer' : 'Continue',
    };

    return (
        <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
            <div style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', position: 'sticky', top: 0, zIndex: 50, backgroundColor: '#fff' }}>
                <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#0f172a', padding: '0.25rem 0.5rem' }}>←</button>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '480px', margin: '0 auto', padding: '1.5rem 1.5rem 2.5rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.75rem' }}>{t.title}</h1>
                <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: '1.6', marginBottom: '2.5rem', fontWeight: '500' }}>{t.sub}</p>

                <div style={{ marginBottom: '2.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#64748b', marginBottom: '0.5rem' }}>{t.lbl}</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.ph}
                        style={{ border: 'none', borderBottom: `2px solid ${B}`, padding: '0.5rem 0', fontSize: '1.1rem', fontWeight: '600', width: '100%', outline: 'none', backgroundColor: 'transparent', color: '#0f172a', fontFamily: 'inherit' }}
                    />
                </div>

                <div style={{ flex: 1 }} />
                <button onClick={() => onNext(email)} disabled={!ok} style={{ width: '100%', backgroundColor: ok ? B : '#cbd5e1', color: '#fff', padding: '1.1rem', borderRadius: '9999px', fontSize: '1.05rem', fontWeight: '700', border: 'none', cursor: ok ? 'pointer' : 'not-allowed', boxShadow: ok ? '0 8px 24px rgba(27,79,216,0.3)' : 'none', letterSpacing: '0.4px', fontFamily: 'inherit' }}>
                    {t.btn}
                </button>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
