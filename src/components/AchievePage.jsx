import { useState } from 'react';

const B = '#1B4FD8';

const AchievePage = ({ onNext, onBack, nativeLang }) => {
    const isFrench = nativeLang === 'french';
    const [selectedItems, setSelectedItems] = useState([]);

    const q   = isFrench ? "Voici ce que vous pouvez accomplir !" : "This is what you can achieve!";
    const btn = isFrench ? 'Continuer' : 'Continue';

    const items = [
        {
            id: 'speak',
            icon: '💬',
            title: isFrench ? 'Parler couramment et avec confiance' : 'Speak fluently and confidently',
            sub: isFrench ? '40 000+ exercices interactifs sans stress' : '40,000+ stress-free interactive exercises',
        },
        {
            id: 'vocab',
            icon: '📇',
            title: isFrench ? 'Maîtriser beaucoup de vocabulaire' : 'Mastering a lot of vocabulary',
            sub: isFrench ? '2 000+ mots et expressions pratiques' : '2000+ practical words and phrases',
        },
        {
            id: 'habit',
            icon: '⏰',
            title: isFrench ? 'Cultiver des habitudes d\'étude' : 'Cultivate study habits',
            sub: isFrench ? 'Rappels intelligents, défis amusants, et plus' : 'Smart reminders, fun challenges, and more',
        },
    ];

    const toggle = (id) => setSelectedItems(prev =>
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );

    return (
        <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff' }}>
            {/* Top bar */}
            <div style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 50 }}>
                <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#0f172a', padding: '0.25rem 0.5rem' }}>←</button>
                <div style={{ flex: 1, height: '6px', backgroundColor: '#e2e8f0', borderRadius: '99px' }}>
                    <div style={{ width: '75%', height: '100%', backgroundColor: B, borderRadius: '99px' }} />
                </div>
            </div>

            {/* Speech bubble */}
            <div style={{ padding: '1rem 1.5rem 0', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
                <div style={{
                    display: 'inline-block', backgroundColor: '#fff', border: '1.5px solid #e2e8f0',
                    borderRadius: '16px 16px 16px 4px', padding: '0.75rem 1.1rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)', maxWidth: '280px',
                }}>
                    <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700', color: '#0f172a', lineHeight: 1.4 }}>{q}</p>
                </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '500px', margin: '0 auto', padding: '1.25rem 1.5rem 2.5rem', gap: '0.75rem' }}>
                {/* Achieve card */}
                <div style={{ backgroundColor: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '16px', padding: '0.5rem 0', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    {items.map((item, idx) => {
                        const sel = selectedItems.includes(item.id);
                        return (
                            <div
                                key={item.id}
                                onClick={() => toggle(item.id)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '1rem',
                                    padding: '0.9rem 1.25rem', cursor: 'pointer',
                                    borderBottom: idx < items.length - 1 ? '1px solid #f1f5f9' : 'none',
                                    backgroundColor: sel ? '#eff6ff' : 'transparent',
                                    transition: 'background 0.15s',
                                }}
                            >
                                <div style={{
                                    width: '44px', height: '44px', borderRadius: '12px',
                                    backgroundColor: sel ? `${B}22` : '#f1f5f9',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.3rem', flexShrink: 0,
                                }}>
                                    {item.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '0.95rem', fontWeight: '700', color: sel ? B : '#0f172a', marginBottom: '0.15rem' }}>{item.title}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '500' }}>{item.sub}</div>
                                </div>
                                <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${sel ? B : '#cbd5e1'}`, backgroundColor: sel ? B : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    {sel && <span style={{ color: '#fff', fontSize: '0.65rem', fontWeight: '900' }}>✓</span>}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div style={{ flex: 1 }} />
                <button
                    onClick={() => onNext(selectedItems)}
                    disabled={selectedItems.length === 0}
                    style={{ width: '100%', backgroundColor: selectedItems.length > 0 ? B : '#cbd5e1', color: '#fff', padding: '1.1rem', borderRadius: '9999px', fontSize: '1.05rem', fontWeight: '700', border: 'none', cursor: selectedItems.length > 0 ? 'pointer' : 'not-allowed', boxShadow: selectedItems.length > 0 ? '0 8px 24px rgba(27,79,216,0.3)' : 'none', letterSpacing: '0.3px' }}
                >
                    {btn}
                </button>
            </div>
        </div>
    );
};

export default AchievePage;
