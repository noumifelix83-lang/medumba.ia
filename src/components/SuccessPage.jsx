import welcomeVec from '../assets/welcom vector.png';

const SuccessPage = ({ onNext, nativeLang }) => {
    const isFrench = nativeLang === 'french';

    return (
        <div style={{
            width: '100%', minHeight: '100vh',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center', alignItems: 'center',
            padding: '2rem 1.5rem',
            backgroundColor: '#f8fafc', textAlign: 'center',
            fontFamily: "'Outfit', system-ui, sans-serif",
        }}>
            <style>{`
                @keyframes suc-pop   { 0%{transform:scale(0.75);opacity:0;} 70%{transform:scale(1.06);} 100%{transform:scale(1);opacity:1;} }
                @keyframes suc-fade  { from{opacity:0;transform:translateY(14px);} to{opacity:1;transform:translateY(0);} }
                @keyframes suc-badge { 0%,100%{transform:translateY(0) scale(1);} 40%{transform:translateY(-10px) scale(1.04);} 60%{transform:translateY(-5px) scale(1.02);} }
            `}</style>

            {/* Welcom vector — both characters celebrate + heading overlaid */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '320px', marginBottom: '1.5rem', animation: 'suc-pop 0.55s cubic-bezier(0.175,0.885,0.32,1.275) both' }}>
                <img src={welcomeVec} alt="Celebration" style={{ width: '100%', height: 'auto', display: 'block', filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.08))' }} />

                {/* Heading overlaid on the image — centered just above the globe */}
                <div style={{
                    position: 'absolute', bottom: '28%', left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: '#0056D2', color: '#fff',
                    borderRadius: '99px', padding: '0.35rem 1.1rem',
                    fontSize: '0.82rem', fontWeight: '900',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 4px 14px rgba(0,86,210,0.4)',
                    animation: 'suc-badge 2s ease-in-out 0.6s infinite',
                }}>
                    {isFrench ? '🎉 Profil créé !' : '🎉 Profile created!'}
                </div>

                {/* Boy's bubble: success message left */}
                <div style={{
                    position: 'absolute', top: '5%', left: '28%',
                    backgroundColor: '#16a34a', color: '#fff',
                    borderRadius: '10px 10px 10px 2px',
                    padding: '0.22rem 0.65rem',
                    fontSize: '0.68rem', fontWeight: '900',
                    boxShadow: '0 2px 8px rgba(22,163,74,0.4)',
                    whiteSpace: 'nowrap',
                    animation: 'suc-pop 0.5s cubic-bezier(0.175,0.885,0.32,1.275) 0.25s both',
                }}>
                    {isFrench ? '✅ C\'est parti !' : '✅ All done!'}
                </div>

                {/* Girl's bubble: right */}
                <div style={{
                    position: 'absolute', top: '3%', right: '5%',
                    backgroundColor: '#0056D2', color: '#fff',
                    borderRadius: '10px 10px 2px 10px',
                    padding: '0.22rem 0.65rem',
                    fontSize: '0.68rem', fontWeight: '900',
                    boxShadow: '0 2px 8px rgba(0,86,210,0.4)',
                    whiteSpace: 'nowrap',
                    animation: 'suc-pop 0.5s cubic-bezier(0.175,0.885,0.32,1.275) 0.4s both',
                }}>
                    {isFrench ? '🚀 Apprenons !' : '🚀 Let\'s learn!'}
                </div>
            </div>

            {/* Main heading */}
            <h1 style={{
                fontSize: '2rem', fontWeight: '900', color: '#0056D2',
                marginBottom: '0.6rem', letterSpacing: '-0.02em',
                animation: 'suc-fade 0.5s ease-out 0.2s both',
            }}>
                {isFrench ? 'Félicitations ! 🎉' : "You're all set! 🎉"}
            </h1>

            {/* Sub-message */}
            <p style={{
                fontSize: '1rem', color: '#64748b', maxWidth: '270px',
                lineHeight: 1.6, marginBottom: '2.5rem', fontWeight: '600',
                animation: 'suc-fade 0.5s ease-out 0.3s both',
            }}>
                {isFrench
                    ? 'Votre profil a été créé avec succès. Commençons à apprendre !'
                    : 'Your profile was created successfully. Let\'s start learning!'}
            </p>

            {/* CTA */}
            <button onClick={onNext} style={{
                width: '100%', maxWidth: '320px',
                backgroundColor: '#0056D2', color: '#fff',
                padding: '1.1rem', borderRadius: '9999px',
                fontSize: '1.05rem', fontWeight: '800', border: 'none',
                cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,86,210,0.3)',
                letterSpacing: '0.3px',
                animation: 'suc-fade 0.5s ease-out 0.4s both',
            }}>
                {isFrench ? 'Commencer' : 'Start Learning'}
            </button>
        </div>
    );
};

export default SuccessPage;
