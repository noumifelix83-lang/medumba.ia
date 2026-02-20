import logo from '../assets/logo.png';

const PasswordResetSuccessPage = ({ onNext, nativeLang }) => {
    const isFrench = nativeLang === 'french';

    const t = {
        title:   isFrench ? 'Bon retour ! 🎉'                                                     : 'Welcome back! 🎉',
        body:    isFrench ? 'Vous avez réinitialisé et créé un nouveau mot de passe avec succès.'  : 'You have successfully reset and created a new password.',
        btn:     isFrench ? 'Continuer'                                                            : 'Continue',
    };

    return (
        <div style={{
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f8fafc',
            padding: '2rem',
            textAlign: 'center',
        }}>
            <style>{`
                @keyframes reset-bounce {
                    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-16px); }
                    60% { transform: translateY(-8px); }
                }
                @keyframes reset-pop {
                    0%   { transform: scale(0.6); opacity: 0; }
                    60%  { transform: scale(1.1); opacity: 1; }
                    100% { transform: scale(1); }
                }
            `}</style>

            {/* Animated check circle */}
            <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #0056D2, #38bdf8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '2rem',
                boxShadow: '0 12px 32px rgba(0,86,210,0.3)',
                animation: 'reset-pop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both',
            }}>
                <span style={{ fontSize: '2.5rem' }}>✓</span>
            </div>

            {/* Logo */}
            <img src={logo} alt="Medumba" style={{ width: '52px', height: 'auto', marginBottom: '1.5rem' }} />

            {/* Title */}
            <h1 style={{
                fontSize: '2rem',
                fontWeight: '800',
                color: '#0056D2',
                marginBottom: '0.75rem',
                animation: 'reset-bounce 2s infinite',
                letterSpacing: '-0.02em',
            }}>
                {t.title}
            </h1>

            {/* Body */}
            <p style={{
                fontSize: '1rem',
                color: '#64748b',
                maxWidth: '280px',
                lineHeight: '1.65',
                marginBottom: '3rem',
                fontWeight: '500',
            }}>
                {t.body}
            </p>

            {/* CTA */}
            <button
                onClick={onNext}
                style={{
                    width: '100%',
                    maxWidth: '340px',
                    backgroundColor: '#0056D2',
                    color: '#fff',
                    padding: '1.1rem',
                    borderRadius: '9999px',
                    fontSize: '1rem',
                    fontWeight: '700',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(0,86,210,0.3)',
                    letterSpacing: '0.4px',
                    fontFamily: 'inherit',
                }}
            >
                {t.btn}
            </button>
        </div>
    );
};

export default PasswordResetSuccessPage;
