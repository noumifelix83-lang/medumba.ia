import welcomeVec from '../assets/welcom vector.png';

const B = '#1B4FD8';

const PasswordResetSuccessPage = ({ onNext, nativeLang }) => {
    const isFr = nativeLang === 'french';

    return (
        <div style={{
            width: '100%', minHeight: '100vh',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center',
            padding: '2.5rem 1.5rem', backgroundColor: '#fff', textAlign: 'center',
            fontFamily: "'Outfit', system-ui, sans-serif",
        }}>
            <style>{`
                @keyframes rs-pop  { 0%{transform:scale(0.7);opacity:0;} 70%{transform:scale(1.06);} 100%{transform:scale(1);opacity:1;} }
                @keyframes rs-fade { from{opacity:0;transform:translateY(14px);} to{opacity:1;transform:translateY(0);} }
            `}</style>

            {/* "Hurray!!" speech bubble */}
            <div style={{
                backgroundColor: '#f8fafc', border: '1.5px solid #e2e8f0',
                borderRadius: '20px 20px 20px 4px',
                padding: '0.7rem 1.5rem', marginBottom: '1rem',
                fontSize: '1rem', fontWeight: '700', color: '#0f172a',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                animation: 'rs-pop 0.5s cubic-bezier(0.175,0.885,0.32,1.275) both',
            }}>
                {isFr ? 'Hourra !!' : 'Hurray!!'}
            </div>

            {/* Welcom vector */}
            <div style={{ width: '100%', maxWidth: '320px', marginBottom: '1.5rem', animation: 'rs-pop 0.55s cubic-bezier(0.175,0.885,0.32,1.275) 0.1s both' }}>
                <img src={welcomeVec} alt="Welcome back" style={{ width: '100%', height: 'auto', display: 'block' }} />
            </div>

            {/* Heading */}
            <h1 style={{
                fontSize: '2rem', fontWeight: '900', color: B,
                marginBottom: '0.6rem', letterSpacing: '-0.02em',
                animation: 'rs-fade 0.5s ease-out 0.2s both',
            }}>
                {isFr ? 'Bon retour ! 👋' : 'Welcome back!'}
            </h1>

            {/* Subtext */}
            <p style={{
                fontSize: '1rem', color: '#64748b', maxWidth: '280px',
                lineHeight: 1.6, marginBottom: '2.5rem', fontWeight: '500',
                animation: 'rs-fade 0.5s ease-out 0.3s both',
            }}>
                {isFr
                    ? 'Vous avez réinitialisé et créé un nouveau mot de passe avec succès.'
                    : 'You have successfully reset and created a new password.'}
            </p>

            {/* CTA */}
            <button onClick={onNext} style={{
                width: '100%', maxWidth: '340px',
                backgroundColor: B, color: '#fff',
                padding: '1.1rem', borderRadius: '9999px',
                fontSize: '1.05rem', fontWeight: '800', border: 'none',
                cursor: 'pointer', boxShadow: '0 8px 24px rgba(27,79,216,0.3)',
                letterSpacing: '0.5px',
                animation: 'rs-fade 0.5s ease-out 0.4s both',
            }}>
                {isFr ? 'CONTINUER VERS L\'ACCUEIL' : 'CONTINUE TO HOME'}
            </button>
        </div>
    );
};

export default PasswordResetSuccessPage;
