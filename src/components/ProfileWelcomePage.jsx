import React from 'react';
import profileVector from '../assets/welcom vector.png';
import logo from '../assets/logo.png';

const ProfileWelcomePage = ({ onNext, onSkip, nativeLang }) => {
    const isFrench = nativeLang === 'french';

    return (
        <div style={{
            width: '100%', minHeight: '100vh',
            display: 'flex', flexDirection: 'column',
            backgroundColor: '#fff', alignItems: 'center',
            justifyContent: 'center', textAlign: 'center',
            padding: '2rem 1.5rem',
            fontFamily: "'Outfit', system-ui, sans-serif",
        }}>
            <style>{`
                @keyframes pw-bounce { 0%,100%{transform:translateY(0);} 40%{transform:translateY(-10px);} 60%{transform:translateY(-5px);} }
                @keyframes pw-pop    { 0%{transform:scale(0.7);opacity:0;} 70%{transform:scale(1.08);} 100%{transform:scale(1);opacity:1;} }
                @keyframes pw-fade   { from{opacity:0;transform:translateY(12px);} to{opacity:1;transform:translateY(0);} }
            `}</style>

            {/* Logo */}
            <img src={logo} alt="Medumba Logo" style={{ width: '90px', height: 'auto', marginBottom: '0.75rem', animation: 'pw-fade 0.4s ease-out both' }} />

            {/* Illustration with heritage speech bubbles */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '360px', marginBottom: '1.5rem', animation: 'pw-fade 0.45s ease-out 0.1s both' }}>
                <img src={profileVector} alt="Heritage learners" style={{ width: '100%', height: 'auto', display: 'block' }} />

                {/* Left bubble */}
                <div style={{
                    position: 'absolute', top: '6%', left: '30%',
                    backgroundColor: '#d97706', color: '#fff',
                    borderRadius: '10px 10px 10px 2px',
                    padding: '0.25rem 0.7rem',
                    fontSize: '0.7rem', fontWeight: '900',
                    boxShadow: '0 2px 8px rgba(217,119,6,0.4)',
                    whiteSpace: 'nowrap',
                    animation: 'pw-pop 0.5s cubic-bezier(0.175,0.885,0.32,1.275) 0.3s both',
                }}>
                    {isFrench ? '🌱 Mon parcours' : '🌱 My journey'}
                </div>

                {/* Right bubble */}
                <div style={{
                    position: 'absolute', top: '3%', right: '6%',
                    backgroundColor: '#1B4FD8', color: '#fff',
                    borderRadius: '10px 10px 2px 10px',
                    padding: '0.25rem 0.7rem',
                    fontSize: '0.7rem', fontWeight: '900',
                    boxShadow: '0 2px 8px rgba(27,79,216,0.4)',
                    whiteSpace: 'nowrap',
                    animation: 'pw-pop 0.5s cubic-bezier(0.175,0.885,0.32,1.275) 0.45s both',
                }}>
                    {isFrench ? '🔥 Ma progression' : '🔥 My progress'}
                </div>
            </div>

            {/* Heading */}
            <div style={{ fontSize: '1.35rem', fontWeight: '900', color: '#1B4FD8', marginBottom: '0.5rem', animation: 'pw-bounce 2s infinite' }}>
                {isFrench ? 'Sauvegardez votre voyage 🏡' : 'Save your reconnection journey 🏡'}
            </div>

            {/* Description */}
            <p style={{ fontSize: '0.92rem', color: '#64748b', marginBottom: '0.4rem', fontWeight: '600', maxWidth: '300px', lineHeight: 1.6, animation: 'pw-fade 0.5s ease-out 0.2s both' }}>
                {isFrench
                    ? 'Créez un profil pour ne jamais perdre vos progrès et retrouver votre chemin chaque jour.'
                    : 'Create a profile to never lose your progress and find your way back every day.'}
            </p>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '2rem', fontWeight: '600' }}>
                {isFrench ? 'Vous pouvez aussi continuer sans profil' : 'Or continue without a profile'}
            </p>

            {/* Buttons */}
            <div style={{ width: '100%', maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '0.85rem', animation: 'pw-fade 0.5s ease-out 0.3s both' }}>
                <button onClick={onNext} style={{
                    width: '100%', backgroundColor: '#1B4FD8', color: 'white',
                    padding: '1.1rem', borderRadius: '9999px',
                    fontSize: '1rem', fontWeight: '800', border: 'none',
                    cursor: 'pointer', boxShadow: '0 8px 20px rgba(27,79,216,0.3)',
                    letterSpacing: '0.3px',
                }}>
                    {isFrench ? 'CRÉER MON PROFIL' : 'CREATE MY PROFILE'}
                </button>
                <button onClick={onSkip} style={{
                    width: '100%', backgroundColor: 'transparent', color: '#64748b',
                    padding: '1rem', borderRadius: '9999px',
                    fontSize: '0.95rem', fontWeight: '700',
                    border: '2px solid #e2e8f0', cursor: 'pointer',
                }}>
                    {isFrench ? 'PASSER POUR L\'INSTANT' : 'SKIP FOR NOW'}
                </button>
            </div>
        </div>
    );
};

export default ProfileWelcomePage;
