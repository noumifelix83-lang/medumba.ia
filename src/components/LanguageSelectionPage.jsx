import React from 'react';
import tutor from '../assets/tutor.png';

const LanguageSelectionPage = ({
    onNext,
    onBack,
    nativeLang,
    setNativeLang,
    learningLang,
    setLearningLang
}) => {

    const getButtonText = () => {
        if (nativeLang === 'french') return 'Continuer';
        return 'Continue';
    };

    const SelectionCard = ({ selected, onClick, flag, label }) => (
        <div
            onClick={onClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                borderRadius: '16px',
                border: selected ? '2px solid var(--color-primary)' : '1px solid #cbd5e1',
                backgroundColor: selected ? '#eff6ff' : 'white',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative'
            }}
        >
            <span style={{ fontSize: '2rem', marginRight: '1rem' }}>{flag}</span>
            <span style={{
                fontWeight: '600',
                fontSize: '1.1rem',
                color: selected ? 'var(--color-primary)' : '#334155'
            }}>
                {label}
            </span>
            {selected && (
                <div style={{
                    position: 'absolute',
                    right: '1rem',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary)'
                }} />
            )}
        </div>
    );

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
                        width: '20%',
                        height: '100%',
                        backgroundColor: 'var(--color-primary)',
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

                {/* Hero Section (Tutor + Bubble) */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '1rem',
                    marginBottom: '2rem'
                }}>
                    {/* Wrapper for Image + Bubble to keep them together */}
                    <div style={{ position: 'relative', zIndex: 1, width: 'fit-content' }}>
                        <img
                            src={tutor}
                            alt="Language Tutor"
                            style={{
                                width: '240px',
                                height: 'auto',
                                display: 'block'
                            }}
                        />

                        {/* Speech Bubble - Absolute to the image wrapper */}
                        <div style={{
                            position: 'absolute',
                            top: '20px',
                            right: '-65px', // Increased spacing
                            backgroundColor: 'white',
                            padding: '1rem 1.25rem',
                            borderRadius: '20px',
                            borderBottomLeftRadius: '4px', // Speech bubble tail effect
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
                                What language do you want to use for Medumba?
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Section 1 */}
                    <div>
                        <h2 style={{
                            fontSize: '1.25rem',
                            fontWeight: '700',
                            color: '#0f172a',
                            marginBottom: '1rem'
                        }}>
                            Your Native language
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <SelectionCard
                                selected={nativeLang === 'french'}
                                onClick={() => setNativeLang('french')}
                                flag="🇫🇷"
                                label="French"
                            />
                            <SelectionCard
                                selected={nativeLang === 'english'}
                                onClick={() => setNativeLang('english')}
                                flag="🇬🇧"
                                label="English"
                            />
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div>
                        <h2 style={{
                            fontSize: '1.25rem',
                            fontWeight: '700',
                            color: '#0f172a',
                            marginBottom: '1rem'
                        }}>
                            Learning language
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <SelectionCard
                                selected={learningLang === 'english'}
                                onClick={() => setLearningLang('english')}
                                flag="🇺🇸"
                                label="English"
                            />
                            <SelectionCard
                                selected={learningLang === 'medumba'}
                                onClick={() => setLearningLang('medumba')}
                                flag="🇨🇲"
                                label="Medumba"
                            />
                        </div>
                    </div>

                    {/* Spacer */}
                    <div style={{ height: '1rem' }} />

                    {/* Button */}
                    <button
                        onClick={onNext}
                        disabled={!nativeLang || !learningLang}
                        style={{
                            width: '100%',
                            backgroundColor: (!nativeLang || !learningLang) ? '#cbd5e1' : 'var(--color-primary)',
                            color: 'white',
                            padding: '1.125rem',
                            borderRadius: '9999px',
                            fontSize: '1.125rem',
                            fontWeight: '600',
                            border: 'none',
                            cursor: (!nativeLang || !learningLang) ? 'not-allowed' : 'pointer',
                            transform: (!nativeLang || !learningLang) ? 'none' : 'translateY(0)',
                            transition: 'all 0.2s',
                            boxShadow: (!nativeLang || !learningLang) ? 'none' : '0 10px 15px -3px rgba(0, 86, 210, 0.3)'
                        }}
                    >
                        {getButtonText()}
                    </button>

                </div>

            </div>
        </div>
    );
};

export default LanguageSelectionPage;
