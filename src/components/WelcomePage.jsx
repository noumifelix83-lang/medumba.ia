import logo from '../assets/logo.png';
import welcomeVec from '../assets/welcom vector.png';

const WelcomePage = ({ onNext, onLogin }) => (
    <div style={{
        width: '100%', minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: '2.5rem 2rem 2.5rem',
        textAlign: 'center',
        fontFamily: "'Outfit', system-ui, sans-serif",
    }}>
        <style>{`
            @keyframes welcome-fade { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
            @keyframes bubble-pop   { 0% { transform:scale(0.7); opacity:0; } 70% { transform:scale(1.06); } 100% { transform:scale(1); opacity:1; } }
        `}</style>

        {/* Logo */}
        <img src={logo} alt="Medumba" style={{ width: '90px', height: 'auto', animation: 'welcome-fade 0.5s ease-out both' }} />

        {/* Hero — welcom vector with text overlaid on the speech bubbles */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '340px', animation: 'welcome-fade 0.55s ease-out 0.1s both' }}>
            <img src={welcomeVec} alt="Students learning" style={{ width: '100%', height: 'auto', display: 'block' }} />

            {/* Text on the BOY's orange speech bubble (upper-left area of the image ~30% from left, 5% from top) */}
            <div style={{
                position: 'absolute', top: '4%', left: '28%',
                backgroundColor: '#d97706', color: '#fff',
                borderRadius: '10px', padding: '0.22rem 0.65rem',
                fontSize: '0.72rem', fontWeight: '900',
                letterSpacing: '0.2px', whiteSpace: 'nowrap',
                boxShadow: '0 2px 8px rgba(217,119,6,0.35)',
                animation: 'bubble-pop 0.5s cubic-bezier(0.175,0.885,0.32,1.275) 0.35s both',
            }}>
                🇨🇲 Medumba
            </div>

            {/* Text on the GIRL's red speech bubble (upper-right area ~62% from left, 3% from top) */}
            <div style={{
                position: 'absolute', top: '3%', right: '5%',
                backgroundColor: '#dc2626', color: '#fff',
                borderRadius: '10px', padding: '0.22rem 0.65rem',
                fontSize: '0.72rem', fontWeight: '900',
                letterSpacing: '0.2px', whiteSpace: 'nowrap',
                boxShadow: '0 2px 8px rgba(220,38,38,0.35)',
                animation: 'bubble-pop 0.5s cubic-bezier(0.175,0.885,0.32,1.275) 0.5s both',
            }}>
                Let&apos;s learn! 🌍
            </div>
        </div>

        {/* Title + tagline */}
        <div style={{ animation: 'welcome-fade 0.5s ease-out 0.2s both' }}>
            <h1 style={{
                fontSize: '2.1rem', fontWeight: '900', color: '#0056D2',
                marginBottom: '0.6rem', letterSpacing: '-0.03em',
            }}>
                Medumba
            </h1>
            <p style={{
                fontSize: '1rem', fontWeight: '600', color: '#64748b',
                lineHeight: 1.6, maxWidth: '280px', margin: '0 auto',
            }}>
                Learn the Bamileke language of Cameroon — free, forever.
            </p>
        </div>

        {/* Action buttons */}
        <div style={{ width: '100%', maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '0.85rem', animation: 'welcome-fade 0.5s ease-out 0.3s both' }}>
            <button onClick={onNext} style={{
                width: '100%', backgroundColor: '#0056D2', color: '#fff',
                padding: '1.1rem', borderRadius: '9999px',
                fontSize: '1rem', fontWeight: '800', border: 'none',
                cursor: 'pointer', letterSpacing: '0.4px',
                boxShadow: '0 6px 20px rgba(0,86,210,0.35)',
                transition: 'transform 0.15s, box-shadow 0.15s',
            }}>
                GET STARTED
            </button>
            <button onClick={onLogin} style={{
                width: '100%', backgroundColor: '#eff6ff', color: '#0056D2',
                padding: '1.1rem', borderRadius: '9999px',
                fontSize: '1rem', fontWeight: '700', border: '2px solid #bfdbfe',
                cursor: 'pointer', letterSpacing: '0.4px',
                transition: 'transform 0.15s',
            }}>
                I ALREADY HAVE AN ACCOUNT
            </button>
        </div>
    </div>
);

export default WelcomePage;
