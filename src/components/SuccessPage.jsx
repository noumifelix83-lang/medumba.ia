import maleTutor from '../assets/male_tutor.png';

const SuccessPage = ({ onNext, nativeLang }) => {
  const isFrench = nativeLang === 'french';

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem',
      backgroundColor: '#f8fafc',
      textAlign: 'center',
    }}>
      <style>{`
        @keyframes success-bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-18px); }
          60% { transform: translateY(-9px); }
        }
      `}</style>

      {/* Tutor illustration */}
      <img
        src={maleTutor}
        alt="Tutor"
        style={{
          width: '220px',
          height: 'auto',
          marginBottom: '2rem',
          filter: 'drop-shadow(0 16px 24px rgba(0,0,0,0.08))',
        }}
      />

      {/* Animated heading */}
      <h1 style={{
        fontSize: '2.25rem',
        fontWeight: '800',
        color: '#0056D2',
        marginBottom: '0.75rem',
        animation: 'success-bounce 2s infinite',
        letterSpacing: '-0.02em',
      }}>
        {isFrench ? 'Félicitations ! 🎉' : 'You\'re all set! 🎉'}
      </h1>

      {/* Sub-message */}
      <p style={{
        fontSize: '1.1rem',
        color: '#64748b',
        maxWidth: '280px',
        lineHeight: '1.6',
        marginBottom: '3rem',
        fontWeight: '500',
      }}>
        {isFrench
          ? 'Votre profil a été créé avec succès. Commençons à apprendre !'
          : 'Your profile was created successfully. Let\'s start learning!'}
      </p>

      {/* CTA */}
      <button
        onClick={onNext}
        style={{
          width: '100%',
          maxWidth: '320px',
          backgroundColor: '#0056D2',
          color: '#ffffff',
          padding: '1.125rem',
          borderRadius: '9999px',
          fontSize: '1.125rem',
          fontWeight: '700',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 8px 20px rgba(0,86,210,0.3)',
          letterSpacing: '0.3px',
        }}
      >
        {isFrench ? 'Commencer' : 'Start Learning'}
      </button>
    </div>
  );
};

export default SuccessPage;
