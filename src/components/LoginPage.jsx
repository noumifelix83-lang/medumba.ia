import { useState } from 'react';

const B = '#1B4FD8';

const Eye = ({ crossed }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={B} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
        {crossed && <line x1="1" y1="1" x2="23" y2="23"/>}
    </svg>
);

const LoginPage = ({ onLogin, onBack, onForgotPassword, nativeLang }) => {
    const isFrench = nativeLang === 'french';
    const [email, setEmail]           = useState('');
    const [password, setPassword]     = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPw, setShowPw]         = useState(false);

    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && password.length >= 6;

    const t = {
        title:    isFrench ? 'Bon retour 👋🏽'           : 'Hello there 👋',
        emLbl:    isFrench ? 'Adresse e-mail'            : 'Email',
        emPH:     isFrench ? 'ex. nom@exemple.com'       : 'e.g. name@example.com',
        pwLbl:    isFrench ? 'Mot de passe'              : 'Password',
        pwPH:     isFrench ? 'Entrez votre mot de passe' : 'Enter your password',
        remember: isFrench ? 'Se souvenir de moi'        : 'Remember me',
        forgot:   isFrench ? 'Mot de passe oublié ?'     : 'Forgot Password?',
        signIn:   isFrench ? 'SE CONNECTER'              : 'SIGN IN',
    };

    const underline = { border: 'none', borderBottom: `2px solid ${B}`, padding: '0.5rem 0', fontSize: '1.1rem', fontWeight: '600', width: '100%', outline: 'none', backgroundColor: 'transparent', color: '#0f172a', fontFamily: 'inherit' };

    return (
        <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
            {/* Top bar */}
            <div style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', backgroundColor: '#fff', position: 'sticky', top: 0, zIndex: 50 }}>
                <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#0f172a', padding: '0.25rem 0.5rem' }}>←</button>
            </div>

            {/* Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '480px', margin: '0 auto', padding: '1rem 1.5rem 2.5rem' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a', marginBottom: '2.5rem' }}>{t.title}</h1>

                {/* Email */}
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#64748b', marginBottom: '0.4rem' }}>{t.emLbl}</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.emPH} style={underline} />
                </div>

                {/* Password */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#64748b', marginBottom: '0.4rem' }}>{t.pwLbl}</label>
                    <div style={{ position: 'relative' }}>
                        <input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t.pwPH} style={{ ...underline, paddingRight: '2.5rem' }} />
                        <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            <Eye crossed={showPw} />
                        </button>
                    </div>
                </div>

                {/* Remember me + Forgot */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', color: '#64748b', userSelect: 'none', fontWeight: '500' }}>
                        <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} style={{ width: '17px', height: '17px', accentColor: B, cursor: 'pointer' }} />
                        {t.remember}
                    </label>
                    <button onClick={onForgotPassword} style={{ background: 'none', border: 'none', color: B, fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                        {t.forgot}
                    </button>
                </div>

                <div style={{ flex: 1 }} />
                <button onClick={() => onLogin({ email, password, rememberMe })} disabled={!isValid} style={{ width: '100%', backgroundColor: isValid ? B : '#cbd5e1', color: '#fff', padding: '1.1rem', borderRadius: '9999px', fontSize: '1.05rem', fontWeight: '700', border: 'none', cursor: isValid ? 'pointer' : 'not-allowed', boxShadow: isValid ? '0 8px 24px rgba(27,79,216,0.3)' : 'none', letterSpacing: '0.5px' }}>
                    {t.signIn}
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
