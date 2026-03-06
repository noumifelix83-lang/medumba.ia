import React, { useState } from 'react';
import tutor from '../assets/tutor.png'; // Re-use Female tutor

const ReasonPage = ({ onNext, onBack, nativeLang, learningLang }) => {
    const [selectedReason, setSelectedReason] = useState(null);

    // Constants
    const isFrench = nativeLang === 'french';
    const targetLangLabel = learningLang === 'medumba' ? 'Medumba' : 'English';

    // Dynamic Text
    const questionText = isFrench
        ? `Pourquoi apprenez-vous le ${targetLangLabel} ?`
        : `Why are you studying ${targetLangLabel}?`;

    const buttonText = isFrench ? 'Continuer' : 'Continue';

    // Reasons Data
    const reasons = [
        { id: 'fun', text: isFrench ? 'Juste pour le plaisir' : 'Just for fun', emoji: '😁' },
        { id: 'career', text: isFrench ? 'Booster ma carrière' : 'Improve my career', emoji: '💼' },
        { id: 'education', text: isFrench ? 'Soutenir mes études' : 'Support my education', emoji: '🎓' },
        { id: 'vacation', text: isFrench ? 'Préparer des vacances' : 'Vacation preparation', emoji: '✈️' },
        { id: 'other', text: isFrench ? 'Autre raison' : 'Other reason', emoji: '🧩' },
    ];

    return (
        <div style={{
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#fff',
        }}>
            {/* Top Bar */}
            <div style={{
                padding: '1rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                backgroundColor: '#fff',
                position: 'sticky',
                top: 0,
                zIndex: 50
            }}>
                <button
                    onClick={onBack}
                    style={{
                        background: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        color: '#0f172a',
                        padding: '0.5rem',
                        borderRadius: '50%'
                    }}>
                    ←
                </button>
                <div style={{ flex: 1, height: '8px', backgroundColor: '#e2e8f0', borderRadius: '99px' }}>
                    <div style={{
                        width: '60%', // Progress increased to 60%
                        height: '100%',
                        backgroundColor: '#1B4FD8',
                        borderRadius: '99px'
                    }} />
                </div>
            </div>

            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                maxWidth: '500px',
                margin: '0 auto',
                padding: '0 1.5rem 2rem'
            }}>

                {/* Tutor + Bubble Section */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '0.5rem',
                    marginBottom: '2rem'
                }}>
                    {/* Wrapper */}
                    <div style={{ position: 'relative', zIndex: 1, width: 'fit-content' }}>
                        <img
                            src={tutor}
                            alt="Female Tutor"
                            style={{
                                width: '240px',
                                height: 'auto',
                                display: 'block'
                            }}
                        />

                        {/* Speech Bubble */}
                        <div style={{
                            position: 'absolute',
                            top: '20px',
                            right: '-65px',
                            backgroundColor: 'white',
                            padding: '1rem',
                            borderRadius: '20px',
                            borderBottomLeftRadius: '4px',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                            width: '180px',
                            textAlign: 'left'
                        }}>
                            <p style={{
                                color: '#0f172a',
                                fontSize: '0.95rem',
                                fontWeight: '600',
                                lineHeight: '1.4',
                                margin: 0
                            }}>
                                {questionText}
                            </p>
                        </div>
                    </div>
                </div>

                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Options Grid */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {reasons.map((reason) => (
                            <div
                                key={reason.id}
                                onClick={() => setSelectedReason(reason.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '1rem 1.25rem',
                                    borderRadius: '16px',
                                    border: selectedReason === reason.id ? '2px solid #1B4FD8' : '1px solid #cbd5e1',
                                    backgroundColor: selectedReason === reason.id ? '#eff6ff' : 'white',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                                }}
                            >
                                <span style={{ fontSize: '1.5rem', marginRight: '1rem' }}>{reason.emoji}</span>
                                <span style={{
                                    fontWeight: '600',
                                    color: selectedReason === reason.id ? '#1B4FD8' : '#334155',
                                    fontSize: '1rem'
                                }}>
                                    {reason.text}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Continue Button */}
                    <button
                        onClick={onNext}
                        disabled={!selectedReason}
                        style={{
                            width: '100%',
                            backgroundColor: !selectedReason ? '#cbd5e1' : '#1B4FD8',
                            color: 'white',
                            padding: '1.125rem',
                            borderRadius: '9999px',
                            fontSize: '1.125rem',
                            fontWeight: '600',
                            border: 'none',
                            cursor: !selectedReason ? 'not-allowed' : 'pointer',
                            transform: !selectedReason ? 'none' : 'translateY(0)',
                            transition: 'all 0.2s',
                            boxShadow: !selectedReason ? 'none' : '0 10px 15px -3px rgba(0, 86, 210, 0.3)',
                            marginTop: 'auto'
                        }}
                    >
                        {buttonText}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ReasonPage;
