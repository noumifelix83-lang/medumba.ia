import React, { useState } from 'react';
import maleTutor from '../assets/male_tutor_yellow.png';

const ProficiencyPage = ({ onNext, onBack, nativeLang, learningLang }) => {
    const [selectedLevel, setSelectedLevel] = useState(null);

    // Constants
    const isFrench = nativeLang === 'french';
    const targetLangLabel = learningLang === 'medumba' ? 'Medumba' : 'English';

    // Dynamic Text
    const questionText = isFrench
        ? `Quel est votre niveau de ${targetLangLabel} ?`
        : `How much ${targetLangLabel} do you know?`;

    const buttonText = isFrench ? 'Continuer' : 'Continue';

    // Levels Data
    const levels = [
        {
            id: 1,
            text: isFrench ? `Je viens de commencer à apprendre le ${targetLangLabel}` : `I just started learning ${targetLangLabel}`,
            bars: 1
        },
        {
            id: 2,
            text: isFrench ? 'Je connais quelques mots et phrases' : 'I know some words and phrases',
            bars: 2
        },
        {
            id: 3,
            text: isFrench ? 'Je peux avoir une conversation simple' : 'I can have a simple conversation',
            bars: 3
        },
        {
            id: 4,
            text: isFrench ? 'Je suis à un niveau intermédiaire ou supérieur' : "I'm at intermediate level or above",
            bars: 4
        }
    ];

    const ProgressBarIcon = ({ level }) => {
        return (
            <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '18px' }}>
                {[1, 2, 3, 4].map((bar) => (
                    <div
                        key={bar}
                        style={{
                            width: '4px',
                            height: `${4 + bar * 4}px`, // 8, 12, 16, 20px dynamic height
                            backgroundColor: bar <= level ? '#0255d4' : '#cbd5e1', // Theme Blue or Grey
                            borderRadius: '2px'
                        }}
                    />
                ))}
            </div>
        );
    };

    return (
        <div style={{
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#f8fafc',
        }}>
            {/* Top Bar */}
            <div style={{
                padding: '1rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                backgroundColor: '#f8fafc',
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
                        width: '40%',
                        height: '100%',
                        backgroundColor: '#0255d4',
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
                            src={maleTutor}
                            alt="Male Tutor"
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
                            right: '-85px', // More spacing
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
                        {levels.map((level) => (
                            <div
                                key={level.id}
                                onClick={() => setSelectedLevel(level.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '1rem 1.25rem',
                                    borderRadius: '16px',
                                    border: selectedLevel === level.id ? '2px solid #0255d4' : '1px solid #cbd5e1',
                                    backgroundColor: selectedLevel === level.id ? '#eff6ff' : 'white',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                                }}
                            >
                                <span style={{
                                    fontWeight: '600',
                                    color: selectedLevel === level.id ? '#0255d4' : '#334155',
                                    fontSize: '1rem',
                                    paddingRight: '1rem'
                                }}>
                                    {level.text}
                                </span>
                                <ProgressBarIcon level={level.bars} />
                            </div>
                        ))}
                    </div>

                    {/* Continue Button */}
                    <button
                        onClick={onNext}
                        disabled={!selectedLevel}
                        style={{
                            width: '100%',
                            backgroundColor: !selectedLevel ? '#cbd5e1' : '#0255d4',
                            color: 'white',
                            padding: '1.125rem',
                            borderRadius: '9999px',
                            fontSize: '1.125rem',
                            fontWeight: '600',
                            border: 'none',
                            cursor: !selectedLevel ? 'not-allowed' : 'pointer',
                            transform: !selectedLevel ? 'none' : 'translateY(0)',
                            transition: 'all 0.2s',
                            boxShadow: !selectedLevel ? 'none' : '0 10px 15px -3px rgba(0, 86, 210, 0.3)',
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

export default ProficiencyPage;
