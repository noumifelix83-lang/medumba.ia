import { useState } from 'react';

const B = '#1B4FD8';

const AchievePage = ({ onNext, onBack, nativeLang }) => {
    const isFrench = nativeLang === 'french';
    const [selectedItems, setSelectedItems] = useState([]);

    const q   = isFrench ? "Qu'espérez-vous retrouver ?" : "What do you hope to reconnect with?";
    const btn = isFrench ? 'Continuer' : 'Continue';

    const items = [
        {
            id: 'family',
            icon: '🏡',
            title: isFrench ? 'Comprendre mes proches' : 'Understand my family',
            sub: isFrench ? 'Suivre les conversations de la maison et des réunions' : 'Follow conversations at home and family gatherings',
        },
        {
            id: 'speak',
            icon: '💬',
            title: isFrench ? 'Parler avec mes parents et grands-parents' : 'Speak with parents & grandparents',
            sub: isFrench ? 'Répondre confortablement à ceux que j\'aime' : 'Respond comfortably to the people I love',
        },
        {
            id: 'culture',
            icon: '🎵',
            title: isFrench ? 'Comprendre les chants et proverbes' : 'Understand songs & proverbs',
            sub: isFrench ? 'Saisir le sens des paroles, contes et expressions' : 'Grasp the meaning of lyrics, stories, and sayings',
        },
        {
            id: 'preservation',
            icon: '🌱',
            title: isFrench ? 'Préserver et transmettre la langue' : 'Preserve and pass on the language',
            sub: isFrench ? 'Garder le Medumba vivant pour la prochaine génération' : 'Keep Medumba alive for the next generation',
        },
    ];

    const toggle = (id) => setSelectedItems(prev =>
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );

    return (
        <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff', fontFamily: "'Outfit', system-ui, sans-serif" }}>
            {/* Top bar */}
            <div style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 50 }}>
                <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#0f172a', padding: '0.25rem 0.5rem' }}>←</button>
                <div style={{ flex: 1, height: '8px', backgroundColor: '#e2e8f0', borderRadius: '99px' }}>
                    <div style={{ width: '75%', height: '100%', backgroundColor: B, borderRadius: '99px' }} />
                </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '500px', margin: '0 auto', padding: '1rem 1.5rem 2.5rem' }}>

                {/* Speech bubble */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{
                        display: 'inline-block', backgroundColor: '#fff', border: '1.5px solid #e2e8f0',
                        borderRadius: '16px 16px 16px 4px', padding: '0.85rem 1.1rem',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)', maxWidth: '300px',
                    }}>
                        <p style={{ margin: 0, fontSize: '1rem', fontWeight: '700', color: '#0f172a', lineHeight: 1.4 }}>{q}</p>
                    </div>
                    <p style={{ margin: '0.5rem 0 0 0.25rem', fontSize: '0.8rem', color: '#94a3b8', fontWeight: '600' }}>
                        {isFrench ? 'Choisissez tout ce qui vous correspond' : 'Select all that apply'}
                    </p>
                </div>

                {/* Goals card */}
                <div style={{ backgroundColor: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '1.5rem' }}>
                    {items.map((item, idx) => {
                        const sel = selectedItems.includes(item.id);
                        return (
                            <div
                                key={item.id}
                                onClick={() => toggle(item.id)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '1rem',
                                    padding: '1rem 1.25rem', cursor: 'pointer',
                                    borderBottom: idx < items.length - 1 ? '1px solid #f1f5f9' : 'none',
                                    backgroundColor: sel ? '#eff6ff' : 'transparent',
                                    transition: 'background 0.15s',
                                }}
                            >
                                <div style={{
                                    width: '46px', height: '46px', borderRadius: '14px',
                                    backgroundColor: sel ? `${B}18` : '#f8fafc',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.4rem', flexShrink: 0,
                                    border: sel ? `1.5px solid ${B}40` : '1.5px solid #e2e8f0',
                                }}>
                                    {item.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '0.95rem', fontWeight: '700', color: sel ? B : '#0f172a', marginBottom: '0.2rem' }}>{item.title}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '500', lineHeight: 1.4 }}>{item.sub}</div>
                                </div>
                                <div style={{
                                    width: '22px', height: '22px', borderRadius: '6px',
                                    border: `2px solid ${sel ? B : '#cbd5e1'}`,
                                    backgroundColor: sel ? B : 'transparent',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                }}>
                                    {sel && <span style={{ color: '#fff', fontSize: '0.7rem', fontWeight: '900' }}>✓</span>}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div style={{ flex: 1 }} />
                <button
                    onClick={() => onNext(selectedItems)}
                    disabled={selectedItems.length === 0}
                    style={{
                        width: '100%',
                        backgroundColor: selectedItems.length > 0 ? B : '#cbd5e1',
                        color: '#fff', padding: '1.125rem', borderRadius: '9999px',
                        fontSize: '1.125rem', fontWeight: '600', border: 'none',
                        cursor: selectedItems.length > 0 ? 'pointer' : 'not-allowed',
                        boxShadow: selectedItems.length > 0 ? '0 10px 15px -3px rgba(27,79,216,0.3)' : 'none',
                        transition: 'all 0.2s',
                    }}
                >
                    {btn}
                </button>
            </div>
        </div>
    );
};

export default AchievePage;
