import logo from '../assets/logo.png';

const WelcomePage = ({ onNext, onLogin }) => (
  <div style={{
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: '4rem 2rem 3rem',
    textAlign: 'center',
  }}>

    {/* Logo + title + tagline */}
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0',
    }}>
      <img
        src={logo}
        alt="Medumba"
        style={{ width: '160px', height: 'auto', marginBottom: '1.5rem' }}
      />
      <h1 style={{
        fontSize: '2.25rem',
        fontWeight: '800',
        color: '#0056D2',
        marginBottom: '1rem',
        letterSpacing: '-0.02em',
      }}>
        Medumba
      </h1>
      <p style={{
        fontSize: '1.1rem',
        fontWeight: '600',
        color: '#334155',
        lineHeight: '1.6',
        maxWidth: '300px',
      }}>
        Learn languages whenever and wherever you want. It&apos;s free and forever.
      </p>
    </div>

    {/* Action buttons */}
    <div style={{
      width: '100%',
      maxWidth: '360px',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    }}>
      <button
        onClick={onNext}
        style={{
          width: '100%',
          backgroundColor: '#0056D2',
          color: '#ffffff',
          padding: '1.1rem',
          borderRadius: '9999px',
          fontSize: '1rem',
          fontWeight: '700',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(0,86,210,0.35)',
          letterSpacing: '0.5px',
        }}
      >
        GET STARTED
      </button>

      <button
        onClick={onLogin}
        style={{
          width: '100%',
          backgroundColor: '#eff6ff',
          color: '#0056D2',
          padding: '1.1rem',
          borderRadius: '9999px',
          fontSize: '1rem',
          fontWeight: '700',
          border: '2px solid #bfdbfe',
          cursor: 'pointer',
          letterSpacing: '0.5px',
        }}
      >
        I ALREADY HAVE AN ACCOUNT
      </button>
    </div>
  </div>
);

export default WelcomePage;
