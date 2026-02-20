import { useState } from 'react';
import logo from '../assets/logo.png';

const LoginPage = ({ onLogin, onBack, onForgotPassword, nativeLang }) => {
    const isFrench = nativeLang === 'french';
    const [email, setEmail]               = useState('');
    const [password, setPassword]         = useState('');
    const [rememberMe, setRememberMe]     = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && password.length >= 6;

    const t = {
        title:       isFrench ? 'Bon retour 👋🏽'          : 'Hello There 👋🏽',
        emailLabel:  isFrench ? 'Adresse e-mail'           : 'Email address',
        emailPH:     isFrench ? 'ex. nom@exemple.com'      : 'e.g. name@example.com',
        passLabel:   isFrench ? 'Mot de passe'             : 'Password',
        passPH:      isFrench ? 'Entrez votre mot de passe': 'Enter your password',
        show:        isFrench ? 'Afficher'                 : 'Show',
        hide:        isFrench ? 'Masquer'                  : 'Hide',
        remember:    isFrench ? 'Se souvenir de moi'       : 'Remember me',
        forgot:      isFrench ? 'Mot de passe oublié ?'    : 'Forgot Password?',
        signIn:      isFrench ? 'Se connecter'             : 'Sign In',
    };

    const inputStyle = {
        padding: '1rem',
        borderRadius: '16px',
        border: '2px solid #e2e8f0',
        fontSize: '1rem',
        width: '100%',
        outline: 'none',
        backgroundColor: '#fff',
        color: '#0f172a',
        fontFamily: 'inherit',
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
                backgroundColor: '#f8fafc',
                position: 'sticky',
                top: 0,
                zIndex: 50,
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
                padding: '1rem 1.5rem 2.5rem',
            }}>
                {/* Logo */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <img src={logo} alt="Medumba" style={{ width: '56px', height: 'auto' }} />
                </div>

                <h1 style={{
                    fontSize: '1.75rem', fontWeight: '800',
                    color: '#0f172a', marginBottom: '2rem', textAlign: 'left',
                }}>
                    {t.title}
                </h1>

                {/* Email */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    <label style={{ fontSize: '0.95rem', fontWeight: '600', color: '#64748b' }}>
                        {t.emailLabel}
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.emailPH}
                        style={inputStyle}
                    />
                </div>

                {/* Password */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.95rem', fontWeight: '600', color: '#64748b' }}>
                        {t.passLabel}
                    </label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={t.passPH}
                            style={{ ...inputStyle, paddingRight: '5rem' }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute', right: '1rem', top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none', border: 'none',
                                color: '#0056D2', fontWeight: '700',
                                cursor: 'pointer', fontSize: '0.85rem',
                                fontFamily: 'inherit',
                            }}
                        >
                            {showPassword ? t.hide : t.show}
                        </button>
                    </div>
                </div>

                {/* Remember me + Forgot password */}
                <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', marginBottom: '2rem',
                }}>
                    <label style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        cursor: 'pointer', fontSize: '0.9rem', color: '#64748b',
                        userSelect: 'none', fontWeight: '500',
                    }}>
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            style={{ width: '17px', height: '17px', accentColor: '#0056D2', cursor: 'pointer' }}
                        />
                        {t.remember}
                    </label>
                    <button
                        onClick={onForgotPassword}
                        style={{
                            background: 'none', border: 'none',
                            color: '#0056D2', fontWeight: '700',
                            fontSize: '0.9rem', cursor: 'pointer',
                            fontFamily: 'inherit',
                        }}
                    >
                        {t.forgot}
                    </button>
                </div>

                {/* Sign in */}
                <button
                    onClick={() => onLogin({ email, password, rememberMe })}
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
                    {t.signIn}
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
