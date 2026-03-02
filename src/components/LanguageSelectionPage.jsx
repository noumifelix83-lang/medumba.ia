import React from 'react';
import tutor from '../assets/teacher2.png';

// All supported native languages
const LANGUAGES = [
    { id: 'french',   flag: '🇫🇷', label: 'Français',  country: 'France'     },
    { id: 'english',  flag: '🇬🇧', label: 'English',   country: 'UK / US'    },
    { id: 'spanish',  flag: '🇪🇸', label: 'Español',   country: 'España'     },
    { id: 'german',   flag: '🇩🇪', label: 'Deutsch',   country: 'Deutschland'},
    { id: 'italian',  flag: '🇮🇹', label: 'Italiano',  country: 'Italia'     },
];

const LanguageSelectionPage = ({ onNext, onBack, nativeLang, setNativeLang }) => {
    const isFr = nativeLang === 'french';

    const bubbleText = isFr
        ? 'Quelle est votre langue maternelle ?'
        : 'What is your native language?';

    const sectionTitle = isFr ? 'Votre langue maternelle' : 'Your native language';
    const continueLabel = isFr ? 'Continuer' : 'Continue';
    const learningLabel = isFr ? 'Langue à apprendre' : 'Learning language';

    return (
        <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc', fontFamily: "'Outfit', system-ui, sans-serif" }}>
            <style>{`
                @keyframes lang-in { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
                .lang-card:hover { border-color: #0056D2 !important; background-color: #f8fbff !important; transform: translateY(-1px); }
            `}</style>

            {/* ── Top Bar with progress ── */}
            <div style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', position: 'sticky', top: 0, backgroundColor: '#f8fafc', zIndex: 50, borderBottom: '1px solid #f1f5f9' }}>
                <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: '1.4rem', cursor: 'pointer', color: '#0f172a', padding: '0.4rem', borderRadius: '50%', flexShrink: 0 }}>←</button>
                <div style={{ flex: 1 }}>
                    <div style={{ height: '7px', backgroundColor: '#e2e8f0', borderRadius: '99px', overflow: 'hidden' }}>
                        <div style={{ width: '20%', height: '100%', background: 'linear-gradient(90deg, #0056D2, #38bdf8)', borderRadius: '99px', transition: 'width 0.4s ease' }} />
                    </div>
                    <div style={{ fontSize: '0.62rem', color: '#94a3b8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '0.25rem' }}>
                        {isFr ? 'Étape 1 sur 5' : 'Step 1 of 5'}
                    </div>
                </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '500px', margin: '0 auto', padding: '0 1.5rem 2rem' }}>

                {/* ── Tutor + speech bubble ──
                     teacher2.png: woman faces right, left arm raised, face at upper-center of image.
                     Bubble goes to her LEFT side (she is on the right, bubble on left),
                     tail is borderBottomRightRadius:'4px' pointing right → back toward her face. */}
                <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', marginTop: '0.5rem', marginBottom: '1.75rem' }}>
                    <div style={{ position: 'relative', zIndex: 1, width: 'fit-content' }}>
                        {/* Bubble left of teacher, tail (bottom-right corner) points toward her */}
                        <div style={{
                            position: 'absolute', top: '22px', left: '-175px',
                            backgroundColor: '#fff', padding: '0.85rem 1rem',
                            borderRadius: '16px', borderBottomRightRadius: '4px',
                            boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                            width: '160px', textAlign: 'left',
                            border: '1.5px solid #e2e8f0',
                            animation: 'lang-in 0.4s ease-out 0.2s both',
                        }}>
                            <p style={{ color: '#0f172a', fontSize: '0.88rem', fontWeight: '700', lineHeight: 1.4, margin: 0 }}>
                                {bubbleText}
                            </p>
                        </div>
                        <img src={tutor} alt="Tutor" style={{ width: '200px', height: 'auto', display: 'block' }} />
                    </div>
                </div>

                {/* ── Language selection ── */}
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    <div>
                        <h2 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.85rem', letterSpacing: '-0.01em' }}>
                            {sectionTitle}
                        </h2>

                        {/* Featured: French + English (full-width cards) */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '0.75rem' }}>
                            {LANGUAGES.slice(0, 2).map(lang => {
                                const selected = nativeLang === lang.id;
                                return (
                                    <div key={lang.id} className="lang-card" onClick={() => setNativeLang(lang.id)} style={{
                                        display: 'flex', alignItems: 'center', gap: '0.9rem',
                                        padding: '0.9rem 1rem', borderRadius: '16px',
                                        border: selected ? '2px solid #0056D2' : '1.5px solid #e2e8f0',
                                        backgroundColor: selected ? '#eff6ff' : '#fff',
                                        cursor: 'pointer', transition: 'all 0.18s ease',
                                        boxShadow: selected ? '0 4px 14px rgba(0,86,210,0.15)' : '0 1px 4px rgba(0,0,0,0.05)',
                                        animation: `lang-in 0.35s ease-out both`,
                                        position: 'relative',
                                    }}>
                                        <span style={{ fontSize: '2rem', lineHeight: 1 }}>{lang.flag}</span>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: '800', fontSize: '1rem', color: selected ? '#0056D2' : '#0f172a' }}>{lang.label}</div>
                                            <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '600' }}>{lang.country}</div>
                                        </div>
                                        {selected && (
                                            <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#0056D2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                <span style={{ color: '#fff', fontSize: '0.65rem', fontWeight: '900' }}>✓</span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Divider */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                            <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }} />
                            <span style={{ fontSize: '0.68rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                {isFr ? 'Autres langues' : 'Other languages'}
                            </span>
                            <div style={{ flex: 1, height: '1px', backgroundColor: '#e2e8f0' }} />
                        </div>

                        {/* 3-column grid: Spanish, German, Italian */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.6rem' }}>
                            {LANGUAGES.slice(2).map((lang, idx) => {
                                const selected = nativeLang === lang.id;
                                return (
                                    <div key={lang.id} className="lang-card" onClick={() => setNativeLang(lang.id)} style={{
                                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem',
                                        padding: '0.85rem 0.5rem', borderRadius: '16px',
                                        border: selected ? '2px solid #0056D2' : '1.5px solid #e2e8f0',
                                        backgroundColor: selected ? '#eff6ff' : '#fff',
                                        cursor: 'pointer', transition: 'all 0.18s ease',
                                        boxShadow: selected ? '0 4px 14px rgba(0,86,210,0.15)' : '0 1px 4px rgba(0,0,0,0.05)',
                                        textAlign: 'center',
                                        animation: `lang-in 0.35s ease-out ${0.1 + idx * 0.07}s both`,
                                        position: 'relative',
                                    }}>
                                        {selected && (
                                            <div style={{ position: 'absolute', top: '6px', right: '6px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#0056D2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <span style={{ color: '#fff', fontSize: '0.5rem', fontWeight: '900' }}>✓</span>
                                            </div>
                                        )}
                                        <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>{lang.flag}</span>
                                        <div style={{ fontWeight: '800', fontSize: '0.82rem', color: selected ? '#0056D2' : '#0f172a', lineHeight: 1.2 }}>{lang.label}</div>
                                        <div style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: '600' }}>{lang.country}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── Learning language chip ── */}
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                        padding: '0.85rem 1.1rem', borderRadius: '14px',
                        backgroundColor: '#eff6ff', border: '2px solid #bfdbfe',
                    }}>
                        <span style={{ fontSize: '1.4rem' }}>🇨🇲</span>
                        <div>
                            <div style={{ fontSize: '0.68rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                {learningLabel}
                            </div>
                            <div style={{ fontSize: '1rem', fontWeight: '800', color: '#0056D2' }}>Medumba</div>
                        </div>
                    </div>

                    {/* ── Continue button ── */}
                    <button
                        onClick={onNext}
                        disabled={!nativeLang}
                        style={{
                            width: '100%',
                            backgroundColor: nativeLang ? '#0056D2' : '#cbd5e1',
                            color: 'white', padding: '1.1rem', borderRadius: '9999px',
                            fontSize: '1.05rem', fontWeight: '800', border: 'none',
                            cursor: nativeLang ? 'pointer' : 'not-allowed', transition: 'all 0.2s',
                            boxShadow: nativeLang ? '0 10px 24px rgba(0,86,210,0.3)' : 'none',
                            letterSpacing: '-0.01em',
                        }}
                    >
                        {continueLabel} →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LanguageSelectionPage;
