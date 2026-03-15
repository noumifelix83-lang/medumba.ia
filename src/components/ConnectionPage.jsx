import { useState } from 'react';
import tutor from '../assets/tutor.png';

const B = '#1B4FD8';

/**
 * ConnectionPage — first onboarding question.
 * Asks "Quelle est votre connexion avec le Medumba?" and stores
 * the answer as `connection` in the learner profile.
 */
const ConnectionPage = ({ onNext, onBack, nativeLang }) => {
    const isFr = nativeLang === 'french';
    const [selected, setSelected] = useState(null);

    const question = isFr
        ? 'Quelle est votre connexion avec le Medumba ?'
        : 'What is your connection to Medumba?';

    const options = [
        {
            id: 'native',
            emoji: '🏡',
            label: isFr ? 'Je suis Medumba de naissance' : 'I am Medumba by birth',
            sub:   isFr ? 'C\'est ma langue maternelle ou celle de mes parents'
                        : 'It\'s my mother tongue or my parents\'',
        },
        {
            id: 'heritage',
            emoji: '🌍',
            label: isFr ? 'J\'ai des racines Medumba / Bamiléké'
                        : 'I have Medumba / Bamiléké heritage',
            sub:   isFr ? 'Famille au Cameroun ou dans la diaspora'
                        : 'Family in Cameroon or the diaspora',
        },
        {
            id: 'relationship',
            emoji: '❤️',
            label: isFr ? 'Mon partenaire ou ma belle-famille parle Medumba'
                        : 'My partner or in-laws speak Medumba',
            sub:   isFr ? 'Je veux mieux comprendre et m\'intégrer'
                        : 'I want to understand and connect better',
        },
        {
            id: 'culture',
            emoji: '🎵',
            label: isFr ? 'Je suis passionné(e) par la culture et les langues africaines'
                        : 'I\'m passionate about African culture & languages',
            sub:   isFr ? 'Musique, traditions, proverbes Medumba'
                        : 'Music, traditions, and Medumba proverbs',
        },
        {
            id: 'curious',
            emoji: '🔍',
            label: isFr ? 'Simple curiosité ou intérêt linguistique'
                        : 'Pure curiosity or linguistic interest',
            sub:   isFr ? 'J\'explore les langues du monde'
                        : 'I enjoy exploring world languages',
        },
    ];

    return (
        <div style={{
            width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column',
            backgroundColor: '#fff', fontFamily: "'Outfit', system-ui, sans-serif",
        }}>
            {/* Top bar */}
            <div style={{
                padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem',
                backgroundColor: '#fff', position: 'sticky', top: 0, zIndex: 50,
            }}>
                <button onClick={onBack} style={{
                    background: 'none', border: 'none', fontSize: '1.5rem',
                    cursor: 'pointer', color: '#0f172a', padding: '0.5rem', borderRadius: '50%',
                }}>←</button>
                <div style={{ flex: 1, height: '8px', backgroundColor: '#e2e8f0', borderRadius: '99px' }}>
                    <div style={{ width: '20%', height: '100%', backgroundColor: B, borderRadius: '99px' }} />
                </div>
            </div>

            <div style={{
                flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                width: '100%', maxWidth: '500px', margin: '0 auto', padding: '0 1.5rem 2rem',
            }}>
                {/* Tutor + bubble */}
                <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
                    <div style={{ position: 'relative', zIndex: 1, width: 'fit-content' }}>
                        <img src={tutor} alt="Tutor" style={{ width: '200px', height: 'auto', display: 'block' }} />
                        <div style={{
                            position: 'absolute', top: '18px', right: '-70px',
                            backgroundColor: '#fff', padding: '0.9rem',
                            borderRadius: '20px', borderBottomLeftRadius: '4px',
                            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                            width: '190px', textAlign: 'left',
                        }}>
                            <p style={{ color: '#0f172a', fontSize: '0.9rem', fontWeight: '700', lineHeight: 1.4, margin: 0 }}>
                                {question}
                            </p>
                        </div>
                    </div>
                </div>

                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {options.map(opt => (
                            <div
                                key={opt.id}
                                onClick={() => setSelected(opt.id)}
                                style={{
                                    display: 'flex', alignItems: 'flex-start', gap: '1rem',
                                    padding: '1rem 1.25rem', borderRadius: '16px',
                                    border: selected === opt.id ? `2px solid ${B}` : '1px solid #cbd5e1',
                                    backgroundColor: selected === opt.id ? '#eff6ff' : '#fff',
                                    cursor: 'pointer', transition: 'all 0.2s',
                                }}
                            >
                                <span style={{ fontSize: '1.5rem', flexShrink: 0, marginTop: '1px' }}>{opt.emoji}</span>
                                <div>
                                    <div style={{ fontWeight: '700', fontSize: '0.95rem', color: selected === opt.id ? B : '#0f172a', lineHeight: 1.3 }}>
                                        {opt.label}
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px', lineHeight: 1.4 }}>
                                        {opt.sub}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => selected && onNext(selected)}
                        disabled={!selected}
                        style={{
                            width: '100%',
                            backgroundColor: selected ? B : '#cbd5e1',
                            color: '#fff', padding: '1.125rem', borderRadius: '9999px',
                            fontSize: '1.1rem', fontWeight: '700', border: 'none',
                            cursor: selected ? 'pointer' : 'not-allowed', transition: 'all 0.2s',
                            boxShadow: selected ? '0 10px 15px -3px rgba(27,79,216,0.3)' : 'none',
                            fontFamily: 'inherit',
                        }}
                    >
                        {isFr ? 'Continuer →' : 'Continue →'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConnectionPage;
