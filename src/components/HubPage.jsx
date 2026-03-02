import logo from '../assets/logo.png';

const HubPage = ({ nativeLang, onCalendar, onVideo, onCounting, onDictionary, onCourses }) => {
    const isFr = nativeLang === 'french';

    const tiles = [
        {
            icon: '📅',
            labelEn: 'Calendar',    labelFr: 'Calendrier',
            descEn: 'Medumba traditional calendar',
            descFr: 'Calendrier traditionnel Medumba',
            bg: 'linear-gradient(135deg, #0056D2, #38bdf8)',
            shadow: 'rgba(0,86,210,0.35)',
            onClick: onCalendar,
        },
        {
            icon: '🎥',
            labelEn: 'Videos',      labelFr: 'Vidéos',
            descEn: 'Learn Medumba by video',
            descFr: 'Apprendre le Medumba en vidéo',
            bg: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
            shadow: 'rgba(124,58,237,0.35)',
            onClick: onVideo,
        },
        {
            icon: '🔢',
            labelEn: 'Counting',    labelFr: 'Compter',
            descEn: 'Numbers in Medumba',
            descFr: 'Les chiffres en Medumba',
            bg: 'linear-gradient(135deg, #0891b2, #67e8f9)',
            shadow: 'rgba(8,145,178,0.35)',
            onClick: onCounting,
        },
        {
            icon: '📖',
            labelEn: 'Dictionary',  labelFr: 'Dictionnaire',
            descEn: '4 257 Medumba words',
            descFr: '4 257 mots Medumba',
            bg: 'linear-gradient(135deg, #16a34a, #4ade80)',
            shadow: 'rgba(22,163,74,0.35)',
            onClick: onDictionary,
        },
        {
            icon: '📚',
            labelEn: 'Courses',     labelFr: 'Cours',
            descEn: 'Gamified lessons',
            descFr: 'Leçons gamifiées',
            bg: 'linear-gradient(135deg, #d97706, #fbbf24)',
            shadow: 'rgba(217,119,6,0.35)',
            onClick: onCourses,
        },
    ];

    return (
        <div style={{
            width: '100%', minHeight: '100vh',
            backgroundColor: '#f8fafc',
            display: 'flex', flexDirection: 'column',
            fontFamily: "'Outfit', system-ui, sans-serif",
        }}>
            <style>{`
                @keyframes hub-tile-in {
                    from { opacity: 0; transform: translateY(24px) scale(0.95); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }
                .hub-tile:hover { transform: translateY(-3px) scale(1.02) !important; }
                .hub-tile:active { transform: scale(0.97) !important; }
            `}</style>

            {/* ── Header ── */}
            <div style={{
                background: 'linear-gradient(135deg, #0056D2 0%, #0891b2 100%)',
                padding: '2.5rem 1.5rem 3rem',
                textAlign: 'center',
                position: 'relative', overflow: 'hidden',
            }}>
                {/* decorative circles */}
                <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '150px', height: '150px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.07)' }} />
                <div style={{ position: 'absolute', bottom: '-40px', left: '-20px', width: '120px', height: '120px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)' }} />

                <img src={logo} alt="Medumba" style={{ width: '64px', height: 'auto', marginBottom: '0.75rem', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.2))' }} />
                <h1 style={{ fontSize: '2rem', fontWeight: '900', color: '#fff', margin: '0 0 0.35rem', letterSpacing: '-0.02em' }}>
                    Medumba
                </h1>
                <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.85)', fontWeight: '500', margin: 0 }}>
                    {isFr ? 'Que souhaitez-vous explorer ?' : 'What would you like to explore?'}
                </p>
            </div>

            {/* ── Tiles grid ── */}
            <div style={{
                flex: 1, padding: '1.5rem 1rem 2rem',
                display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem', maxWidth: '520px', margin: '0 auto', width: '100%',
                alignContent: 'start',
            }}>
                {tiles.map((tile, i) => (
                    <div
                        key={tile.labelEn}
                        className="hub-tile"
                        onClick={tile.onClick}
                        style={{
                            background: tile.bg,
                            borderRadius: '22px',
                            padding: '1.4rem 1.2rem',
                            cursor: 'pointer',
                            boxShadow: `0 8px 24px ${tile.shadow}`,
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                            animation: `hub-tile-in 0.4s ease-out ${i * 0.07}s both`,
                            // last tile (Courses) spans full width
                            gridColumn: i === 4 ? 'span 2' : 'span 1',
                            display: 'flex', flexDirection: i === 4 ? 'row' : 'column',
                            alignItems: i === 4 ? 'center' : 'flex-start',
                            gap: i === 4 ? '1rem' : '0',
                        }}
                    >
                        <div style={{ fontSize: i === 4 ? '2.8rem' : '2.4rem', lineHeight: 1, marginBottom: i !== 4 ? '0.75rem' : 0 }}>
                            {tile.icon}
                        </div>
                        <div>
                            <div style={{ fontSize: i === 4 ? '1.2rem' : '1.05rem', fontWeight: '900', color: '#fff', marginBottom: '0.2rem' }}>
                                {isFr ? tile.labelFr : tile.labelEn}
                            </div>
                            <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.82)', fontWeight: '500', lineHeight: 1.4 }}>
                                {isFr ? tile.descFr : tile.descEn}
                            </div>
                        </div>
                        {i === 4 && (
                            <div style={{ marginLeft: 'auto', backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                                →
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Footer tag */}
            <div style={{ textAlign: 'center', padding: '0.5rem 1rem 1.5rem', fontSize: '0.72rem', color: '#94a3b8', fontWeight: '600' }}>
                🇨🇲 Medumba · {isFr ? 'Langue Bamiléké, Cameroun' : 'Bamileke Language, Cameroon'}
            </div>
        </div>
    );
};

export default HubPage;
