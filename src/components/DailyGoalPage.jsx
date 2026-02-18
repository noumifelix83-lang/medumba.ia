import React, { useState } from 'react';
import maleTutor from '../assets/male_tutor_yellow.png';

const DailyGoalPage = ({ onNext, onBack, nativeLang }) => {
    // Constants
    const isFrench = nativeLang === 'french';
    const [selectedGoal, setSelectedGoal] = useState(null);

    // Dynamic Text
    const headerText = isFrench
        ? "Quel est votre objectif quotidien ?"
        : "What is your daily study target?";

    const buttonText = isFrench ? 'Continuer' : 'Continue';

    const goals = [
        { id: 'relaxed', time: 5, label: isFrench ? 'Détendu' : 'Relax' },
        { id: 'normal', time: 10, label: isFrench ? 'Normal' : 'Normal' },
        { id: 'serious', time: 15, label: isFrench ? 'Sérieux' : 'Serious' },
        { id: 'great', time: 30, label: isFrench ? 'Super' : 'Great' },
        { id: 'awesome', time: 60, label: isFrench ? 'Génial' : 'Awesome' },
    ];

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
                        width: '80%', // Progress
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
                        backgroundColor: 'white',
                        padding: '1rem',
                        borderRadius: '20px',
                        borderBottomLeftRadius: '4px',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        width: '180px', // Slightly wider for text
                        zIndex: 10
                    }}>
                        <p style={{
                            color: '#0f172a',
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
                {goals.map((goal) => {
                    const isSelected = selectedGoal === goal.id;
                    return (
                        <div
                            key={goal.id}
                            onClick={() => setSelectedGoal(goal.id)}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1rem 1.5rem',
                                borderRadius: '16px',
                                border: isSelected ? '2px solid #0255d4' : '1px solid #cbd5e1',
                                backgroundColor: isSelected ? '#eff6ff' : 'white',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                boxShadow: isSelected ? '0 4px 6px -1px rgba(2, 85, 212, 0.1), 0 2px 4px -1px rgba(2, 85, 212, 0.06)' : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
                            }}
                        >
                            <span style={{
                                fontWeight: '700',
                                color: isSelected ? '#0255d4' : '#0f172a',
                                fontSize: '1rem'
                            }}>
                                {goal.time} {isFrench ? 'min / jour' : 'mins / day'}
                            </span>
                            <span style={{
                                fontSize: '0.9rem',
                                color: isSelected ? '#0255d4' : '#64748b',
                                fontWeight: '600'
                            }}>
                                {goal.label}
                            </span>
                        </div>
                    );
                })}

                {/* Continue Button */}
                <button
                    onClick={() => onNext(selectedGoal)}
                    disabled={!selectedGoal}
                    style={{
                        width: '100%',
                        backgroundColor: !selectedGoal ? '#cbd5e1' : '#0255d4',
                        color: 'white',
                        padding: '1.125rem',
                        borderRadius: '9999px',
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        border: 'none',
                        cursor: !selectedGoal ? 'not-allowed' : 'pointer',
                        marginTop: 'auto',
                        boxShadow: !selectedGoal ? 'none' : '0 10px 15px -3px rgba(0, 86, 210, 0.3)'
                    }}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default DailyGoalPage;
