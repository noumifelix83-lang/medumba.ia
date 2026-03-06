import logo from '../assets/logo.png';

const B = '#1B4FD8';

const WelcomePage = ({ onNext, onLogin }) => (
    <div style={{
        width: '100%', minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: '3rem 2rem 2.5rem',
        textAlign: 'center',
        fontFamily: "'Outfit', system-ui, sans-serif",
    }}>
        <style>{`
            @keyframes welcome-fade { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
            @keyframes badge-pop    { 0%{transform:scale(0.7);opacity:0;} 70%{transform:scale(1.08);} 100%{transform:scale(1);opacity:1;} }
        `}</style>

        {/* Logo */}
        <img src={logo} alt="Medumba" style={{ width: '100px', height: 'auto', marginBottom: '1.5rem', animation: 'welcome-fade 0.5s ease-out both' }} />

        {/* Heritage badge */}
        <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            backgroundColor: '#eff6ff', border: '1.5px solid #bfdbfe',
            borderRadius: '99px', padding: '0.35rem 1rem',
            fontSize: '0.78rem', fontWeight: '800', color: B,
            letterSpacing: '0.3px', marginBottom: '1.25rem',
            animation: 'badge-pop 0.5s cubic-bezier(0.175,0.885,0.32,1.275) 0.1s both',
        }}>
            🇨🇲 Heritage Learner Edition
        </div>

        {/* Title + tagline — centered, fills remaining space */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', animation: 'welcome-fade 0.5s ease-out 0.2s both' }}>
            <h1 style={{
                fontSize: '2.4rem', fontWeight: '900', color: '#0f172a',
                marginBottom: '1rem', letterSpacing: '-0.03em', lineHeight: 1.15,
            }}>
                La langue de votre<br />
                <span style={{ color: B }}>famille</span>,<br />
                redécouverte.
            </h1>
            <p style={{
                fontSize: '1rem', fontWeight: '500', color: '#64748b',
                lineHeight: 1.7, maxWidth: '290px', margin: '0 auto 1.5rem',
            }}>
                Des milliers de locuteurs d'héritage reconnectent avec le Medumba — chaque jour, à leur propre rythme.
            </p>

            {/* Trust pills */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                {['🏡 Famille', '🌍 Culture', '🎵 Tradition'].map(label => (
                    <span key={label} style={{
                        backgroundColor: '#f1f5f9', borderRadius: '99px',
                        padding: '0.3rem 0.9rem', fontSize: '0.8rem',
                        fontWeight: '700', color: '#475569',
                    }}>{label}</span>
                ))}
            </div>
        </div>

        {/* Action buttons */}
        <div style={{ width: '100%', maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '0.85rem', animation: 'welcome-fade 0.5s ease-out 0.35s both' }}>
            <button onClick={onNext} style={{
                width: '100%', backgroundColor: B, color: '#fff',
                padding: '1.15rem', borderRadius: '9999px',
                fontSize: '1rem', fontWeight: '800', border: 'none',
                cursor: 'pointer', letterSpacing: '0.4px',
                boxShadow: '0 8px 24px rgba(27,79,216,0.35)',
            }}>
                COMMENCER MON VOYAGE
            </button>
            <button onClick={onLogin} style={{
                width: '100%', backgroundColor: '#eff6ff', color: B,
                padding: '1.1rem', borderRadius: '9999px',
                fontSize: '1rem', fontWeight: '700', border: '2px solid #bfdbfe',
                cursor: 'pointer', letterSpacing: '0.3px',
            }}>
                J'AI DÉJÀ UN COMPTE
            </button>
        </div>
    </div>
);

export default WelcomePage;
