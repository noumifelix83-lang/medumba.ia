import React from 'react';
import profileVector from '../assets/welcom vector.png';
import logo from '../assets/logo.png';

const ProfileWelcomePage = ({ onNext, onSkip, nativeLang }) => {
    const isFrench = nativeLang === 'french';

    return (
        <div style={{
            width: '100%', minHeight: '100vh',
            display: 'flex', flexDirection: 'column',
            backgroundColor: '#f8fafc', alignItems: 'center',
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

            {/* Welcom vector with overlaid text on each character's speech bubble */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '360px', marginBottom: '1.5rem', animation: 'pw-fade 0.45s ease-out 0.1s both' }}>
                <img src={profileVector} alt="Friends chatting" style={{ width: '100%', height: 'auto', display: 'block' }} />

                {/* BOY's speech bubble (orange/amber, upper-center-left of image ~32–50% x, 5–28% y) */}
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
                    {isFrench ? '📈 Mes progrès' : '📈 Track progress'}
                </div>

                {/* GIRL's speech bubble (red, upper-right area ~62–85% x, 2–20% y) */}
                <div style={{
                    position: 'absolute', top: '3%', right: '6%',
                    backgroundColor: '#dc2626', color: '#fff',
                    borderRadius: '10px 10px 2px 10px',
                    padding: '0.25rem 0.7rem',
                    fontSize: '0.7rem', fontWeight: '900',
                    boxShadow: '0 2px 8px rgba(220,38,38,0.4)',
                    whiteSpace: 'nowrap',
                    animation: 'pw-pop 0.5s cubic-bezier(0.175,0.885,0.32,1.275) 0.45s both',
                }}>
                    {isFrench ? '👥 Mes amis' : '👥 Connect friends'}
                </div>
            </div>

            {/* Bouncing welcome */}
            <div style={{ fontSize: '1.35rem', fontWeight: '900', color: '#0056D2', marginBottom: '0.6rem', animation: 'pw-bounce 2s infinite' }}>
                {isFrench ? 'Bienvenue ! 🎉' : 'Welcome! 🎉'}
            </div>

            {/* Description */}
            <p style={{ fontSize: '0.92rem', color: '#64748b', marginBottom: '0.4rem', fontWeight: '600', maxWidth: '300px', lineHeight: 1.6, animation: 'pw-fade 0.5s ease-out 0.2s both' }}>
                {isFrench
                    ? 'Créez un profil pour sauvegarder vos progrès et vous connecter avec des amis.'
                    : 'Create a profile to save your progress and connect with friends.'}
            </p>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '2rem', fontWeight: '600' }}>
                {isFrench ? 'Ou vous pouvez passer' : 'Or skip for now'}
            </p>

            {/* Buttons */}
            <div style={{ width: '100%', maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '0.85rem', animation: 'pw-fade 0.5s ease-out 0.3s both' }}>
                <button onClick={onNext} style={{
                    width: '100%', backgroundColor: '#0255d4', color: 'white',
                    padding: '1.1rem', borderRadius: '9999px',
                    fontSize: '1rem', fontWeight: '800', border: 'none',
                    cursor: 'pointer', boxShadow: '0 8px 20px rgba(0,86,210,0.3)',
                    letterSpacing: '0.3px',
                }}>
                    {isFrench ? 'CRÉER UN PROFIL' : 'CREATE PROFILE'}
                </button>
                <button onClick={onSkip} style={{
                    width: '100%', backgroundColor: 'transparent', color: '#64748b',
                    padding: '1rem', borderRadius: '9999px',
                    fontSize: '0.95rem', fontWeight: '700',
                    border: '2px solid #e2e8f0', cursor: 'pointer',
                }}>
                    {isFrench ? 'PASSER' : 'SKIP'}
                </button>
            </div>
        </div>
    );
};

export default ProfileWelcomePage;
