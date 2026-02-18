import React from 'react';
import profileVector from '../assets/profile_welcome_vector.png';
import logo from '../assets/logo.png';

const ProfileWelcomePage = ({ onNext, onSkip, nativeLang }) => {
    // Constants
    const isFrench = nativeLang === 'french';

    return (
        <div style={{
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f8fafc',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '2rem 1.5rem'
        }}>

            {/* Logo */}
            <div style={{ marginBottom: '1rem' }}>
                <img
                    src={logo}
                    alt="Medumba Logo"
                    style={{ width: '120px', height: 'auto' }}
                />
            </div>

            {/* Animated Greeting Mood */}
            <div style={{
                marginBottom: '2rem',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#0255d4',
                animation: 'bounce 2s infinite'
            }}>
                <style>
                    {`
                        @keyframes bounce {
                            0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
                            40% {transform: translateY(-10px);}
                            60% {transform: translateY(-5px);}
                        }
                    `}
                </style>
                {isFrench ? "Bienvenue !" : "Welcome!"}
            </div>

            {/* Vector Image */}
            <div style={{
                marginBottom: '2rem',
                width: '100%',
                maxWidth: '400px'
            }}>
                <img
                    src={profileVector}
                    alt="Friends chatting"
                    style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block'
                    }}
                />
            </div>

            {/* Text Content */}
            <h2 style={{
                fontSize: '1rem',
                color: '#64748b',
                marginBottom: '0.5rem',
                fontWeight: '600'
            }}>
                {isFrench
                    ? "Créez un profil maintenant pour sauvegarder vos progrès et vous connecter avec des amis"
                    : "Create a profile now so you can save progress and connect with friends"}
            </h2>

            <p style={{
                fontSize: '0.9rem',
                color: '#94a3b8',
                marginBottom: '2rem'
            }}>
                {isFrench ? "Ou vous pouvez passer" : "Or you can skip it"}
            </p>

            {/* Buttons */}
            <div style={{ width: '100%', maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: 'auto' }}>
                <button
                    onClick={onNext}
                    style={{
                        width: '100%',
                        backgroundColor: '#0255d4',
                        color: 'white',
                        padding: '1.125rem',
                        borderRadius: '9999px',
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 10px 15px -3px rgba(0, 86, 210, 0.3)'
                    }}
                >
                    {isFrench ? "CRÉER UN PROFIL" : "CREATE PROFILE"}
                </button>

                <button
                    onClick={onSkip}
                    style={{
                        width: '100%',
                        backgroundColor: 'transparent',
                        color: '#64748b',
                        padding: '1rem',
                        borderRadius: '9999px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        border: '2px solid #e2e8f0',
                        cursor: 'pointer'
                    }}
                >
                    {isFrench ? "PASSER" : "SKIP"}
                </button>
            </div>
        </div>
    );
};

export default ProfileWelcomePage;
