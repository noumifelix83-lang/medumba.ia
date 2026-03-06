import { useState } from 'react';
import teacher from '../assets/teacher 1.png';

const B = '#1B4FD8';

const DailyGoalPage = ({ onNext, onBack, nativeLang }) => {
    const isFrench = nativeLang === 'french';
    const [selectedGoal, setSelectedGoal] = useState(null);

    const q   = isFrench ? "Quel est votre objectif quotidien ?" : "What is your daily study target?";
    const btn = isFrench ? 'Continuer' : 'Continue';

    const goals = [
        { id: 'relaxed', time: 5,  label: isFrench ? 'Détendu'  : 'Relax'   },
        { id: 'normal',  time: 10, label: isFrench ? 'Normal'   : 'Normal'  },
        { id: 'serious', time: 15, label: isFrench ? 'Sérieux'  : 'Serious' },
        { id: 'great',   time: 30, label: isFrench ? 'Super'    : 'Great'   },
        { id: 'awesome', time: 60, label: isFrench ? 'Génial'   : 'Awesome' },
    ];

    return (
        <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
            {/* Top bar */}
            <div style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 50 }}>
                <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#0f172a', padding: '0.25rem 0.5rem' }}>←</button>
                <div style={{ flex: 1, height: '6px', backgroundColor: '#e2e8f0', borderRadius: '99px' }}>
                    <div style={{ width: '90%', height: '100%', backgroundColor: B, borderRadius: '99px' }} />
                </div>
            </div>

            {/* Character + speech bubble */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '0.5rem 1.5rem 0', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
                <div style={{ position: 'relative', width: 'fit-content' }}>
                    <img src={teacher} alt="Teacher" style={{ width: '200px', height: 'auto', display: 'block' }} />
                    <div style={{
                        position: 'absolute', top: '5px', right: '-90px',
                        backgroundColor: '#fff', border: '1.5px solid #e2e8f0',
                        borderRadius: '16px', borderBottomLeftRadius: '4px',
                        padding: '0.75rem 1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', width: '160px',
                    }}>
                        <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', lineHeight: 1.4 }}>{q}</p>
                    </div>
                </div>
            </div>

            {/* Goals list */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '500px', margin: '0 auto', padding: '1.5rem 1.5rem 2.5rem', gap: '0.75rem' }}>
                {goals.map((goal) => {
                    const sel = selectedGoal === goal.id;
                    return (
                        <div key={goal.id} onClick={() => setSelectedGoal(goal.id)} style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: '1rem 1.25rem', borderRadius: '16px',
                            border: sel ? `2px solid ${B}` : '1.5px solid #e2e8f0',
                            backgroundColor: sel ? '#eff6ff' : '#fff',
                            cursor: 'pointer', transition: 'all 0.15s',
                        }}>
                            <span style={{ fontWeight: '700', color: sel ? B : '#0f172a', fontSize: '1rem' }}>
                                {goal.time} {isFrench ? 'min / jour' : 'mins / day'}
                            </span>
                            <span style={{ fontSize: '0.9rem', color: sel ? B : '#64748b', fontWeight: '600' }}>
                                {goal.label}
                            </span>
                        </div>
                    );
                })}

                <div style={{ flex: 1 }} />
                <button
                    onClick={() => onNext(selectedGoal)} disabled={!selectedGoal}
                    style={{ width: '100%', backgroundColor: selectedGoal ? B : '#cbd5e1', color: '#fff', padding: '1.1rem', borderRadius: '9999px', fontSize: '1.05rem', fontWeight: '700', border: 'none', cursor: selectedGoal ? 'pointer' : 'not-allowed', boxShadow: selectedGoal ? '0 8px 24px rgba(27,79,216,0.3)' : 'none', letterSpacing: '0.3px' }}
                >
                    {btn}
                </button>
            </div>
        </div>
    );
};

export default DailyGoalPage;
