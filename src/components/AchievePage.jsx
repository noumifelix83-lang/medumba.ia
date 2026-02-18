import React, { useState } from 'react';
import maleTutor from '../assets/male_tutor_yellow.png';

const AchievePage = ({ onNext, nativeLang }) => {
    // Constants
    const isFrench = nativeLang === 'french';
    const [selectedItems, setSelectedItems] = useState([]);

    // Dynamic Text
    const headerText = isFrench
        ? "Voici ce que vous pouvez accomplir"
        : "This is what you can achieve";

    const buttonText = isFrench ? 'Continuer' : 'Continue';

    const items = [
        {
            id: 'speak',
            emoji: '💬',
            title: isFrench ? 'Parler couramment et avec confiance' : 'Speak fluently and confidently',
            subtitle: isFrench ? '40 000+ exercices interactifs sans stress' : '40,000+ stress-free interactive exercises'
        },
        {
            id: 'vocab',
            emoji: '📇',
            title: isFrench ? 'Maîtriser beaucoup de vocabulaire' : 'Mastering a lot of vocabulary',
            subtitle: isFrench ? '2 000+ mots et expressions pratiques' : '2000+ practical words and phrases'
        },
        {
            id: 'habit',
            emoji: '⏰',
            title: isFrench ? 'Cultiver des habitudes d’étude' : 'Cultivate study habits',
            subtitle: isFrench ? 'Rappels intelligents, défis amusants, et plus' : 'Smart reminders, fun challenges, and more'
        }
    ];

    const toggleItem = (id) => {
        setSelectedItems(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
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
            {/* Top Bar with Progress */}
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
                <div style={{ flex: 1, height: '8px', backgroundColor: '#e2e8f0', borderRadius: '99px', marginLeft: 'auto', marginRight: 'auto' }}>
                    <div style={{
                        width: '70%', // Progress
                        height: '100%',
                        backgroundColor: '#0255d4',
                        borderRadius: '99px'
                    }} />
                </div>
            </div>

            {/* Top Container for Tutor and Bubble */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '2rem',
                paddingBottom: '1rem'
            }}>
                <div style={{
                    position: 'relative',
                    width: 'fit-content',
                    marginBottom: '1rem'
                }}>
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
                        left: '180px',
                        backgroundColor: 'black',
                        padding: '1rem',
                        borderRadius: '20px',
                        borderBottomLeftRadius: '4px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        width: '160px',
                        zIndex: 10
                    }}>
                        <p style={{
                            color: 'white',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            lineHeight: '1.4',
                            margin: 0,
                            textAlign: 'left'
                        }}>
                            {headerText}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content List */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                maxWidth: '500px',
                margin: '0 auto',
                padding: '0 1.5rem 2rem',
                gap: '1rem'
            }}>
                {items.map((item) => {
                    const isSelected = selectedItems.includes(item.id);
                    return (
                        <div
                            key={item.id}
                            onClick={() => toggleItem(item.id)}
                            style={{
                                display: 'flex',
                                gap: '1rem',
                                alignItems: 'flex-start',
                                padding: '1rem',
                                borderRadius: '16px',
                                border: isSelected ? '2px solid #0255d4' : '1px solid transparent', // Fixed transparent border
                                backgroundColor: isSelected ? '#eff6ff' : 'transparent',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            <div style={{
                                fontSize: '1.5rem',
                                color: '#0255d4',
                            }}>
                                {item.emoji}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span style={{
                                    fontWeight: '700',
                                    color: isSelected ? '#0255d4' : '#0f172a',
                                    fontSize: '1rem',
                                    marginBottom: '0.2rem'
                                }}>
                                    {item.title}
                                </span>
                                <span style={{
                                    fontSize: '0.9rem',
                                    color: '#64748b',
                                    fontWeight: '500'
                                }}>
                                    {item.subtitle}
                                </span>
                            </div>
                        </div>
                    );
                })}

                {/* Continue Button */}
                <button
                    onClick={() => {
                        console.log('AchievePage: Continue clicked', selectedItems);
                        onNext(selectedItems);
                    }}
                    disabled={selectedItems.length === 0}
                    style={{
                        width: '100%',
                        backgroundColor: selectedItems.length === 0 ? '#cbd5e1' : '#0255d4',
                        color: 'white',
                        padding: '1.125rem',
                        borderRadius: '9999px',
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        border: 'none',
                        cursor: selectedItems.length === 0 ? 'not-allowed' : 'pointer',
                        marginTop: 'auto',
                        boxShadow: selectedItems.length === 0 ? 'none' : '0 10px 15px -3px rgba(0, 86, 210, 0.3)'
                    }}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default AchievePage;
