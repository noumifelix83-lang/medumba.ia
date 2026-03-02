import React from 'react';
import tutor from '../assets/teacher2.png';

const LanguageSelectionPage = ({ onNext, onBack, nativeLang, setNativeLang }) => {
    const isFr = nativeLang === 'french';

    const SelectionCard = ({ selected, onClick, flag, label }) => (
        <div onClick={onClick} style={{
            display: 'flex', alignItems: 'center',
            padding: '1rem', borderRadius: '16px',
            border: selected ? '2px solid #0056D2' : '1px solid #cbd5e1',
            backgroundColor: selected ? '#eff6ff' : 'white',
            cursor: 'pointer', transition: 'all 0.2s',
            position: 'relative',
        }}>
            <span style={{ fontSize: '2rem', marginRight: '1rem' }}>{flag}</span>
            <span style={{ fontWeight: '600', fontSize: '1.1rem', color: selected ? '#0056D2' : '#334155' }}>
                {label}
            </span>
            {selected && (
                <div style={{
                    position: 'absolute', right: '1rem',
                    width: '12px', height: '12px', borderRadius: '50%',
                    backgroundColor: '#0056D2',
                }} />
            )}
        </div>
    );

    return (
        <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc' }}>
            {/* Top Bar */}
            <div style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', position: 'sticky', top: 0, backgroundColor: '#f8fafc', zIndex: 50 }}>
                <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#0f172a', padding: '0.5rem', borderRadius: '50%' }}>←</button>
                <div style={{ flex: 1, height: '8px', backgroundColor: '#e2e8f0', borderRadius: '99px' }}>
                    <div style={{ width: '20%', height: '100%', backgroundColor: '#0056D2', borderRadius: '99px' }} />
                </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '500px', margin: '0 auto', padding: '0 1.5rem 2rem' }}>
                {/* Tutor + speech bubble */}
                <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', marginTop: '1rem', marginBottom: '2rem' }}>
                    <div style={{ position: 'relative', zIndex: 1, width: 'fit-content' }}>
                        <img src={tutor} alt="Tutor" style={{ width: '220px', height: 'auto', display: 'block' }} />
                        <div style={{
                            position: 'absolute', top: '20px', right: '-75px',
                            backgroundColor: 'white', padding: '1rem 1.25rem',
                            borderRadius: '20px', borderBottomLeftRadius: '4px',
                            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', width: '190px', textAlign: 'left',
                        }}>
                            <p style={{ color: '#0f172a', fontSize: '0.95rem', fontWeight: '600', lineHeight: '1.4', margin: 0 }}>
                                {nativeLang === 'french'
                                    ? 'Quelle est votre langue maternelle ?'
                                    : 'What is your native language?'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Native language selection */}
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '1rem' }}>
                            {nativeLang === 'french' ? 'Votre langue maternelle' : 'Your native language'}
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <SelectionCard selected={nativeLang === 'french'}  onClick={() => setNativeLang('french')}  flag="🇫🇷" label="Français" />
                            <SelectionCard selected={nativeLang === 'english'} onClick={() => setNativeLang('english')} flag="🇬🇧" label="English"  />
                        </div>
                    </div>

                    {/* Info chip — learningLang is always Medumba */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                        padding: '0.85rem 1.1rem', borderRadius: '14px',
                        backgroundColor: '#eff6ff', border: '2px solid #bfdbfe',
                    }}>
                        <span style={{ fontSize: '1.4rem' }}>🇨🇲</span>
                        <div>
                            <div style={{ fontSize: '0.72rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                {nativeLang === 'french' ? 'Langue à apprendre' : 'Learning language'}
                            </div>
                            <div style={{ fontSize: '1rem', fontWeight: '800', color: '#0056D2' }}>Medumba</div>
                        </div>
                    </div>

                    <button
                        onClick={onNext}
                        disabled={!nativeLang}
                        style={{
                            width: '100%', backgroundColor: nativeLang ? '#0056D2' : '#cbd5e1',
                            color: 'white', padding: '1.125rem', borderRadius: '9999px',
                            fontSize: '1.125rem', fontWeight: '600', border: 'none',
                            cursor: nativeLang ? 'pointer' : 'not-allowed', transition: 'all 0.2s',
                            boxShadow: nativeLang ? '0 10px 15px -3px rgba(0,86,210,0.3)' : 'none',
                        }}
                    >
                        {nativeLang === 'french' ? 'Continuer' : 'Continue'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LanguageSelectionPage;
