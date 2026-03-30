import { useState } from 'react';

const B = '#1B4FD8';

const EmailPage = ({ onNext, onBack, nativeLang }) => {
    const isFrench = nativeLang === 'french';
    const [email, setEmail] = useState('');

    const h   = isFrench ? "Quel est ton e-mail ? ✉️" : "What is your email address? ✉️";
    const lbl = isFrench ? "Email" : "Email";
    const ph  = isFrench ? "ex. jean.dupont@email.com" : "e.g. john.doe@email.com";
    const btn = isFrench ? 'Continuer' : 'Continue';
    const ok  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    return (
        <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
            <div style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 50 }}>
                <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#0f172a', padding: '0.25rem 0.5rem' }}>←</button>
                <div style={{ flex: 1, height: '6px', backgroundColor: '#e2e8f0', borderRadius: '99px' }}>
                    <div style={{ width: '88%', height: '100%', backgroundColor: B, borderRadius: '99px' }} />
                </div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '500px', margin: '0 auto', padding: '2rem 1.5rem 2.5rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a', marginBottom: '2.5rem' }}>{h}</h1>
                <div style={{ marginBottom: '2.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#64748b', marginBottom: '0.5rem' }}>{lbl}</label>
                    <input
                        type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={ph}
                        style={{ border: 'none', borderBottom: `2px solid ${B}`, padding: '0.5rem 0', fontSize: '1.15rem', fontWeight: '600', width: '100%', outline: 'none', backgroundColor: 'transparent', color: '#0f172a' }}
                    />
                </div>
                <div style={{ flex: 1 }} />
                <button onClick={() => onNext(email)} disabled={!ok} style={{ width: '100%', backgroundColor: ok ? B : '#cbd5e1', color: '#fff', padding: '1.1rem', borderRadius: '9999px', fontSize: '1.05rem', fontWeight: '700', border: 'none', cursor: ok ? 'pointer' : 'not-allowed', boxShadow: ok ? '0 8px 24px rgba(27,79,216,0.3)' : 'none', letterSpacing: '0.3px' }}>
                    {btn}
                </button>
            </div>
        </div>
    );
};

export default EmailPage;
