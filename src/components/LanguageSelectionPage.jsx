import tutor from '../assets/teacher2.png';

const B = '#1B4FD8';

const selectStyle = {
    width: '100%',
    padding: '0.85rem 1rem',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#0f172a',
    backgroundColor: '#fff',
    border: `2px solid ${B}`,
    borderRadius: '12px',
    outline: 'none',
    cursor: 'pointer',
    appearance: 'none',
    WebkitAppearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%231B4FD8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 1rem center',
    fontFamily: "'Outfit', system-ui, sans-serif",
};

const LanguageSelectionPage = ({ onNext, onBack, nativeLang, setNativeLang, learningLang, setLearningLang }) => {
    const isFr = nativeLang === 'french';
    const canContinue = nativeLang && learningLang;

    return (
        <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc', fontFamily: "'Outfit', system-ui, sans-serif" }}>
            {/* Top Bar */}
            <div style={{ padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', position: 'sticky', top: 0, backgroundColor: '#f8fafc', zIndex: 50 }}>
                <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#0f172a', padding: '0.5rem', borderRadius: '50%' }}>←</button>
                <div style={{ flex: 1, height: '8px', backgroundColor: '#e2e8f0', borderRadius: '99px' }}>
                    <div style={{ width: '20%', height: '100%', backgroundColor: B, borderRadius: '99px' }} />
                </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '500px', margin: '0 auto', padding: '0 1.5rem 2.5rem' }}>
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
                                {isFr ? 'Choisissez vos langues !' : 'Choose your languages!'}
                            </p>
                        </div>
                    </div>
                </div>

                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                    {/* Native language */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#64748b', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            {isFr ? 'Langue maternelle' : 'Native language'}
                        </label>
                        <div style={{ position: 'relative' }}>
                            <select
                                value={nativeLang}
                                onChange={(e) => setNativeLang(e.target.value)}
                                style={selectStyle}
                            >
                                <option value="">{isFr ? '— Sélectionner —' : '— Select —'}</option>
                                <option value="french">🇫🇷  Français</option>
                                <option value="english">🇬🇧  English</option>
                            </select>
                        </div>
                    </div>

                    {/* Learning language */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#64748b', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            {isFr ? 'Langue à apprendre' : 'Learning language'}
                        </label>
                        <div style={{ position: 'relative' }}>
                            <select
                                value={learningLang}
                                onChange={(e) => setLearningLang(e.target.value)}
                                style={selectStyle}
                            >
                                <option value="">{isFr ? '— Sélectionner —' : '— Select —'}</option>
                                <option value="medumba">🇨🇲  Medumba</option>
                                <option value="english">🇬🇧  English</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={onNext}
                        disabled={!canContinue}
                        style={{
                            width: '100%', backgroundColor: canContinue ? B : '#cbd5e1',
                            color: 'white', padding: '1.125rem', borderRadius: '9999px',
                            fontSize: '1.125rem', fontWeight: '600', border: 'none',
                            cursor: canContinue ? 'pointer' : 'not-allowed', transition: 'all 0.2s',
                            boxShadow: canContinue ? '0 10px 15px -3px rgba(27,79,216,0.3)' : 'none',
                        }}
                    >
                        {isFr ? 'Continuer' : 'Continue'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LanguageSelectionPage;
